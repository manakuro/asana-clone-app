package projectlightcolorrepository

import (
	"asana-clone-app/ent"
	ur "asana-clone-app/pkg/usecase/repository"
)

type projectLightColorRepository struct {
	client *ent.Client
}

// New generates projectLightColor repository.
func New(client *ent.Client) ur.ProjectLightColor {
	return &projectLightColorRepository{client: client}
}
