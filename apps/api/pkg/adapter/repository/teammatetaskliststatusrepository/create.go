package teammatetaskliststatusrepository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *teammateTaskListStatusRepository) Create(ctx context.Context, input model.CreateTeammateTaskListStatusInput) (*model.TeammateTaskListStatus, error) {
	res, err := r.client.
		TeammateTaskListStatus.
		Create().
		SetInput(input).
		Save(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}
