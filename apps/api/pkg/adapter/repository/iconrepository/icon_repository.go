package iconrepository

import (
	"asana-clone-app/ent"
	ur "asana-clone-app/pkg/usecase/repository"
)

type iconRepository struct {
	client *ent.Client
}

// New generates icon repository.
func New(client *ent.Client) ur.Icon {
	return &iconRepository{client: client}
}
