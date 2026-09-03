package teammatetasksectionrepository

import (
	"asana-clone-app/ent"
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *teammateTaskSectionRepository) Update(ctx context.Context, input model.UpdateTeammateTaskSectionInput) (*model.TeammateTaskSection, error) {
	res, err := r.client.
		TeammateTaskSection.UpdateOneID(input.ID).
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
