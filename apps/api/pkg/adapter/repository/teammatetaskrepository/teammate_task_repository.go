package teammatetaskrepository

import (
	"asana-clone-app/ent"
	ur "asana-clone-app/pkg/usecase/repository"
)

type teammateTaskRepository struct {
	client *ent.Client
}

// New generates teammateTask repository.
func New(client *ent.Client) ur.TeammateTask {
	return &teammateTaskRepository{client: client}
}
