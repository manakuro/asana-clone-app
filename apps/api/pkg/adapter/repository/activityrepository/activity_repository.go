package activityrepository

import (
	"asana-clone-app/ent"
	ur "asana-clone-app/pkg/usecase/repository"
)

type activityRepository struct {
	client *ent.Client
}

// New generates teammate repository
func New(client *ent.Client) ur.Activity {
	return &activityRepository{client: client}
}
