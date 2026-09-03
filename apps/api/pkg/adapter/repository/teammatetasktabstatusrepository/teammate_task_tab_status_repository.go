package teammatetasktabstatusrepository

import (
	"asana-clone-app/ent"
	ur "asana-clone-app/pkg/usecase/repository"
)

type teammateTaskTabStatusRepository struct {
	client *ent.Client
}

// New generates teammateTaskTabStatus repository.
func New(client *ent.Client) ur.TeammateTaskTabStatus {
	return &teammateTaskTabStatusRepository{client: client}
}
