package taskfeedrepository

import (
	"asana-clone-app/ent"
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *taskFeedRepository) Get(ctx context.Context, where *model.TaskFeedWhereInput) (*model.TaskFeed, error) {
	q := r.client.TaskFeed.Query()

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

func (r *taskFeedRepository) List(ctx context.Context, where *model.TaskFeedWhereInput) ([]*model.TaskFeed, error) {
	q := r.client.TaskFeed.Query()

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

func (r *taskFeedRepository) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskFeedWhereInput) (*model.TaskFeedConnection, error) {
	q := r.client.TaskFeed.Query()

	res, err := q.Paginate(ctx, after, first, before, last, ent.WithTaskFeedFilter(where.Filter))
	if err != nil {
		return nil, model.NewDBError(err)
	}
	return res, nil
}
