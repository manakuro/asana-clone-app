package taskacivitytaskrepository

import (
	"asana-clone-app/ent"
	ur "asana-clone-app/pkg/usecase/repository"
)

type taskActivityTaskRepository struct {
	client *ent.Client
}

// New generates taskActivityTask repository.
func New(client *ent.Client) ur.TaskActivityTask {
	return &taskActivityTaskRepository{client: client}
}
