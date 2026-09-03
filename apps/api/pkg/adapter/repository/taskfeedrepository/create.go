package taskfeedrepository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *taskFeedRepository) Create(ctx context.Context, input model.CreateTaskFeedInput) (*model.TaskFeed, error) {
	res, err := r.client.
		TaskFeed.
		Create().
		SetInput(input).
		Save(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}
