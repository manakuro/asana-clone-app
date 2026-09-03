package tasktagrepository

import (
	"asana-clone-app/ent"
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *taskTagRepository) Get(ctx context.Context, where *model.TaskTagWhereInput) (*model.TaskTag, error) {
	q := r.client.TaskTag.Query()

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

func (r *taskTagRepository) List(ctx context.Context, where *model.TaskTagWhereInput) ([]*model.TaskTag, error) {
	q := r.client.TaskTag.Query()

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

func (r *taskTagRepository) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskTagWhereInput) (*model.TaskTagConnection, error) {
	q := r.client.TaskTag.Query()

	res, err := q.Paginate(ctx, after, first, before, last, ent.WithTaskTagFilter(where.Filter))
	if err != nil {
		return nil, model.NewDBError(err)
	}
	return res, nil
}
