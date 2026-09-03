package workspaceacivityrepository

import (
	"asana-clone-app/ent"
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *workspaceActivityRepository) Update(ctx context.Context, input model.UpdateWorkspaceActivityInput) (*model.WorkspaceActivity, error) {
	res, err := r.client.
		WorkspaceActivity.UpdateOneID(input.ID).
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
