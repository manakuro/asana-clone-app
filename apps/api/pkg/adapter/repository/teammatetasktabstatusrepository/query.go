package teammatetasktabstatusrepository

import (
	"asana-clone-app/ent"
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *teammateTaskTabStatusRepository) Get(ctx context.Context, where *model.TeammateTaskTabStatusWhereInput) (*model.TeammateTaskTabStatus, error) {
	q := r.client.TeammateTaskTabStatus.Query()

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

func (r *teammateTaskTabStatusRepository) List(ctx context.Context) ([]*model.TeammateTaskTabStatus, error) {
	res, err := r.client.TeammateTaskTabStatus.Query().All(ctx)
	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}

func (r *teammateTaskTabStatusRepository) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TeammateTaskTabStatusWhereInput) (*model.TeammateTaskTabStatusConnection, error) {
	q := r.client.TeammateTaskTabStatus.Query()

	res, err := q.Paginate(ctx, after, first, before, last, ent.WithTeammateTaskTabStatusFilter(where.Filter))
	if err != nil {
		return nil, model.NewDBError(err)
	}
	return res, nil
}
