package projecttaskliststatusrepository

import (
	"asana-clone-app/ent"
	ur "asana-clone-app/pkg/usecase/repository"
)

type projectTaskListStatusRepository struct {
	client *ent.Client
}

// New generates projectTaskListStatus repository.
func New(client *ent.Client) ur.ProjectTaskListStatus {
	return &projectTaskListStatusRepository{client: client}
}
