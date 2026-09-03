package teammatetaskcolumnrepository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *teammateTaskColumnRepository) Create(ctx context.Context, input model.CreateTeammateTaskColumnInput) (*model.TeammateTaskColumn, error) {
	res, err := r.client.
		TeammateTaskColumn.
		Create().
		SetInput(input).
		Save(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}
