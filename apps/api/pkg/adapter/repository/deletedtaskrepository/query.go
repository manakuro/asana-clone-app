package deletedtaskrepository

import (
	"asana-clone-app/ent"
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *deletedTaskRepository) Get(ctx context.Context, where *model.DeletedTaskWhereInput) (*model.DeletedTask, error) {
	q := r.client.DeletedTask.Query()

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

func (r *deletedTaskRepository) List(ctx context.Context) ([]*model.DeletedTask, error) {
	res, err := r.client.DeletedTask.Query().All(ctx)
	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}

func (r *deletedTaskRepository) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.DeletedTaskWhereInput) (*model.DeletedTaskConnection, error) {
	q := r.client.DeletedTask.Query()

	res, err := q.Paginate(ctx, after, first, before, last, ent.WithDeletedTaskFilter(where.Filter))
	if err != nil {
		return nil, model.NewDBError(err)
	}
	return res, nil
}
