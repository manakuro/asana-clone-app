package workspacerepository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *workspaceRepository) Create(ctx context.Context, input model.CreateWorkspaceInput) (*model.Workspace, error) {
	res, err := r.client.
		Workspace.
		Create().
		SetInput(input).
		Save(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}
