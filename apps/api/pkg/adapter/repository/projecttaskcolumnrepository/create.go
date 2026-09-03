package projecttaskcolumnrepository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *projectTaskColumnRepository) Create(ctx context.Context, input model.CreateProjectTaskColumnInput) (*model.ProjectTaskColumn, error) {
	res, err := r.client.
		ProjectTaskColumn.
		Create().
		SetInput(input).
		Save(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}
