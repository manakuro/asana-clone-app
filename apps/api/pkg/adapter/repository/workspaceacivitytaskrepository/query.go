package workspaceacivitytaskrepository

import (
	"asana-clone-app/ent"
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *workspaceActivityTaskRepository) Get(ctx context.Context, where *model.WorkspaceActivityTaskWhereInput) (*model.WorkspaceActivityTask, error) {
	q := r.client.WorkspaceActivityTask.Query()

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

func (r *workspaceActivityTaskRepository) List(ctx context.Context) ([]*model.WorkspaceActivityTask, error) {
	res, err := r.client.WorkspaceActivityTask.Query().All(ctx)
	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}

func (r *workspaceActivityTaskRepository) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.WorkspaceActivityTaskWhereInput) (*model.WorkspaceActivityTaskConnection, error) {
	q := r.client.WorkspaceActivityTask.Query()

	res, err := q.Paginate(ctx, after, first, before, last, ent.WithWorkspaceActivityTaskFilter(where.Filter))
	if err != nil {
		return nil, model.NewDBError(err)
	}
	return res, nil
}
