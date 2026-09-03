package workspacerepository

import (
	"asana-clone-app/ent"
	ur "asana-clone-app/pkg/usecase/repository"
)

type workspaceRepository struct {
	client *ent.Client
}

// New generates workspace repository.
func New(client *ent.Client) ur.Workspace {
	return &workspaceRepository{client: client}
}
