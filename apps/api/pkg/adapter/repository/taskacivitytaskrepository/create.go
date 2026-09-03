package taskacivitytaskrepository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *taskActivityTaskRepository) Create(ctx context.Context, input model.CreateTaskActivityTaskInput) (*model.TaskActivityTask, error) {
	res, err := r.client.
		TaskActivityTask.
		Create().
		SetInput(input).
		Save(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}
