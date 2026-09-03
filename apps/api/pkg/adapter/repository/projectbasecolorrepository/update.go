package projectbasecolorrepository

import (
	"asana-clone-app/ent"
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *projectBaseColorRepository) Update(ctx context.Context, input model.UpdateProjectBaseColorInput) (*model.ProjectBaseColor, error) {
	res, err := r.client.
		ProjectBaseColor.
		UpdateOneID(input.ID).
		SetInput(input).
		Save(ctx)

	if err != nil {
		if ent.IsNotFound(err) {
			return nil, model.NewNotFoundError(err, input.ID)
		}

		return nil, model.NewDBError(err)
	}

	return res, nil
}
