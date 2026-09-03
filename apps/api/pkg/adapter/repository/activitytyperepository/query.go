package activitytyperepository

import (
	"asana-clone-app/ent"
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *activityTypeRepository) Get(ctx context.Context, where *model.ActivityTypeWhereInput) (*model.ActivityType, error) {
	q := r.client.ActivityType.Query()

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

func (r *activityTypeRepository) List(ctx context.Context) ([]*model.ActivityType, error) {
	res, err := r.client.ActivityType.Query().All(ctx)
	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}

func (r *activityTypeRepository) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ActivityTypeWhereInput) (*model.ActivityTypeConnection, error) {
	q := r.client.ActivityType.Query()

	res, err := q.Paginate(ctx, after, first, before, last, ent.WithActivityTypeFilter(where.Filter))
	if err != nil {
		return nil, model.NewDBError(err)
	}
	return res, nil
}
