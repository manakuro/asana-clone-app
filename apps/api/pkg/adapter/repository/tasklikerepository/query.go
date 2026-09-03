package tasklikerepository

import (
	"asana-clone-app/ent"
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *taskLikeRepository) Get(ctx context.Context, where *model.TaskLikeWhereInput) (*model.TaskLike, error) {
	q := r.client.TaskLike.Query()

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

func (r *taskLikeRepository) List(ctx context.Context, where *model.TaskLikeWhereInput) ([]*model.TaskLike, error) {
	q := r.client.TaskLike.Query()

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

func (r *taskLikeRepository) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskLikeWhereInput) (*model.TaskLikeConnection, error) {
	q := r.client.TaskLike.Query()

	res, err := q.Paginate(ctx, after, first, before, last, ent.WithTaskLikeFilter(where.Filter))
	if err != nil {
		return nil, model.NewDBError(err)
	}
	return res, nil
}
