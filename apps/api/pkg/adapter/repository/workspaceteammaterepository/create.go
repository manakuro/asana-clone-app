package workspaceteammaterepository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *workspaceTeammateRepository) Create(ctx context.Context, input model.CreateWorkspaceTeammateInput) (*model.WorkspaceTeammate, error) {
	res, err := r.client.
		WorkspaceTeammate.
		Create().
		SetInput(input).
		Save(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}
