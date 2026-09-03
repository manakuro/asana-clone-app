package favoriteprojectrepository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *favoriteProjectRepository) Create(ctx context.Context, input model.CreateFavoriteProjectInput) (*model.FavoriteProject, error) {
	res, err := r.client.
		FavoriteProject.
		Create().
		SetInput(input).
		Save(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}
