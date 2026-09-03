package archivedactivityrepository

import (
	"asana-clone-app/ent"
	ur "asana-clone-app/pkg/usecase/repository"
)

type archivedActivityRepository struct {
	client *ent.Client
}

// New generates teammate repository
func New(client *ent.Client) ur.ArchivedActivity {
	return &archivedActivityRepository{client: client}
}
