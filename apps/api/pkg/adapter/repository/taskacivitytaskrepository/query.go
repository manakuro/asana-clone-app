package taskacivitytaskrepository

import (
	"asana-clone-app/ent"
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *taskActivityTaskRepository) Get(ctx context.Context, where *model.TaskActivityTaskWhereInput) (*model.TaskActivityTask, error) {
	q := r.client.TaskActivityTask.Query()

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

func (r *taskActivityTaskRepository) List(ctx context.Context) ([]*model.TaskActivityTask, error) {
	res, err := r.client.TaskActivityTask.Query().All(ctx)
	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}

func (r *taskActivityTaskRepository) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskActivityTaskWhereInput) (*model.TaskActivityTaskConnection, error) {
	q := r.client.TaskActivityTask.Query()

	res, err := q.Paginate(ctx, after, first, before, last, ent.WithTaskActivityTaskFilter(where.Filter))
	if err != nil {
		return nil, model.NewDBError(err)
	}
	return res, nil
}
