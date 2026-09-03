package workspaceacivityrepository

import (
	"asana-clone-app/ent"
	ur "asana-clone-app/pkg/usecase/repository"
)

type workspaceActivityRepository struct {
	client *ent.Client
}

// New generates workspaceActivity repository.
func New(client *ent.Client) ur.WorkspaceActivity {
	return &workspaceActivityRepository{client: client}
}
