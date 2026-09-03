package taskrepository

import (
	"asana-clone-app/ent"
	"asana-clone-app/ent/deletedprojecttask"
	"asana-clone-app/ent/deletedtask"
	"asana-clone-app/ent/deletedtaskactivitytask"
	"asana-clone-app/ent/deletedteammatetask"
	"asana-clone-app/ent/deletedworkspaceactivitytask"
	"asana-clone-app/ent/projecttask"
	"asana-clone-app/ent/teammatetask"
	"asana-clone-app/pkg/adapter/repository/repositoryutil"
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *taskRepository) Undelete(ctx context.Context, input model.UndeleteTaskInput) (*model.UndeleteTaskPayload, error) {
	client := repositoryutil.WithTransactionalMutation(ctx)

	payload := &model.UndeleteTaskPayload{
		TeammateTask: nil,
		ProjectTasks: []*model.ProjectTask{},
		DeletedTask:  &model.DeletedTask{},
	}

	deletedTask, err := client.DeletedTask.
		Query().
		WithTask().
		Where(deletedtask.TaskID(input.TaskID)).
		Only(ctx)

	if err != nil {
		if ent.IsNotFound(err) {
			return nil, model.NewNotFoundError(err, input.TaskID)
		}
		return nil, model.NewDBError(err)
	}

	undeletedTeammateTask, err := undeleteTeammateTask(ctx, client, input)
	if err != nil {
		return nil, err
	}

	undeletedProjectTasks, err := undeleteProjectTask(ctx, client, input)
	if err != nil {
		return nil, err
	}

	err = undeleteTaskActivityTask(ctx, client, input)
	if err != nil {
		return nil, err
	}

	err = undeleteWorkspaceActivityTask(ctx, client, input)
	if err != nil {
		return nil, err
	}

	_, err = client.DeletedTask.
		Delete().
		Where(deletedtask.TaskID(input.TaskID)).
		Exec(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	if undeletedTeammateTask != nil {
		// Restore the state in order to query en entity after successful transaction.
		t, terr := client.TeammateTask.
			Query().
			WithTask(func(tq *ent.TaskQuery) {
				repositoryutil.WithTaskAll(tq)
			}).
			Where(teammatetask.ID(undeletedTeammateTask.ID)).Only(ctx)

		if terr != nil {
			return nil, model.NewDBError(err)
		}
		payload.TeammateTask = t.Unwrap()
	}
	if undeletedProjectTasks != nil {
		ids := make([]model.ID, len(undeletedProjectTasks))
		for i, p := range undeletedProjectTasks {
			ids[i] = p.ID
		}

		// Restore the state in order to query en entity after successful transaction.
		q := client.ProjectTask.
			Query().
			WithTask(func(tq *ent.TaskQuery) {
				repositoryutil.WithTaskAll(tq)
			})

		repositoryutil.WithProjectTask(q)

		ps, terr := q.Where(projecttask.IDIn(ids...)).All(ctx)
		if terr != nil {
			return nil, model.NewDBError(err)
		}
		for _, p := range ps {
			payload.ProjectTasks = append(payload.ProjectTasks, p.Unwrap())
		}
	}

	payload.DeletedTask = deletedTask

	return payload, nil
}

func undeleteTeammateTask(ctx context.Context, client *ent.Client, input model.UndeleteTaskInput) (*model.TeammateTask, error) {
	deletedTeammateTask, err := client.DeletedTeammateTask.
		Query().
		Where(deletedteammatetask.TaskID(input.TaskID)).
		Only(ctx)
	if err != nil && !ent.IsNotFound(err) {
		return nil, model.NewDBError(err)
	}

	if deletedTeammateTask != nil {
		t, terr := client.TeammateTask.Create().
			SetID(deletedTeammateTask.TeammateTaskID).
			SetWorkspaceID(deletedTeammateTask.WorkspaceID).
			SetTaskID(deletedTeammateTask.TaskID).
			SetTeammateID(deletedTeammateTask.TeammateID).
			SetTeammateTaskSectionID(deletedTeammateTask.TeammateTaskSectionID).
			SetCreatedAt(deletedTeammateTask.TeammateTaskCreatedAt).
			SetUpdatedAt(deletedTeammateTask.TeammateTaskUpdatedAt).
			Save(ctx)
		if terr != nil {
			return nil, model.NewDBError(terr)
		}

		terr = client.DeletedTeammateTask.DeleteOneID(deletedTeammateTask.ID).Exec(ctx)
		if terr != nil {
			return nil, model.NewDBError(terr)
		}

		return t, nil
	}

	return nil, nil
}

func undeleteProjectTask(ctx context.Context, client *ent.Client, input model.UndeleteTaskInput) ([]*model.ProjectTask, error) {
	deletedProjectTasks, err := client.DeletedProjectTask.
		Query().
		Where(deletedprojecttask.TaskID(input.TaskID)).
		All(ctx)
	if err != nil && !ent.IsNotFound(err) {
		return nil, model.NewDBError(err)
	}
	if len(deletedProjectTasks) > 0 {
		bulk := make([]*ent.ProjectTaskCreate, len(deletedProjectTasks))
		for i, d := range deletedProjectTasks {
			bulk[i] = client.ProjectTask.Create().
				SetID(d.ProjectTaskID).
				SetProjectID(d.ProjectID).
				SetTaskID(d.TaskID).
				SetProjectTaskSectionID(d.ProjectTaskSectionID).
				SetCreatedAt(d.ProjectTaskCreatedAt).
				SetUpdatedAt(d.ProjectTaskUpdatedAt)
		}
		ps, derr := client.ProjectTask.CreateBulk(bulk...).Save(ctx)
		if derr != nil {
			return nil, model.NewDBError(derr)
		}

		ids := make([]model.ID, len(deletedProjectTasks))
		for i, d := range deletedProjectTasks {
			ids[i] = d.ID
		}
		_, derr = client.DeletedProjectTask.Delete().Where(deletedprojecttask.IDIn(ids...)).Exec(ctx)
		if derr != nil {
			return nil, model.NewDBError(derr)
		}

		return ps, nil
	}

	return nil, nil
}

func undeleteTaskActivityTask(ctx context.Context, client *ent.Client, input model.UndeleteTaskInput) error {
	deletedTaskActivityTasks, err := client.DeletedTaskActivityTask.
		Query().
		Where(deletedtaskactivitytask.TaskID(input.TaskID)).
		All(ctx)
	if err != nil && !ent.IsNotFound(err) {
		return model.NewDBError(err)
	}
	if len(deletedTaskActivityTasks) > 0 {
		bulk := make([]*ent.TaskActivityTaskCreate, len(deletedTaskActivityTasks))
		for i, d := range deletedTaskActivityTasks {
			bulk[i] = client.TaskActivityTask.Create().
				SetID(d.TaskActivityTaskID).
				SetTaskID(d.TaskID).
				SetCreatedAt(d.TaskActivityTaskCreatedAt).
				SetUpdatedAt(d.TaskActivityTaskUpdatedAt).
				SetTaskActivityID(d.TaskActivityID)

		}
		_, derr := client.TaskActivityTask.CreateBulk(bulk...).Save(ctx)
		if derr != nil {
			return model.NewDBError(derr)
		}

		ids := make([]model.ID, len(deletedTaskActivityTasks))
		for i, d := range deletedTaskActivityTasks {
			ids[i] = d.ID
		}
		_, derr = client.DeletedTaskActivityTask.Delete().Where(deletedtaskactivitytask.IDIn(ids...)).Exec(ctx)
		if derr != nil {
			return model.NewDBError(derr)
		}
	}

	return nil
}

func undeleteWorkspaceActivityTask(ctx context.Context, client *ent.Client, input model.UndeleteTaskInput) error {
	deletedWorkspaceActivityTasks, err := client.DeletedWorkspaceActivityTask.
		Query().
		Where(deletedworkspaceactivitytask.TaskID(input.TaskID)).
		All(ctx)
	if err != nil && !ent.IsNotFound(err) {
		return model.NewDBError(err)
	}
	if len(deletedWorkspaceActivityTasks) > 0 {
		bulk := make([]*ent.WorkspaceActivityTaskCreate, len(deletedWorkspaceActivityTasks))
		for i, d := range deletedWorkspaceActivityTasks {
			bulk[i] = client.WorkspaceActivityTask.Create().
				SetID(d.WorkspaceActivityTaskID).
				SetTaskID(d.TaskID).
				SetCreatedAt(d.WorkspaceActivityTaskCreatedAt).
				SetUpdatedAt(d.WorkspaceActivityTaskUpdatedAt).
				SetWorkspaceActivityID(d.WorkspaceActivityID)

		}
		_, derr := client.WorkspaceActivityTask.CreateBulk(bulk...).Save(ctx)
		if derr != nil {
			return model.NewDBError(derr)
		}

		ids := make([]model.ID, len(deletedWorkspaceActivityTasks))
		for i, d := range deletedWorkspaceActivityTasks {
			ids[i] = d.ID
		}
		_, derr = client.DeletedWorkspaceActivityTask.Delete().Where(deletedworkspaceactivitytask.IDIn(ids...)).Exec(ctx)
		if derr != nil {
			return model.NewDBError(derr)
		}
	}

	return nil
}
