package taskrepository

import (
	"asana-clone-app/ent"
	"asana-clone-app/ent/projecttask"
	"asana-clone-app/ent/schema/ulid"
	"asana-clone-app/ent/task"
	"asana-clone-app/ent/taskactivitytask"
	"asana-clone-app/ent/teammatetask"
	"asana-clone-app/ent/workspaceactivitytask"
	"asana-clone-app/pkg/adapter/repository/repositoryutil"
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *taskRepository) DeleteAll(ctx context.Context, input model.DeleteAllTaskInput) (*model.DeleteAllTaskPayload, error) {
	client := repositoryutil.WithTransactionalMutation(ctx)

	payload := &model.DeleteAllTaskPayload{
		TeammateTasks: []*model.TeammateTask{},
		ProjectTasks:  []*model.ProjectTask{},
		DeletedTasks:  []*model.DeletedTask{},
	}

	tasks, err := client.Task.Query().Where(task.IDIn(input.TaskIDs...)).All(ctx)
	if err != nil {
		if ent.IsNotFound(err) {
			return nil, model.NewNotFoundError(err, input)
		}
	}
	taskIDs := make([]ulid.ID, len(tasks))
	for i, t := range tasks {
		taskIDs[i] = t.ID
	}

	teammateTasks, err := deleteTeammateTaskAll(ctx, client, taskIDs)
	if err != nil {
		return nil, err
	}

	deletedProjectTasks, err := deleteProjectTasksAll(ctx, client, taskIDs)
	if err != nil {
		return nil, err
	}

	err = deleteTaskActivityTasksAll(ctx, client, taskIDs)
	if err != nil {
		return nil, err
	}

	err = deleteWorkspaceActivityTasksAll(ctx, client, taskIDs)
	if err != nil {
		return nil, err
	}

	bulk := make([]*ent.DeletedTaskCreate, len(taskIDs))
	for i, id := range taskIDs {
		bulk[i] = client.DeletedTask.Create().
			SetTaskID(id).
			SetWorkspaceID(input.WorkspaceID)
	}
	createdDeletedTasks, err := client.DeletedTask.CreateBulk(bulk...).Save(ctx)
	if err != nil {
		return nil, model.NewDBError(err)
	}

	if teammateTasks != nil {
		payload.TeammateTasks = teammateTasks
	}
	if deletedProjectTasks != nil {
		payload.ProjectTasks = deletedProjectTasks
	}
	payload.DeletedTasks = createdDeletedTasks

	return payload, nil
}

func deleteTeammateTaskAll(ctx context.Context, client *ent.Client, taskIDs []model.ID) ([]*model.TeammateTask, error) {
	teammateTasks, err := client.
		TeammateTask.Query().
		WithTask().
		Where(teammatetask.TaskIDIn(taskIDs...)).
		All(ctx)
	if err != nil && !ent.IsNotFound(err) {
		return nil, model.NewDBError(err)
	}

	if len(teammateTasks) > 0 {
		ids := make([]ulid.ID, len(teammateTasks))
		for i, t := range teammateTasks {
			ids[i] = t.ID
		}
		_, err = client.TeammateTask.Delete().Where(teammatetask.IDIn(ids...)).Exec(ctx)
		if err != nil {
			return nil, model.NewDBError(err)
		}

		bulk := make([]*ent.DeletedTeammateTaskCreate, len(teammateTasks))
		for i, t := range teammateTasks {
			bulk[i] = client.DeletedTeammateTask.Create().
				SetTeammateTaskID(t.ID).
				SetTaskID(t.TaskID).
				SetTeammateID(t.TeammateID).
				SetWorkspaceID(t.WorkspaceID).
				SetTeammateTaskSectionID(t.TeammateTaskSectionID).
				SetTeammateTaskCreatedAt(t.CreatedAt).
				SetTeammateTaskUpdatedAt(t.UpdatedAt)
		}
		derr := client.DeletedTeammateTask.CreateBulk(bulk...).Exec(ctx)
		if derr != nil {
			return nil, model.NewDBError(derr)
		}
	}

	return teammateTasks, nil
}

func deleteProjectTasksAll(ctx context.Context, client *ent.Client, taskIDs []model.ID) ([]*model.ProjectTask, error) {
	deletedProjectTasks, err := client.
		ProjectTask.Query().
		WithTask().
		Where(projecttask.TaskIDIn(taskIDs...)).
		All(ctx)
	if err != nil && !ent.IsNotFound(err) {
		return nil, model.NewDBError(err)
	}

	if deletedProjectTasks != nil {
		ids := make([]ulid.ID, len(deletedProjectTasks))
		for i, t := range deletedProjectTasks {
			ids[i] = t.ID
		}
		_, err = client.ProjectTask.Delete().Where(projecttask.IDIn(ids...)).Exec(ctx)
		if err != nil {
			return nil, model.NewDBError(err)
		}

		bulk := make([]*ent.DeletedProjectTaskCreate, len(deletedProjectTasks))
		for i, d := range deletedProjectTasks {
			bulk[i] = client.DeletedProjectTask.Create().
				SetProjectTaskID(d.ID).
				SetProjectID(d.ProjectID).
				SetTaskID(d.TaskID).
				SetProjectTaskSectionID(d.ProjectTaskSectionID).
				SetProjectTaskCreatedAt(d.CreatedAt).
				SetProjectTaskUpdatedAt(d.UpdatedAt)
		}
		derr := client.DeletedProjectTask.CreateBulk(bulk...).Exec(ctx)
		if derr != nil {
			return nil, model.NewDBError(derr)
		}
	}

	return deletedProjectTasks, nil
}

func deleteTaskActivityTasksAll(ctx context.Context, client *ent.Client, taskIDs []model.ID) error {
	taskActivityTasks, err := client.TaskActivityTask.Query().Where(taskactivitytask.TaskIDIn(taskIDs...)).All(ctx)
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

	return nil
}

func deleteWorkspaceActivityTasksAll(ctx context.Context, client *ent.Client, taskIDs []model.ID) error {
	workspaceActivityTasks, err := client.WorkspaceActivityTask.Query().Where(workspaceactivitytask.TaskIDIn(taskIDs...)).All(ctx)
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

	return nil
}
