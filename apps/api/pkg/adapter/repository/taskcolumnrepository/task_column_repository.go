package taskcolumnrepository

import (
	"asana-clone-app/ent"
	ur "asana-clone-app/pkg/usecase/repository"
)

type taskColumnRepository struct {
	client *ent.Client
}

// New generates taskColumn repository.
func New(client *ent.Client) ur.TaskColumn {
	return &taskColumnRepository{client: client}
}
