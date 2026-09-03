package teammatetaskcolumnrepository

import (
	"asana-clone-app/ent"
	ur "asana-clone-app/pkg/usecase/repository"
)

type teammateTaskColumnRepository struct {
	client *ent.Client
}

// New generates teammateTaskColumn repository.
func New(client *ent.Client) ur.TeammateTaskColumn {
	return &teammateTaskColumnRepository{client: client}
}
