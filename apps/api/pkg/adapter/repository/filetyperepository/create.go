package filetyperepository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *fileTypeRepository) Create(ctx context.Context, input model.CreateFileTypeInput) (*model.FileType, error) {
	res, err := r.client.
		FileType.
		Create().
		SetInput(input).
		Save(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}
