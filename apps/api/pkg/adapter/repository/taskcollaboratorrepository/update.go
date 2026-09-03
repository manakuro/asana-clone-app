package taskcollaboratorrepository

import (
	"asana-clone-app/ent"
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *taskCollaboratorRepository) Update(ctx context.Context, input model.UpdateTaskCollaboratorInput) (*model.TaskCollaborator, error) {
	res, err := r.client.
		TaskCollaborator.UpdateOneID(input.ID).
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
