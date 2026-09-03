package taskfilerepository

import (
	"asana-clone-app/ent"
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *taskFileRepository) Get(ctx context.Context, where *model.TaskFileWhereInput) (*model.TaskFile, error) {
	q := r.client.TaskFile.Query()

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

func (r *taskFileRepository) List(ctx context.Context) ([]*model.TaskFile, error) {
	res, err := r.client.TaskFile.Query().All(ctx)
	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}

func (r *taskFileRepository) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskFileWhereInput) (*model.TaskFileConnection, error) {
	q := r.client.TaskFile.Query()

	res, err := q.Paginate(ctx, after, first, before, last, ent.WithTaskFileFilter(where.Filter))
	if err != nil {
		return nil, model.NewDBError(err)
	}
	return res, nil
}
