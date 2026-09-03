package favoriteworkspacerepository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *favoriteWorkspaceRepository) Create(ctx context.Context, input model.CreateFavoriteWorkspaceInput) (*model.FavoriteWorkspace, error) {
	res, err := r.client.
		FavoriteWorkspace.
		Create().
		SetInput(input).
		Save(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}
