package taskfeedlikerepository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *taskFeedLikeRepository) Create(ctx context.Context, input model.CreateTaskFeedLikeInput) (*model.TaskFeedLike, error) {
	res, err := r.client.
		TaskFeedLike.
		Create().
		SetInput(input).
		Save(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}
