package teammaterepository

import (
	"asana-clone-app/ent"
	ur "asana-clone-app/pkg/usecase/repository"
)

type teammateRepository struct {
	client *ent.Client
}

// New generates teammate repository.
func New(client *ent.Client) ur.Teammate {
	return &teammateRepository{client: client}
}
