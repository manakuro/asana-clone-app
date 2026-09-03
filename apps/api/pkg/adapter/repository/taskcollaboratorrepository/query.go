package taskcollaboratorrepository

import (
	"asana-clone-app/ent"
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *taskCollaboratorRepository) Get(ctx context.Context, where *model.TaskCollaboratorWhereInput) (*model.TaskCollaborator, error) {
	q := r.client.TaskCollaborator.Query()

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

func (r *taskCollaboratorRepository) List(ctx context.Context, where *model.TaskCollaboratorWhereInput) ([]*model.TaskCollaborator, error) {
	q := r.client.TaskCollaborator.Query()

	q, err := where.Filter(q)
	if err != nil {
		return nil, model.NewInvalidParamError(nil)
	}

	res, err := q.All(ctx)
	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}

func (r *taskCollaboratorRepository) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskCollaboratorWhereInput) (*model.TaskCollaboratorConnection, error) {
	q := r.client.TaskCollaborator.Query()

	res, err := q.Paginate(ctx, after, first, before, last, ent.WithTaskCollaboratorFilter(where.Filter))
	if err != nil {
		return nil, model.NewDBError(err)
	}
	return res, nil
}
