package taskpriorityrepository

import (
	"asana-clone-app/ent"
	ur "asana-clone-app/pkg/usecase/repository"
)

type taskPriorityRepository struct {
	client *ent.Client
}

// New generates taskPriority repository.
func New(client *ent.Client) ur.TaskPriority {
	return &taskPriorityRepository{client: client}
}
