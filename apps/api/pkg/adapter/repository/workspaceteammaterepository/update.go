package workspaceteammaterepository

import (
	"asana-clone-app/ent"
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *workspaceTeammateRepository) Update(ctx context.Context, input model.UpdateWorkspaceTeammateInput) (*model.WorkspaceTeammate, error) {
	res, err := r.client.
		WorkspaceTeammate.UpdateOneID(input.ID).
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
