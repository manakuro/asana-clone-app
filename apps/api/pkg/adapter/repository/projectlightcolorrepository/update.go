package projectlightcolorrepository

import (
	"asana-clone-app/ent"
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *projectLightColorRepository) Update(ctx context.Context, input model.UpdateProjectLightColorInput) (*model.ProjectLightColor, error) {
	res, err := r.client.
		ProjectLightColor.
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
