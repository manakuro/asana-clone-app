package archivedworkspaceacivityrepository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *archivedWorkspaceActivityRepository) Create(ctx context.Context, input model.CreateArchivedWorkspaceActivityInput) (*model.ArchivedWorkspaceActivity, error) {
	res, err := r.client.
		ArchivedWorkspaceActivity.
		Create().
		SetInput(input).
		Save(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}
