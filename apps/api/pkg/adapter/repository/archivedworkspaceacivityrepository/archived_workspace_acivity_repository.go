package archivedworkspaceacivityrepository

import (
	"asana-clone-app/ent"
	ur "asana-clone-app/pkg/usecase/repository"
)

type archivedWorkspaceActivityRepository struct {
	client *ent.Client
}

// New generates archivedWorkspaceActivity repository.
func New(client *ent.Client) ur.ArchivedWorkspaceActivity {
	return &archivedWorkspaceActivityRepository{client: client}
}
