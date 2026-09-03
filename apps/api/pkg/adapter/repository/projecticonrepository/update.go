package projecticonrepository

import (
	"asana-clone-app/ent"
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *projectIconRepository) Update(ctx context.Context, input model.UpdateProjectIconInput) (*model.ProjectIcon, error) {
	res, err := r.client.
		ProjectIcon.
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
