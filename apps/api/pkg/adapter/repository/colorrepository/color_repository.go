package colorrepository

import (
	"asana-clone-app/ent"
	ur "asana-clone-app/pkg/usecase/repository"
)

type colorRepository struct {
	client *ent.Client
}

// New generates color repository.
func New(client *ent.Client) ur.Color {
	return &colorRepository{client: client}
}
