package projecttaskrepository

import (
	"asana-clone-app/ent"
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *projectTaskRepository) Update(ctx context.Context, input model.UpdateProjectTaskInput) (*model.ProjectTask, error) {
	res, err := r.client.
		ProjectTask.UpdateOneID(input.ID).
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
