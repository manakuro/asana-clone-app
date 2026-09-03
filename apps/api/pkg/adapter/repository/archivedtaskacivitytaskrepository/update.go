package archivedtaskacivitytaskrepository

import (
	"asana-clone-app/ent"
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *archivedArchivedTaskActivityTaskRepository) Update(ctx context.Context, input model.UpdateArchivedTaskActivityTaskInput) (*model.ArchivedTaskActivityTask, error) {
	res, err := r.client.
		ArchivedTaskActivityTask.UpdateOneID(input.ID).
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
