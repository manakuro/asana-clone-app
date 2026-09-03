package projecttaskrepository

import (
	"asana-clone-app/ent"
	ur "asana-clone-app/pkg/usecase/repository"
)

type projectTaskRepository struct {
	client *ent.Client
}

// New generates projectTask repository.
func New(client *ent.Client) ur.ProjectTask {
	return &projectTaskRepository{client: client}
}
