package projectlightcolorrepository

import (
	"asana-clone-app/ent"
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *projectLightColorRepository) Get(ctx context.Context, where *model.ProjectLightColorWhereInput) (*model.ProjectLightColor, error) {
	q := r.client.ProjectLightColor.Query()

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

func (r *projectLightColorRepository) List(ctx context.Context) ([]*model.ProjectLightColor, error) {
	res, err := r.client.ProjectLightColor.Query().All(ctx)
	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}

func (r *projectLightColorRepository) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ProjectLightColorWhereInput) (*model.ProjectLightColorConnection, error) {
	q := r.client.ProjectLightColor.Query()

	res, err := q.Paginate(ctx, after, first, before, last, ent.WithProjectLightColorFilter(where.Filter))
	if err != nil {
		return nil, model.NewDBError(err)
	}
	return res, nil
}
