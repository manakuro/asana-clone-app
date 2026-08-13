package taskrepository

import (
	"context"
	"project-management-demo-backend/ent"
	"project-management-demo-backend/ent/deletedprojecttask"
	"project-management-demo-backend/ent/deletedtask"
	"project-management-demo-backend/ent/deletedtaskactivitytask"
	"project-management-demo-backend/ent/deletedteammatetask"
	"project-management-demo-backend/ent/deletedworkspaceactivitytask"
	"project-management-demo-backend/pkg/adapter/repository/repositoryutil"
	"project-management-demo-backend/pkg/entity/model"
)

func (r *taskRepository) UndeleteAll(ctx context.Context, input model.UndeleteAllTaskInput) (*model.UndeleteAllTaskPayload, error) {
	client := repositoryutil.WithTransactionalMutation(ctx)

	payload := &model.UndeleteAllTaskPayload{
		TeammateTasks: []*model.TeammateTask{},
		ProjectTasks:  []*model.ProjectTask{},
		DeletedTasks:  []*model.DeletedTask{},
	}

	taskIDs := input.TaskIDs

	createdTeammateTasks, err := undeleteTeammateTaskAll(ctx, client, input)
	if err != nil {
		return nil, err
	}

	createdProjectTasks, err := undeleteProjectTasksAll(ctx, client, input)
	if err != nil {
		return nil, err
	}

	err = undeleteTaskActivityTasksAll(ctx, client, input)
	if err != nil {
		return nil, err
	}

	err = undeleteWorkspaceActivityTasksAll(ctx, client, input)
	if err != nil {
		return nil, err
	}

	deletedTasks, err := client.DeletedTask.
		Query().
		Where(deletedtask.TaskIDIn(taskIDs...)).
		All(ctx)

	if err != nil {
		if ent.IsNotFound(err) {
			return nil, model.NewNotFoundError(err, taskIDs)
		}
		return nil, model.NewDBError(err)
	}

	deletedTaskIDs := make([]model.ID, len(deletedTasks))
	for i, d := range deletedTasks {
		deletedTaskIDs[i] = d.ID
	}

	_, err = client.DeletedTask.Delete().Where(deletedtask.IDIn(deletedTaskIDs...)).Exec(ctx)
	if err != nil {
		return nil, model.NewDBError(err)
	}

	if createdTeammateTasks != nil {
		payload.TeammateTasks = createdTeammateTasks
	}

	if createdProjectTasks != nil {
		payload.ProjectTasks = createdProjectTasks
	}

	payload.DeletedTasks = deletedTasks

	return payload, nil
}

func undeleteTeammateTaskAll(ctx context.Context, client *ent.Client, input model.UndeleteAllTaskInput) ([]*model.TeammateTask, error) {
	var teammateTasks []*model.TeammateTask

	deletedTeammateTasks, err := client.DeletedTeammateTask.
		Query().
		Where(deletedteammatetask.TaskIDIn(input.TaskIDs...)).
		All(ctx)
	if err != nil && !ent.IsNotFound(err) {
		return nil, model.NewDBError(err)
	}

	if len(deletedTeammateTasks) > 0 {
		bulk := make([]*ent.TeammateTaskCreate, len(deletedTeammateTasks))
		for i, d := range deletedTeammateTasks {
			bulk[i] = client.TeammateTask.Create().
				SetID(d.TeammateTaskID).
				SetTaskID(d.TaskID).
				SetTeammateID(d.TeammateID).
				SetWorkspaceID(d.WorkspaceID).
				SetCreatedAt(d.TeammateTaskCreatedAt).
				SetUpdatedAt(d.TeammateTaskUpdatedAt)

			if input.TeammateTaskSectionID != nil {
				bulk[i].SetTeammateTaskSectionID(*input.TeammateTaskSectionID)
			} else {
				bulk[i].SetTeammateTaskSectionID(d.TeammateTaskSectionID)
			}
		}
		ts, terr := client.TeammateTask.CreateBulk(bulk...).Save(ctx)
		if terr != nil {
			return nil, model.NewDBError(terr)
		}
		for _, t := range ts {
			teammateTasks = append(teammateTasks, t.Unwrap())
		}

		ids := make([]model.ID, len(deletedTeammateTasks))
		for i, d := range deletedTeammateTasks {
			ids[i] = d.ID
		}
		_, terr = client.DeletedTeammateTask.Delete().Where(deletedteammatetask.IDIn(ids...)).Exec(ctx)
		if terr != nil {
			return nil, model.NewDBError(terr)
		}
	}

	return teammateTasks, nil
}

func undeleteProjectTasksAll(ctx context.Context, client *ent.Client, input model.UndeleteAllTaskInput) ([]*model.ProjectTask, error) {
	var projectTasks []*model.ProjectTask
	deletedProjectTasks, err := client.DeletedProjectTask.
		Query().
		Where(deletedprojecttask.TaskIDIn(input.TaskIDs...)).
		All(ctx)
	if err != nil && !ent.IsNotFound(err) {
		return nil, model.NewDBError(err)
	}
	if len(deletedProjectTasks) > 0 {
		bulk := make([]*ent.ProjectTaskCreate, len(deletedProjectTasks))
		for i, d := range deletedProjectTasks {
			bulk[i] = client.ProjectTask.Create().
				SetID(d.ProjectTaskID).
				SetTaskID(d.TaskID).
				SetProjectID(d.ProjectID).
				SetCreatedAt(d.ProjectTaskCreatedAt).
				SetUpdatedAt(d.ProjectTaskUpdatedAt)

			if input.ProjectTaskSectionID != nil {
				bulk[i].SetProjectTaskSectionID(*input.ProjectTaskSectionID)
			} else {
				bulk[i].SetProjectTaskSectionID(d.ProjectTaskSectionID)
			}
		}
		ps, perr := client.ProjectTask.CreateBulk(bulk...).Save(ctx)
		if perr != nil {
			return nil, model.NewDBError(perr)
		}
		for _, t := range ps {
			projectTasks = append(projectTasks, t.Unwrap())
		}

		ids := make([]model.ID, len(deletedProjectTasks))
		for i, d := range deletedProjectTasks {
			ids[i] = d.ID
		}
		_, perr = client.DeletedProjectTask.Delete().Where(deletedprojecttask.IDIn(ids...)).Exec(ctx)
		if perr != nil {
			return nil, model.NewDBError(perr)
		}
	}

	return projectTasks, nil
}

func undeleteTaskActivityTasksAll(ctx context.Context, client *ent.Client, input model.UndeleteAllTaskInput) error {
	deletedTaskActivityTasks, err := client.DeletedTaskActivityTask.
		Query().
		Where(deletedtaskactivitytask.TaskIDIn(input.TaskIDs...)).
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

func undeleteWorkspaceActivityTasksAll(ctx context.Context, client *ent.Client, input model.UndeleteAllTaskInput) error {
	deletedWorkspaceActivityTasks, err := client.DeletedWorkspaceActivityTask.
		Query().
		Where(deletedworkspaceactivitytask.TaskIDIn(input.TaskIDs...)).
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
