package taskcolumnrepository

import (
	"asana-clone-app/ent"
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *taskColumnRepository) Update(ctx context.Context, input model.UpdateTaskColumnInput) (*model.TaskColumn, error) {
	res, err := r.client.
		TaskColumn.UpdateOneID(input.ID).
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
