package favoriteworkspacerepository

import (
	"asana-clone-app/ent"
	"asana-clone-app/ent/favoriteworkspace"
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *favoriteWorkspaceRepository) Delete(ctx context.Context, input model.DeleteFavoriteWorkspaceInput) (*model.FavoriteWorkspace, error) {
	deleted, err := r.client.
		FavoriteWorkspace.
		Query().
		Where(favoriteworkspace.WorkspaceID(input.WorkspaceID)).
		Where(favoriteworkspace.TeammateID(input.TeammateID)).
		Only(ctx)
	if err != nil {
		if ent.IsNotFound(err) {
			return nil, model.NewNotFoundError(err, input)
		}
		return nil, model.NewDBError(err)
	}

	_, err = r.client.
		FavoriteWorkspace.
		Delete().
		Where(favoriteworkspace.WorkspaceID(input.WorkspaceID)).
		Where(favoriteworkspace.TeammateID(input.TeammateID)).
		Exec(ctx)
	if err != nil {
		return nil, model.NewDBError(err)
	}

	return deleted, nil
}
