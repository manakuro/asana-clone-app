package teammatetaskrepository

import (
	"asana-clone-app/ent"
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *teammateTaskRepository) Update(ctx context.Context, input model.UpdateTeammateTaskInput) (*model.TeammateTask, error) {
	res, err := r.client.
		TeammateTask.UpdateOneID(input.ID).
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
