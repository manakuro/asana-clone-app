package archivedtaskacivityrepository

import (
	"asana-clone-app/ent"
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *archivedTaskActivityRepository) Get(ctx context.Context, where *model.ArchivedTaskActivityWhereInput) (*model.ArchivedTaskActivity, error) {
	q := r.client.ArchivedTaskActivity.Query()

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

func (r *archivedTaskActivityRepository) List(ctx context.Context) ([]*model.ArchivedTaskActivity, error) {
	res, err := r.client.ArchivedTaskActivity.Query().All(ctx)
	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}

func (r *archivedTaskActivityRepository) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ArchivedTaskActivityWhereInput) (*model.ArchivedTaskActivityConnection, error) {
	q := r.client.ArchivedTaskActivity.Query()

	res, err := q.Paginate(ctx, after, first, before, last, ent.WithArchivedTaskActivityFilter(where.Filter))
	if err != nil {
		return nil, model.NewDBError(err)
	}
	return res, nil
}
