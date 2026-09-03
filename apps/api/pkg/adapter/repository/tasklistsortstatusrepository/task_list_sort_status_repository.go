package tasklistsortstatusrepository

import (
	"asana-clone-app/ent"
	ur "asana-clone-app/pkg/usecase/repository"
)

type taskListSortStatusRepository struct {
	client *ent.Client
}

// New generates taskListSortStatus repository.
func New(client *ent.Client) ur.TaskListSortStatus {
	return &taskListSortStatusRepository{client: client}
}
