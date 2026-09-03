package projectbasecolorrepository

import (
	"asana-clone-app/ent"
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *projectBaseColorRepository) Get(ctx context.Context, where *model.ProjectBaseColorWhereInput) (*model.ProjectBaseColor, error) {
	q := r.client.ProjectBaseColor.Query()

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

func (r *projectBaseColorRepository) List(ctx context.Context) ([]*model.ProjectBaseColor, error) {
	res, err := r.client.
		ProjectBaseColor.Query().All(ctx)
	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}

func (r *projectBaseColorRepository) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ProjectBaseColorWhereInput) (*model.ProjectBaseColorConnection, error) {
	q := r.client.ProjectBaseColor.Query()

	res, err := q.Paginate(ctx, after, first, before, last, ent.WithProjectBaseColorFilter(where.Filter))
	if err != nil {
		return nil, model.NewDBError(err)
	}
	return res, nil
}
