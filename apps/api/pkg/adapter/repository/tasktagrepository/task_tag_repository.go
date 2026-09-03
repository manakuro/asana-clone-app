package tasktagrepository

import (
	"asana-clone-app/ent"
	ur "asana-clone-app/pkg/usecase/repository"
)

type taskTagRepository struct {
	client *ent.Client
}

// New generates taskTag repository.
func New(client *ent.Client) ur.TaskTag {
	return &taskTagRepository{client: client}
}
