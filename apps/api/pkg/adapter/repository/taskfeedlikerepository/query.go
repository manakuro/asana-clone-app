package taskfeedlikerepository

import (
	"asana-clone-app/ent"
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *taskFeedLikeRepository) Get(ctx context.Context, where *model.TaskFeedLikeWhereInput) (*model.TaskFeedLike, error) {
	q := r.client.TaskFeedLike.Query()

	q, err := where.Filter(q)
	if err != nil {
		return nil, model.NewInvalidParamError(nil)
	}

	res, err := q.Only(ctx)

	if err != nil {
		if ent.IsNotSingular(err) {
			return nil, model.NewNotFoundError(err, nil)
		}
		if ent.IsNotFound(err) {
			return nil, nil
		}
		return nil, model.NewDBError(err)
	}

	return res, nil
}

func (r *taskFeedLikeRepository) List(ctx context.Context, where *model.TaskFeedLikeWhereInput) ([]*model.TaskFeedLike, error) {
	q := r.client.TaskFeedLike.Query()

	q, err := where.Filter(q)
	if err != nil {
		return nil, model.NewInvalidParamError(nil)
	}

	res, err := q.All(ctx)
	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}

func (r *taskFeedLikeRepository) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskFeedLikeWhereInput) (*model.TaskFeedLikeConnection, error) {
	q := r.client.TaskFeedLike.Query()

	res, err := q.Paginate(ctx, after, first, before, last, ent.WithTaskFeedLikeFilter(where.Filter))
	if err != nil {
		return nil, model.NewDBError(err)
	}
	return res, nil
}
