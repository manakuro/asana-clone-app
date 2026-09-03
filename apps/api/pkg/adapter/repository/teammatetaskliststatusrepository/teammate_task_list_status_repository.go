package teammatetaskliststatusrepository

import (
	"asana-clone-app/ent"
	ur "asana-clone-app/pkg/usecase/repository"
)

type teammateTaskListStatusRepository struct {
	client *ent.Client
}

// New generates teammateTaskListStatus repository.
func New(client *ent.Client) ur.TeammateTaskListStatus {
	return &teammateTaskListStatusRepository{client: client}
}
