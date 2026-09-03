package teammatetasksectionrepository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *teammateTaskSectionRepository) Create(ctx context.Context, input model.CreateTeammateTaskSectionInput) (*model.TeammateTaskSection, error) {
	res, err := r.client.
		TeammateTaskSection.
		Create().
		SetInput(input).
		SetName("").
		Save(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}
