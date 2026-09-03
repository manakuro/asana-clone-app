package workspaceacivityrepository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *workspaceActivityRepository) Create(ctx context.Context, input model.CreateWorkspaceActivityInput) (*model.WorkspaceActivity, error) {
	res, err := r.client.
		WorkspaceActivity.
		Create().
		SetInput(input).
		Save(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}
