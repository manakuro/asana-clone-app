package projectbasecolorrepository

import (
	"asana-clone-app/ent"
	ur "asana-clone-app/pkg/usecase/repository"
)

type projectBaseColorRepository struct {
	client *ent.Client
}

// New generates projectBaseColor repository.
func New(client *ent.Client) ur.ProjectBaseColor {
	return &projectBaseColorRepository{client: client}
}
