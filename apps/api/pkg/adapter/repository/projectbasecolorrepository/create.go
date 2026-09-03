package projectbasecolorrepository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *projectBaseColorRepository) Create(ctx context.Context, input model.CreateProjectBaseColorInput) (*model.ProjectBaseColor, error) {
	res, err := r.client.
		ProjectBaseColor.
		Create().
		SetInput(input).
		Save(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}
