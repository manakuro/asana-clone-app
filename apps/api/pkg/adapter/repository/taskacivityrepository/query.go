package taskacivityrepository

import (
	"asana-clone-app/ent"
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *taskActivityRepository) Get(ctx context.Context, where *model.TaskActivityWhereInput) (*model.TaskActivity, error) {
	q := r.client.TaskActivity.Query()

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

func (r *taskActivityRepository) List(ctx context.Context) ([]*model.TaskActivity, error) {
	res, err := r.client.TaskActivity.Query().All(ctx)
	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}

func (r *taskActivityRepository) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskActivityWhereInput) (*model.TaskActivityConnection, error) {
	q := r.client.TaskActivity.Query()

	res, err := q.Paginate(ctx, after, first, before, last, ent.WithTaskActivityFilter(where.Filter))
	if err != nil {
		return nil, model.NewDBError(err)
	}
	return res, nil
}
