package taskpriorityrepository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *taskPriorityRepository) Create(ctx context.Context, input model.CreateTaskPriorityInput) (*model.TaskPriority, error) {
	res, err := r.client.
		TaskPriority.
		Create().
		SetInput(input).
		Save(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}
