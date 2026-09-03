package teammatetasktabstatusrepository

import (
	"asana-clone-app/ent"
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *teammateTaskTabStatusRepository) Update(ctx context.Context, input model.UpdateTeammateTaskTabStatusInput) (*model.TeammateTaskTabStatus, error) {
	res, err := r.client.
		TeammateTaskTabStatus.UpdateOneID(input.ID).
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
