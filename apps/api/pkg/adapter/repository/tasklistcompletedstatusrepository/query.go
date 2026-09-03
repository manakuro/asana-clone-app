package tasklistcompletedstatusrepository

import (
	"asana-clone-app/ent"
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *taskListCompletedStatusRepository) Get(ctx context.Context, where *model.TaskListCompletedStatusWhereInput) (*model.TaskListCompletedStatus, error) {
	q := r.client.TaskListCompletedStatus.Query()

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

func (r *taskListCompletedStatusRepository) List(ctx context.Context) ([]*model.TaskListCompletedStatus, error) {
	res, err := r.client.TaskListCompletedStatus.Query().All(ctx)
	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}

func (r *taskListCompletedStatusRepository) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskListCompletedStatusWhereInput) (*model.TaskListCompletedStatusConnection, error) {
	q := r.client.TaskListCompletedStatus.Query()

	res, err := q.Paginate(ctx, after, first, before, last, ent.WithTaskListCompletedStatusFilter(where.Filter))
	if err != nil {
		return nil, model.NewDBError(err)
	}
	return res, nil
}
