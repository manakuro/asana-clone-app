package projecttasksectionrepository

import (
	"asana-clone-app/ent"
	ur "asana-clone-app/pkg/usecase/repository"
)

type projectTaskSectionRepository struct {
	client *ent.Client
}

// New generates projectTaskSection repository.
func New(client *ent.Client) ur.ProjectTaskSection {
	return &projectTaskSectionRepository{client: client}
}
