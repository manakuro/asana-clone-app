package archivedtaskacivitytaskrepository

import (
	"asana-clone-app/ent"
	ur "asana-clone-app/pkg/usecase/repository"
)

type archivedArchivedTaskActivityTaskRepository struct {
	client *ent.Client
}

// New generates archivedArchivedTaskActivityTask repository.
func New(client *ent.Client) ur.ArchivedTaskActivityTask {
	return &archivedArchivedTaskActivityTaskRepository{client: client}
}
