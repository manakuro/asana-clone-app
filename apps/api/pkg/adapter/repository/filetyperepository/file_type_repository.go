package filetyperepository

import (
	"asana-clone-app/ent"
	ur "asana-clone-app/pkg/usecase/repository"
)

type fileTypeRepository struct {
	client *ent.Client
}

// New generates fileType repository.
func New(client *ent.Client) ur.FileType {
	return &fileTypeRepository{client: client}
}
