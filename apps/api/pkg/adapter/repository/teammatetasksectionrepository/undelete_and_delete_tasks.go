package teammatetasksectionrepository

import (
	"asana-clone-app/ent"
	"asana-clone-app/ent/deletedtask"
	"asana-clone-app/ent/teammatetask"
	"asana-clone-app/ent/teammatetasksection"
	"asana-clone-app/pkg/adapter/repository/repositoryutil"
	"asana-clone-app/pkg/adapter/repository/taskrepository"
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *teammateTaskSectionRepository) UndeleteAndDeleteTasks(ctx context.Context, input model.UndeleteTeammateTaskSectionAndDeleteTasksInput) (*model.UndeleteTeammateTaskSectionAndDeleteTasksPayload, error) {
	client := repositoryutil.WithTransactionalMutation(ctx)

	createdTeammateTaskSection, err := client.TeammateTaskSection.
		Create().
		SetTeammateID(input.TeammateID).
		SetWorkspaceID(input.WorkspaceID).
		SetName(input.Name).
		SetAssigned(false).
		SetCreatedAt(*input.CreatedAt).
		SetUpdatedAt(*input.UpdatedAt).
		Save(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	deletedTasks, err := client.DeletedTask.
		Query().
		Where(deletedtask.TaskIDIn(input.DeletedTaskIDs...)).
		All(ctx)
	if err != nil {
		return nil, model.NewDBError(err)
	}
	if len(deletedTasks) == 0 {
		return nil, model.NewNotFoundError(err, input)
	}

	taskIDs := make([]model.ID, len(deletedTasks))
	for i, t := range deletedTasks {
		taskIDs[i] = t.TaskID
	}

	// TODO: Task repository can be called in usecase/usecase package
	taskRepo := taskrepository.New(r.client)

	p, rerr := taskRepo.UndeleteAll(ctx, model.UndeleteAllTaskInput{
		TaskIDs:               taskIDs,
		WorkspaceID:           input.WorkspaceID,
		TeammateTaskSectionID: &createdTeammateTaskSection.ID,
		RequestID:             "",
	})
	if rerr != nil {
		return nil, model.NewDBError(err)
	}

	bulk := make([]*ent.TeammateTaskCreate, len(p.TeammateTasks))
	for i, t := range p.TeammateTasks {
		bulk[i] = client.TeammateTask.Create().
			SetID(t.ID).
			SetCreatedAt(t.CreatedAt).
			SetUpdatedAt(t.UpdatedAt).
			SetTaskID(t.TaskID).
			SetTeammateID(t.TeammateID).
			SetWorkspaceID(t.WorkspaceID).
			SetTeammateTaskSectionID(createdTeammateTaskSection.ID)
	}
	err = client.TeammateTask.CreateBulk(bulk...).OnConflict().UpdateNewValues().Exec(ctx)
	if err != nil {
		return nil, model.NewDBError(err)
	}

	teammateTaskIDs := make([]model.ID, len(p.TeammateTasks))
	for i, t := range p.TeammateTasks {
		teammateTaskIDs[i] = t.ID
	}
	ts, err := client.TeammateTask.Query().Where(teammatetask.IDIn(teammateTaskIDs...)).All(ctx)
	if err != nil {
		if ent.IsNotFound(err) {
			return nil, model.NewNotFoundError(err, map[string]interface{}{
				"IDs": teammateTaskIDs,
			})
		}
		return nil, model.NewDBError(err)
	}

	createdTeammateTasks := make([]*model.TeammateTask, len(ts))
	for i, t := range ts {
		createdTeammateTasks[i] = t.Unwrap()
	}

	// Eager-loads associations with task.
	teammateTaskSection, err := client.TeammateTaskSection.
		Query().
		WithTeammateTasks(func(ttq *ent.TeammateTaskQuery) {
			ttq.WithTask(func(tq *ent.TaskQuery) {
				repositoryutil.WithTaskAll(tq)
			})
		}).
		Where(teammatetasksection.ID(createdTeammateTaskSection.ID)).
		Only(ctx)
	if err != nil {
		return nil, model.NewDBError(err)
	}

	return &model.UndeleteTeammateTaskSectionAndDeleteTasksPayload{
		TeammateTaskSection: teammateTaskSection,
		TeammateTasks:       createdTeammateTasks,
	}, nil
}
