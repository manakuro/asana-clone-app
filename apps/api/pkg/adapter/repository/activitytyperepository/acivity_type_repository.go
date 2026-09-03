package activitytyperepository

import (
	"asana-clone-app/ent"
	ur "asana-clone-app/pkg/usecase/repository"
)

type activityTypeRepository struct {
	client *ent.Client
}

// New generates activityType repository
func New(client *ent.Client) ur.ActivityType {
	return &activityTypeRepository{client: client}
}
