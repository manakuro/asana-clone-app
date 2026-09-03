package mentionrepository

import (
	"asana-clone-app/ent"
	ur "asana-clone-app/pkg/usecase/repository"
)

type mentionRepository struct {
	client *ent.Client
}

// New generates teammate repository.
func New(client *ent.Client) ur.Mention {
	return &mentionRepository{client: client}
}
