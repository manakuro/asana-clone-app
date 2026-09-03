package colorrepository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *colorRepository) Create(ctx context.Context, input model.CreateColorInput) (*model.Color, error) {
	res, err := r.client.
		Color.
		Create().
		SetInput(input).
		Save(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}
