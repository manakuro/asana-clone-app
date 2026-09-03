package archivedtaskacivitytaskrepository

import (
	"asana-clone-app/ent"
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *archivedArchivedTaskActivityTaskRepository) Get(ctx context.Context, where *model.ArchivedTaskActivityTaskWhereInput) (*model.ArchivedTaskActivityTask, error) {
	q := r.client.ArchivedTaskActivityTask.Query()

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

func (r *archivedArchivedTaskActivityTaskRepository) List(ctx context.Context) ([]*model.ArchivedTaskActivityTask, error) {
	res, err := r.client.ArchivedTaskActivityTask.Query().All(ctx)
	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}

func (r *archivedArchivedTaskActivityTaskRepository) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ArchivedTaskActivityTaskWhereInput) (*model.ArchivedTaskActivityTaskConnection, error) {
	q := r.client.ArchivedTaskActivityTask.Query()

	res, err := q.Paginate(ctx, after, first, before, last, ent.WithArchivedTaskActivityTaskFilter(where.Filter))
	if err != nil {
		return nil, model.NewDBError(err)
	}
	return res, nil
}
