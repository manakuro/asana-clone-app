package taskfeedlikerepository

import (
	"asana-clone-app/ent"
	ur "asana-clone-app/pkg/usecase/repository"
)

type taskFeedLikeRepository struct {
	client *ent.Client
}

// New generates taskFeedLike repository.
func New(client *ent.Client) ur.TaskFeedLike {
	return &taskFeedLikeRepository{client: client}
}
