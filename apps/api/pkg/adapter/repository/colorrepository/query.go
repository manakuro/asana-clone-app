package colorrepository

import (
	"asana-clone-app/ent"
	"asana-clone-app/ent/color"
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *colorRepository) Get(ctx context.Context, id model.ID) (*model.Color, error) {
	q := r.client.Color.Query()

	if id == "" {
		return nil, model.NewInvalidParamError(map[string]interface{}{
			"id": id,
		})
	}
	q.Where(color.IDEQ(id))

	res, err := q.Only(ctx)

	if err != nil {
		if ent.IsNotSingular(err) {
			return nil, model.NewNotFoundError(err, map[string]interface{}{
				"id": id,
			})
		}
		if ent.IsNotFound(err) {
			return nil, nil
		}
		return nil, model.NewDBError(err)
	}

	return res, nil
}

func (r *colorRepository) List(ctx context.Context) ([]*model.Color, error) {
	res, err := r.client.Color.Query().All(ctx)
	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}

func (r *colorRepository) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ColorWhereInput) (*model.ColorConnection, error) {
	res, err := r.client.
		Color.
		Query().
		Paginate(ctx, after, first, before, last, ent.WithColorFilter(where.Filter))

	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}
