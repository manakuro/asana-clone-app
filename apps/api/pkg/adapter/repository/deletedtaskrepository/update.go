package deletedtaskrepository

import (
	"asana-clone-app/ent"
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *deletedTaskRepository) Update(ctx context.Context, input model.UpdateDeletedTaskInput) (*model.DeletedTask, error) {
	res, err := r.client.
		DeletedTask.UpdateOneID(input.ID).
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
