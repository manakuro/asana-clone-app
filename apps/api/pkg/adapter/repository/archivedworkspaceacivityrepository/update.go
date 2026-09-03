package archivedworkspaceacivityrepository

import (
	"asana-clone-app/ent"
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *archivedWorkspaceActivityRepository) Update(ctx context.Context, input model.UpdateArchivedWorkspaceActivityInput) (*model.ArchivedWorkspaceActivity, error) {
	res, err := r.client.
		ArchivedWorkspaceActivity.UpdateOneID(input.ID).
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
