package teammatetasksectionrepository

import (
	"asana-clone-app/ent"
	"asana-clone-app/ent/teammatetask"
	"asana-clone-app/ent/teammatetasksection"
	"asana-clone-app/pkg/adapter/repository/repositoryutil"
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *teammateTaskSectionRepository) DeleteAndKeepTasks(ctx context.Context, input model.DeleteTeammateTaskSectionAndKeepTasksInput) (*model.DeleteTeammateTaskSectionAndKeepTasksPayload, error) {
	client := repositoryutil.WithTransactionalMutation(ctx)

	deleted, err := client.TeammateTaskSection.
		Query().
		Where(teammatetasksection.IDEQ(input.ID)).
		Only(ctx)
	if err != nil {
		if ent.IsNotFound(err) {
			return nil, model.NewNotFoundError(err, input)
		}
		return nil, model.NewDBError(err)
	}

	teammateTasks, err := client.TeammateTask.Query().Where(teammatetask.TeammateTaskSectionIDEQ(deleted.ID)).All(ctx)
	if err != nil {
		if ent.IsNotFound(err) {
			return nil, model.NewNotFoundError(err, deleted.ID)
		}
		return nil, model.NewDBError(err)
	}

	teammateTaskSection, err := client.
		TeammateTaskSection.
		Query().
		Where(
			teammatetasksection.TeammateID(deleted.TeammateID),
			teammatetasksection.WorkspaceID(deleted.WorkspaceID),
			teammatetasksection.Assigned(true),
		).Only(ctx)
	if err != nil {
		if ent.IsNotFound(err) {
			return nil, model.NewNotFoundError(err, map[string]interface{}{
				"TeammateID":  deleted.TeammateID,
				"WorkspaceID": deleted.WorkspaceID,
			})
		}
		return nil, model.NewDBError(err)
	}

	bulk := make([]*ent.TeammateTaskCreate, len(teammateTasks))
	for i, t := range teammateTasks {
		bulk[i] = client.TeammateTask.Create().
			SetID(t.ID).
			SetTaskID(t.TaskID).
			SetTeammateID(t.TeammateID).
			SetWorkspaceID(t.WorkspaceID).
			SetTeammateTaskSectionID(teammateTaskSection.ID).
			SetCreatedAt(t.CreatedAt)
	}
	err = client.TeammateTask.CreateBulk(bulk...).OnConflict().UpdateNewValues().Exec(ctx)
	if err != nil {
		return nil, model.NewDBError(err)
	}

	err = client.TeammateTaskSection.DeleteOneID(deleted.ID).Exec(ctx)
	if err != nil {
		return nil, model.NewDBError(err)
	}

	teammateTaskIDs := make([]model.ID, len(teammateTasks))
	for i, task := range teammateTasks {
		teammateTaskIDs[i] = task.ID
	}

	return &model.DeleteTeammateTaskSectionAndKeepTasksPayload{
		TeammateTaskSection:     deleted,
		KeptTeammateTaskSection: teammateTaskSection,
		TeammateTaskIDs:         teammateTaskIDs,
	}, nil
}
