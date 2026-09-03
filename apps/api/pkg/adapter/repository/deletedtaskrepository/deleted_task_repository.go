package deletedtaskrepository

import (
	"asana-clone-app/ent"
	ur "asana-clone-app/pkg/usecase/repository"
)

type deletedTaskRepository struct {
	client *ent.Client
}

// New generates deletedTask repository.
func New(client *ent.Client) ur.DeletedTask {
	return &deletedTaskRepository{client: client}
}
