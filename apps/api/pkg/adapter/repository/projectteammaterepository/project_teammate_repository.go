package projectteammaterepository

import (
	"asana-clone-app/ent"
	ur "asana-clone-app/pkg/usecase/repository"
)

type projectTeammateRepository struct {
	client *ent.Client
}

// New generates projectTeammate repository.
func New(client *ent.Client) ur.ProjectTeammate {
	return &projectTeammateRepository{client: client}
}
