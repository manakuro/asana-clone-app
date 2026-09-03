package iconrepository

import (
	"asana-clone-app/ent"
	"asana-clone-app/ent/icon"
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *iconRepository) Get(ctx context.Context, id model.ID) (*model.Icon, error) {
	q := r.client.Icon.Query()

	if id == "" {
		return nil, model.NewInvalidParamError(map[string]interface{}{
			"id": id,
		})
	}
	q.Where(icon.IDEQ(id))

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

func (r *iconRepository) List(ctx context.Context) ([]*model.Icon, error) {
	res, err := r.client.
		Icon.
		Query().
		All(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}

func (r *iconRepository) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.IconWhereInput) (*model.IconConnection, error) {
	res, err := r.client.
		Icon.
		Query().
		Paginate(ctx, after, first, before, last, ent.WithIconFilter(where.Filter))

	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}
