package taskacivityrepository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *taskActivityRepository) Create(ctx context.Context, input model.CreateTaskActivityInput) (*model.TaskActivity, error) {
	res, err := r.client.
		TaskActivity.
		Create().
		SetInput(input).
		Save(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}
