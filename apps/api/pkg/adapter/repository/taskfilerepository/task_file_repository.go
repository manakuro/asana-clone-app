package taskfilerepository

import (
	"asana-clone-app/ent"
	ur "asana-clone-app/pkg/usecase/repository"
)

type taskFileRepository struct {
	client *ent.Client
}

// New generates taskFile repository.
func New(client *ent.Client) ur.TaskFile {
	return &taskFileRepository{client: client}
}
