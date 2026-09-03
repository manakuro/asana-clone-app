package tagrepository

import (
	"asana-clone-app/ent"
	ur "asana-clone-app/pkg/usecase/repository"
)

type tagRepository struct {
	client *ent.Client
}

// New generates tag repository.
func New(client *ent.Client) ur.Tag {
	return &tagRepository{client: client}
}
