package favoriteprojectrepository

import (
	"context"
	"project-management-demo-backend/ent"
	"project-management-demo-backend/ent/favoriteproject"
	"project-management-demo-backend/pkg/entity/model"
)

func (r *favoriteProjectRepository) Delete(ctx context.Context, input model.DeleteFavoriteProjectInput) (*model.FavoriteProject, error) {
	deleted, err := r.client.
		FavoriteProject.
		Query().
		Where(favoriteproject.ProjectID(input.ProjectID)).
		Where(favoriteproject.TeammateID(input.TeammateID)).
		Only(ctx)
	if err != nil {
		if ent.IsNotFound(err) {
			return nil, model.NewNotFoundError(err, input)
		}
		return nil, model.NewDBError(err)
	}

	_, err = r.client.
		FavoriteProject.
		Delete().
		Where(favoriteproject.ProjectID(input.ProjectID)).
		Where(favoriteproject.TeammateID(input.TeammateID)).
		Exec(ctx)
	if err != nil {
		return nil, model.NewDBError(err)
	}

	return deleted, nil
}
