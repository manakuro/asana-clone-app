package projecticonrepository

import (
	"asana-clone-app/ent"
	ur "asana-clone-app/pkg/usecase/repository"
)

type projectIconRepository struct {
	client *ent.Client
}

// New generates projectIcon repository.
func New(client *ent.Client) ur.ProjectIcon {
	return &projectIconRepository{client: client}
}
