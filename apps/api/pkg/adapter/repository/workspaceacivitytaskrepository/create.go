package workspaceacivitytaskrepository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *workspaceActivityTaskRepository) Create(ctx context.Context, input model.CreateWorkspaceActivityTaskInput) (*model.WorkspaceActivityTask, error) {
	res, err := r.client.
		WorkspaceActivityTask.
		Create().
		SetInput(input).
		Save(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}
