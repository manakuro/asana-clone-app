package taskacivityrepository

import (
	"asana-clone-app/ent"
	ur "asana-clone-app/pkg/usecase/repository"
)

type taskActivityRepository struct {
	client *ent.Client
}

// New generates taskActivity repository.
func New(client *ent.Client) ur.TaskActivity {
	return &taskActivityRepository{client: client}
}
