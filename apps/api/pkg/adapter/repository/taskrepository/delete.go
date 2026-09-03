package taskrepository

import (
	"asana-clone-app/ent"
	"asana-clone-app/ent/deletedtask"
	"asana-clone-app/ent/projecttask"
	"asana-clone-app/ent/task"
	"asana-clone-app/ent/taskactivitytask"
	"asana-clone-app/ent/teammatetask"
	"asana-clone-app/ent/workspaceactivitytask"
	"asana-clone-app/pkg/adapter/repository/repositoryutil"
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *taskRepository) Delete(ctx context.Context, input model.DeleteTaskInput) (*model.DeleteTaskPayload, error) {
	client := repositoryutil.WithTransactionalMutation(ctx)

	payload := &model.DeleteTaskPayload{
		ProjectTasks: []*model.ProjectTask{},
		TeammateTask: &model.TeammateTask{},
		DeletedTask:  &model.DeletedTask{},
	}

	taskRes, err := client.Task.Query().Where(task.ID(input.TaskID)).Only(ctx)
	if err != nil {
		if ent.IsNotFound(err) {
			return nil, model.NewNotFoundError(err, input)
		}
		return nil, model.NewDBError(err)
	}

	teammateTask, err := deleteTeammateTask(ctx, client, input, taskRes)
	if err != nil {
		return nil, err
	}

	projectTasks, err := deleteProjectTasks(ctx, client, input, taskRes)
	if err != nil {
		return nil, err
	}

	err = deleteTaskActivityTasks(ctx, client, input, taskRes)
	if err != nil {
		return nil, err
	}

	err = deleteWorkspaceActivityTasks(ctx, client, input, taskRes)
	if err != nil {
		return nil, err
	}

	d, err := client.DeletedTask.Create().SetTaskID(taskRes.ID).SetWorkspaceID(input.WorkspaceID).Save(ctx)
	if err != nil {
		return nil, model.NewDBError(err)
	}
	deletedTask, err := client.DeletedTask.Query().WithTask(func(q *ent.TaskQuery) {
		repositoryutil.WithTaskAll(q)
	}).Where(deletedtask.ID(d.ID)).Only(ctx)
	if err != nil {
		return nil, model.NewDBError(err)
	}

	if teammateTask != nil {
		payload.TeammateTask = teammateTask
	}
	if len(projectTasks) > 0 {
		payload.ProjectTasks = projectTasks
	}

	payload.DeletedTask = deletedTask

	return payload, nil
}

func deleteTeammateTask(ctx context.Context, client *ent.Client, input model.DeleteTaskInput, taskRes *model.Task) (*model.TeammateTask, error) {
	teammateTask, err := client.
		TeammateTask.Query().
		WithTask().
		Where(teammatetask.TaskID(input.TaskID)).
		Only(ctx)

	if err != nil && !ent.IsNotFound(err) {
		return nil, model.NewDBError(err)
	}

	if teammateTask != nil {
		err = client.TeammateTask.DeleteOneID(teammateTask.ID).Exec(ctx)
		if err != nil {
			return nil, model.NewDBError(err)
		}
		if !taskRes.IsNew {
			_, derr := client.DeletedTeammateTask.Create().
				SetTeammateTaskID(teammateTask.ID).
				SetTaskID(teammateTask.TaskID).
				SetTeammateID(teammateTask.TeammateID).
				SetWorkspaceID(teammateTask.WorkspaceID).
				SetTeammateTaskSectionID(teammateTask.TeammateTaskSectionID).
				SetTeammateTaskCreatedAt(teammateTask.CreatedAt).
				SetTeammateTaskUpdatedAt(teammateTask.UpdatedAt).
				Save(ctx)

			if derr != nil {
				return nil, model.NewDBError(derr)
			}
		}
	}

	return teammateTask, nil
}

