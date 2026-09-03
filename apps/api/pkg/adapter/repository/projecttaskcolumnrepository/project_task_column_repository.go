package projecttaskcolumnrepository

import (
	"asana-clone-app/ent"
	ur "asana-clone-app/pkg/usecase/repository"
)

type projectTaskColumnRepository struct {
	client *ent.Client
}

// New generates projectTaskColumn repository.
func New(client *ent.Client) ur.ProjectTaskColumn {
	return &projectTaskColumnRepository{client: client}
}
