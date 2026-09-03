package tasksectionrepository

import (
	"asana-clone-app/ent"
	ur "asana-clone-app/pkg/usecase/repository"
)

type taskSectionRepository struct {
	client *ent.Client
}

// New generates taskSection repository.
func New(client *ent.Client) ur.TaskSection {
	return &taskSectionRepository{client: client}
}
