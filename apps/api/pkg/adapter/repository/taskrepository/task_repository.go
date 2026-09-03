package taskrepository

import (
	"asana-clone-app/ent"
	ur "asana-clone-app/pkg/usecase/repository"
)

type taskRepository struct {
	client *ent.Client
}

// New generates task repository.
func New(client *ent.Client) ur.Task {
	return &taskRepository{client: client}
}
