package projecttaskcolumnrepository

import (
	"asana-clone-app/ent"
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *projectTaskColumnRepository) Update(ctx context.Context, input model.UpdateProjectTaskColumnInput) (*model.ProjectTaskColumn, error) {
	res, err := r.client.
		ProjectTaskColumn.UpdateOneID(input.ID).
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
