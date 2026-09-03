package teammatetasksectionrepository

import (
	"asana-clone-app/ent"
	ur "asana-clone-app/pkg/usecase/repository"
)

type teammateTaskSectionRepository struct {
	client *ent.Client
}

// New generates teammateTaskSection repository.
func New(client *ent.Client) ur.TeammateTaskSection {
	return &teammateTaskSectionRepository{client: client}
}
