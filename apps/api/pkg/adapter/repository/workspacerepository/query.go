package workspacerepository

import (
	"asana-clone-app/ent"
	"asana-clone-app/pkg/adapter/repository/repositoryutil"
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *workspaceRepository) Get(ctx context.Context, where *model.WorkspaceWhereInput) (*model.Workspace, error) {
	q := r.client.Workspace.Query()

	q, err := where.Filter(q)
	if err != nil {
		return nil, model.NewInvalidParamError(nil)
	}

	q.WithWorkspaceTeammates(func(query *ent.WorkspaceTeammateQuery) {
		query.WithTeammate()
	})
	q.WithProjects(func(query *ent.ProjectQuery) {
		repositoryutil.WithProject(query)
	})

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

func (r *workspaceRepository) List(ctx context.Context) ([]*model.Workspace, error) {
	res, err := r.client.
		Workspace.Query().All(ctx)
	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}

func (r *workspaceRepository) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.WorkspaceWhereInput) (*model.WorkspaceConnection, error) {
	q := r.client.Workspace.Query()

	res, err := q.Paginate(ctx, after, first, before, last, ent.WithWorkspaceFilter(where.Filter))
	if err != nil {
		return nil, model.NewDBError(err)
	}
	return res, nil
}
