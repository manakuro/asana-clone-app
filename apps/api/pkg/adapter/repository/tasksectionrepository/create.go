package tasksectionrepository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *taskSectionRepository) Create(ctx context.Context, input model.CreateTaskSectionInput) (*model.TaskSection, error) {
	res, err := r.client.
		TaskSection.
		Create().
		SetInput(input).
		Save(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}
