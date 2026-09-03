package projecticonrepository

import (
	"asana-clone-app/ent"
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *projectIconRepository) Get(ctx context.Context, where *model.ProjectIconWhereInput) (*model.ProjectIcon, error) {
	q := r.client.ProjectIcon.Query()

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

func (r *projectIconRepository) List(ctx context.Context) ([]*model.ProjectIcon, error) {
	res, err := r.client.ProjectIcon.Query().All(ctx)
	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}

func (r *projectIconRepository) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ProjectIconWhereInput) (*model.ProjectIconConnection, error) {
	q := r.client.ProjectIcon.Query()

	res, err := q.Paginate(ctx, after, first, before, last, ent.WithProjectIconFilter(where.Filter))
	if err != nil {
		return nil, model.NewDBError(err)
	}
	return res, nil
}
