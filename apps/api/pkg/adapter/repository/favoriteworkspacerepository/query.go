package favoriteworkspacerepository

import (
	"asana-clone-app/ent"
	"asana-clone-app/ent/favoriteworkspace"
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *favoriteWorkspaceRepository) Get(ctx context.Context, where *model.FavoriteWorkspaceWhereInput) (*model.FavoriteWorkspace, error) {
	q := r.client.FavoriteWorkspace.Query()

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

func (r *favoriteWorkspaceRepository) List(ctx context.Context) ([]*model.FavoriteWorkspace, error) {
	res, err := r.client.
		FavoriteWorkspace.Query().All(ctx)
	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}

func (r *favoriteWorkspaceRepository) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.FavoriteWorkspaceWhereInput) (*model.FavoriteWorkspaceConnection, error) {
	q := r.client.FavoriteWorkspace.Query()

	res, err := q.Paginate(ctx, after, first, before, last, ent.WithFavoriteWorkspaceFilter(where.Filter))
	if err != nil {
		return nil, model.NewDBError(err)
	}
	return res, nil
}

func (r *favoriteWorkspaceRepository) FavoriteWorkspaceIDs(ctx context.Context, teammateID model.ID, workspaceID *model.ID) ([]model.ID, error) {
	q := r.client.
		FavoriteWorkspace.
		Query()

	if workspaceID != nil {
		q.Where(favoriteworkspace.WorkspaceID(*workspaceID))
	}

	res, err := q.Where(favoriteworkspace.TeammateID(teammateID)).All(ctx)
	if err != nil {
		if ent.IsNotFound(err) {
			return nil, nil
		}

		return nil, model.NewDBError(err)
	}

	ids := make([]model.ID, len(res))
	for i, fp := range res {
		ids[i] = fp.WorkspaceID
	}

	return ids, nil
}