func deleteProjectTasks(ctx context.Context, client *ent.Client, input model.DeleteTaskInput, taskRes *model.Task) ([]*model.ProjectTask, error) {
	projectTasks, err := client.ProjectTask.
		Query().
		WithTask().
		Where(projecttask.TaskID(input.TaskID)).
		All(ctx)
	if err != nil && !ent.IsNotFound(err) {
		return nil, model.NewDBError(err)
	}

	if len(projectTasks) > 0 {
		deletedProjectTaskIDs := make([]model.ID, len(projectTasks))
		for i, p := range projectTasks {
			deletedProjectTaskIDs[i] = p.ID
		}

		_, err = client.ProjectTask.Delete().Where(projecttask.IDIn(deletedProjectTaskIDs...)).Exec(ctx)
		if err != nil {
			return nil, model.NewDBError(err)
		}
		if !taskRes.IsNew {
			bulk := make([]*ent.DeletedProjectTaskCreate, len(projectTasks))
			for i, p := range projectTasks {
				bulk[i] = client.DeletedProjectTask.Create().
					SetProjectTaskID(p.ID).
					SetProjectID(p.ProjectID).
					SetTaskID(p.TaskID).
					SetProjectTaskSectionID(p.ProjectTaskSectionID).
					SetProjectTaskCreatedAt(p.CreatedAt).
					SetProjectTaskUpdatedAt(p.UpdatedAt)
			}
			derr := client.DeletedProjectTask.CreateBulk(bulk...).Exec(ctx)
			if derr != nil {
				return nil, model.NewDBError(derr)
			}
		}
	}

	return projectTasks, nil
}

func deleteTaskActivityTasks(ctx context.Context, client *ent.Client, input model.DeleteTaskInput, taskRes *model.Task) error {
	taskActivityTasks, err := client.TaskActivityTask.Query().Where(taskactivitytask.TaskID(input.TaskID)).All(ctx)
	if err != nil && !ent.IsNotFound(err) {
		return model.NewDBError(err)
	}
	if len(taskActivityTasks) > 0 {
		ids := make([]model.ID, len(taskActivityTasks))
		for i, p := range taskActivityTasks {
			ids[i] = p.ID
		}
		_, err = client.TaskActivityTask.Delete().Where(taskactivitytask.IDIn(ids...)).Exec(ctx)
		if err != nil {
			return model.NewDBError(err)
		}
		if !taskRes.IsNew {
			bulk := make([]*ent.DeletedTaskActivityTaskCreate, len(taskActivityTasks))
			for i, t := range taskActivityTasks {
				bulk[i] = client.DeletedTaskActivityTask.Create().
					SetTaskID(t.TaskID).
					SetTaskActivityTaskCreatedAt(t.CreatedAt).
					SetTaskActivityTaskUpdatedAt(t.UpdatedAt).
					SetTaskActivityID(t.TaskActivityID).
					SetTaskActivityTaskID(t.ID)
			}
			derr := client.DeletedTaskActivityTask.CreateBulk(bulk...).Exec(ctx)
			if derr != nil {
				return model.NewDBError(derr)
			}
		}
	}

	return nil
}

func deleteWorkspaceActivityTasks(ctx context.Context, client *ent.Client, input model.DeleteTaskInput, taskRes *model.Task) error {
	workspaceActivityTasks, err := client.WorkspaceActivityTask.Query().Where(workspaceactivitytask.TaskID(input.TaskID)).All(ctx)
	if err != nil && !ent.IsNotFound(err) {
		return model.NewDBError(err)
	}
	if len(workspaceActivityTasks) > 0 {
		ids := make([]model.ID, len(workspaceActivityTasks))
		for i, p := range workspaceActivityTasks {
			ids[i] = p.ID
		}
		_, err = client.WorkspaceActivityTask.Delete().Where(workspaceactivitytask.IDIn(ids...)).Exec(ctx)
		if err != nil {
			return model.NewDBError(err)
		}
		if !taskRes.IsNew {
			bulk := make([]*ent.DeletedWorkspaceActivityTaskCreate, len(workspaceActivityTasks))
			for i, t := range workspaceActivityTasks {
				bulk[i] = client.DeletedWorkspaceActivityTask.Create().
					SetTaskID(t.TaskID).
					SetWorkspaceActivityTaskCreatedAt(t.CreatedAt).
					SetWorkspaceActivityTaskUpdatedAt(t.UpdatedAt).
					SetWorkspaceActivityID(t.WorkspaceActivityID).
					SetWorkspaceActivityTaskID(t.ID)
			}
			derr := client.DeletedWorkspaceActivityTask.CreateBulk(bulk...).Exec(ctx)
			if derr != nil {
				return model.NewDBError(derr)
			}
		}
	}

	return nil
}
