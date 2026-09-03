package tasklistcompletedstatusrepository

import (
	"asana-clone-app/ent"
	ur "asana-clone-app/pkg/usecase/repository"
)

type taskListCompletedStatusRepository struct {
	client *ent.Client
}

// New generates taskListCompletedStatus repository.
func New(client *ent.Client) ur.TaskListCompletedStatus {
	return &taskListCompletedStatusRepository{client: client}
}
