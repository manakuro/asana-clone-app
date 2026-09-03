package archivedtaskacivityrepository

import (
	"asana-clone-app/ent"
	ur "asana-clone-app/pkg/usecase/repository"
)

type archivedTaskActivityRepository struct {
	client *ent.Client
}

// New generates archivedTaskActivity repository
func New(client *ent.Client) ur.ArchivedTaskActivity {
	return &archivedTaskActivityRepository{client: client}
}
