package teammaterepository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *teammateRepository) Create(ctx context.Context, input model.CreateTeammateInput) (*model.Teammate, error) {
	res, err := r.client.
		Teammate.
		Create().
		SetInput(input).
		Save(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}
