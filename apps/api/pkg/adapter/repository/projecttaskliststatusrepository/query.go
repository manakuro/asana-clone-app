package projecttaskliststatusrepository

import (
	"asana-clone-app/ent"
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *projectTaskListStatusRepository) Get(ctx context.Context, where *model.ProjectTaskListStatusWhereInput) (*model.ProjectTaskListStatus, error) {
	q := r.client.ProjectTaskListStatus.Query()

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

func (r *projectTaskListStatusRepository) List(ctx context.Context) ([]*model.ProjectTaskListStatus, error) {
	res, err := r.client.ProjectTaskListStatus.Query().All(ctx)
	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}

func (r *projectTaskListStatusRepository) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ProjectTaskListStatusWhereInput) (*model.ProjectTaskListStatusConnection, error) {
	q := r.client.ProjectTaskListStatus.Query()

	res, err := q.Paginate(ctx, after, first, before, last, ent.WithProjectTaskListStatusFilter(where.Filter))
	if err != nil {
		return nil, model.NewDBError(err)
	}
	return res, nil
}
