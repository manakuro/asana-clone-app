package merepository

import (
	"asana-clone-app/ent"
	ur "asana-clone-app/pkg/usecase/repository"
)

type meRepository struct {
	client *ent.Client
}

// New generates teammate repository.
func New(client *ent.Client) ur.Me {
	return &meRepository{client: client}
}
