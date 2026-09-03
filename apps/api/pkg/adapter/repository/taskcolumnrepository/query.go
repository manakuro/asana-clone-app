package taskcolumnrepository

import (
	"asana-clone-app/ent"
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *taskColumnRepository) Get(ctx context.Context, where *model.TaskColumnWhereInput) (*model.TaskColumn, error) {
	q := r.client.TaskColumn.Query()

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

func (r *taskColumnRepository) List(ctx context.Context) ([]*model.TaskColumn, error) {
	res, err := r.client.TaskColumn.Query().All(ctx)
	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}

func (r *taskColumnRepository) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskColumnWhereInput) (*model.TaskColumnConnection, error) {
	q := r.client.TaskColumn.Query()

	res, err := q.Paginate(ctx, after, first, before, last, ent.WithTaskColumnFilter(where.Filter))
	if err != nil {
		return nil, model.NewDBError(err)
	}
	return res, nil
}
