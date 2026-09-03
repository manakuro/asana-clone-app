package projectrepository

import (
	"asana-clone-app/ent"
	ur "asana-clone-app/pkg/usecase/repository"
)

type projectRepository struct {
	client *ent.Client
}

// New generates project repository.
func New(client *ent.Client) ur.Project {
	return &projectRepository{client: client}
}
