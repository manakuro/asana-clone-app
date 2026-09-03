package tasklikerepository

import (
	"asana-clone-app/ent"
	ur "asana-clone-app/pkg/usecase/repository"
)

type taskLikeRepository struct {
	client *ent.Client
}

// New generates taskLike repository.
func New(client *ent.Client) ur.TaskLike {
	return &taskLikeRepository{client: client}
}
