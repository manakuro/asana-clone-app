package archivedworkspaceacivitytaskrepository

import (
	"asana-clone-app/ent"
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *archivedWorkspaceActivityTaskRepository) Update(ctx context.Context, input model.UpdateArchivedWorkspaceActivityTaskInput) (*model.ArchivedWorkspaceActivityTask, error) {
	res, err := r.client.
		ArchivedWorkspaceActivityTask.UpdateOneID(input.ID).
		SetInput(input).
		Save(ctx)

	if err != nil {
		if ent.IsNotFound(err) {
			return nil, model.NewNotFoundError(err, input.ID)
		}

		return nil, model.NewDBError(err)
	}

	return res, nil
}
