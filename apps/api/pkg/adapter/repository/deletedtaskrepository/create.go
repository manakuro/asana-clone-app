package deletedtaskrepository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *deletedTaskRepository) Create(ctx context.Context, input model.CreateDeletedTaskInput) (*model.DeletedTask, error) {
	newTask, err := r.client.Task.
		Create().
		SetIsNew(true).
		SetName("").
		SetDescription(model.DefaultEditorDescription()).
		Save(ctx)
	if err != nil {
		return nil, model.NewDBError(err)
	}

	_, err = r.client.TaskFeed.Create().
		SetTask(newTask).
		SetIsFirst(true).
		SetDescription(model.DefaultEditorDescription()).
		Save(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	res, err := r.client.
		DeletedTask.
		Create().
		SetInput(input).
		SetTask(newTask).
		Save(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}
