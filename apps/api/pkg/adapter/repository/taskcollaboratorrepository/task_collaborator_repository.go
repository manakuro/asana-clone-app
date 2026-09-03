package taskcollaboratorrepository

import (
	"asana-clone-app/ent"
	ur "asana-clone-app/pkg/usecase/repository"
)

type taskCollaboratorRepository struct {
	client *ent.Client
}

// New generates taskCollaborator repository.
func New(client *ent.Client) ur.TaskCollaborator {
	return &taskCollaboratorRepository{client: client}
}
