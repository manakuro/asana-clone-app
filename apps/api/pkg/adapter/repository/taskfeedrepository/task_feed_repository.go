package taskfeedrepository

import (
	"asana-clone-app/ent"
	ur "asana-clone-app/pkg/usecase/repository"
)

type taskFeedRepository struct {
	client *ent.Client
}

// New generates taskFeed repository.
func New(client *ent.Client) ur.TaskFeed {
	return &taskFeedRepository{client: client}
}
