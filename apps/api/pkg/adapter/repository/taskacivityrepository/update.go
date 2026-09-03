package taskacivityrepository

import (
	"asana-clone-app/ent"
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *taskActivityRepository) Update(ctx context.Context, input model.UpdateTaskActivityInput) (*model.TaskActivity, error) {
	res, err := r.client.
		TaskActivity.UpdateOneID(input.ID).
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
