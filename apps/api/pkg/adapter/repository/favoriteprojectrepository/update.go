package favoriteprojectrepository

import (
	"asana-clone-app/ent"
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *favoriteProjectRepository) Update(ctx context.Context, input model.UpdateFavoriteProjectInput) (*model.FavoriteProject, error) {
	res, err := r.client.
		FavoriteProject.UpdateOneID(input.ID).
		SetInput(input).
		Save(ctx)

	if err != nil {
		if ent.IsNotFound(err) {
			return nil, model.NewNotFoundError(err, input.ID)
		}

		return nil, model.NewDBError(err)
	}

	return res, nil
}
