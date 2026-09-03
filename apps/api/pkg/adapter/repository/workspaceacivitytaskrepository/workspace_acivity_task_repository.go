package workspaceacivitytaskrepository

import (
	"asana-clone-app/ent"
	ur "asana-clone-app/pkg/usecase/repository"
)

type workspaceActivityTaskRepository struct {
	client *ent.Client
}

// New generates workspaceActivityTask repository.
func New(client *ent.Client) ur.WorkspaceActivityTask {
	return &workspaceActivityTaskRepository{client: client}
}
