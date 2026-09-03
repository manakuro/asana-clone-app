package favoriteprojectrepository

import (
	"asana-clone-app/ent"
	ur "asana-clone-app/pkg/usecase/repository"
)

type favoriteProjectRepository struct {
	client *ent.Client
}

// New generates favoriteProject repository.
func New(client *ent.Client) ur.FavoriteProject {
	return &favoriteProjectRepository{client: client}
}
