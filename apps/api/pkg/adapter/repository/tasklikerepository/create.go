package tasklikerepository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *taskLikeRepository) Create(ctx context.Context, input model.CreateTaskLikeInput) (*model.TaskLike, error) {
	res, err := r.client.
		TaskLike.
		Create().
		SetInput(input).
		Save(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}
