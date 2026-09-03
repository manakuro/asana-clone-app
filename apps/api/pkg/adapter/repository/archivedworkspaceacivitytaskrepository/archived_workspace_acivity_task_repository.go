package archivedworkspaceacivitytaskrepository

import (
	"asana-clone-app/ent"
	ur "asana-clone-app/pkg/usecase/repository"
)

type archivedWorkspaceActivityTaskRepository struct {
	client *ent.Client
}

// New generates archivedWorkspaceActivityTask repository.
func New(client *ent.Client) ur.ArchivedWorkspaceActivityTask {
	return &archivedWorkspaceActivityTaskRepository{client: client}
}
