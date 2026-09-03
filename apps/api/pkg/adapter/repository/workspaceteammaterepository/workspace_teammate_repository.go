package workspaceteammaterepository

import (
	"asana-clone-app/ent"
	ur "asana-clone-app/pkg/usecase/repository"
)

type workspaceTeammateRepository struct {
	client *ent.Client
}

// New generates workspaceTeammate repository.
func New(client *ent.Client) ur.WorkspaceTeammate {
	return &workspaceTeammateRepository{client: client}
}
