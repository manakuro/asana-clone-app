package taskrepository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *taskRepository) Create(ctx context.Context, input model.CreateTaskInput) (*model.Task, error) {
	res, err := r.client.
		Task.
		Create().
		SetInput(input).
		SetName("").
		SetIsNew(true).
		SetDescription(model.DefaultEditorDescription()).
		Save(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}
