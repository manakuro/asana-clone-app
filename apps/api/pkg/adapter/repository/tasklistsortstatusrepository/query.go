package tasklistsortstatusrepository

import (
	"asana-clone-app/ent"
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *taskListSortStatusRepository) Get(ctx context.Context, where *model.TaskListSortStatusWhereInput) (*model.TaskListSortStatus, error) {
	q := r.client.TaskListSortStatus.Query()

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

func (r *taskListSortStatusRepository) List(ctx context.Context) ([]*model.TaskListSortStatus, error) {
	res, err := r.client.TaskListSortStatus.Query().All(ctx)
	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}

func (r *taskListSortStatusRepository) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskListSortStatusWhereInput) (*model.TaskListSortStatusConnection, error) {
	q := r.client.TaskListSortStatus.Query()

	res, err := q.Paginate(ctx, after, first, before, last, ent.WithTaskListSortStatusFilter(where.Filter))
	if err != nil {
		return nil, model.NewDBError(err)
	}
	return res, nil
}
