package tagrepository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *tagRepository) Create(ctx context.Context, input model.CreateTagInput) (*model.Tag, error) {
	res, err := r.client.
		Tag.
		Create().
		SetInput(input).
		Save(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}
