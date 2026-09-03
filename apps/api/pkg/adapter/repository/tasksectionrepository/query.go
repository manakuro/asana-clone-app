package tasksectionrepository

import (
	"asana-clone-app/ent"
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *taskSectionRepository) Get(ctx context.Context, where *model.TaskSectionWhereInput) (*model.TaskSection, error) {
	q := r.client.TaskSection.Query()

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

func (r *taskSectionRepository) List(ctx context.Context) ([]*model.TaskSection, error) {
	res, err := r.client.TaskSection.Query().All(ctx)
	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}

func (r *taskSectionRepository) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskSectionWhereInput) (*model.TaskSectionConnection, error) {
	q := r.client.TaskSection.Query()

	res, err := q.Paginate(ctx, after, first, before, last, ent.WithTaskSectionFilter(where.Filter))
	if err != nil {
		return nil, model.NewDBError(err)
	}
	return res, nil
}
