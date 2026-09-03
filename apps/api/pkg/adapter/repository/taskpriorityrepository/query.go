package taskpriorityrepository

import (
	"asana-clone-app/ent"
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *taskPriorityRepository) Get(ctx context.Context, where *model.TaskPriorityWhereInput) (*model.TaskPriority, error) {
	q := r.client.TaskPriority.Query()

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

func (r *taskPriorityRepository) List(ctx context.Context) ([]*model.TaskPriority, error) {
	res, err := r.client.TaskPriority.Query().All(ctx)
	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}

func (r *taskPriorityRepository) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskPriorityWhereInput) (*model.TaskPriorityConnection, error) {
	q := r.client.TaskPriority.Query()

	res, err := q.Paginate(ctx, after, first, before, last, ent.WithTaskPriorityFilter(where.Filter))
	if err != nil {
		return nil, model.NewDBError(err)
	}
	return res, nil
}
