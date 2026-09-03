package projecttaskliststatusrepository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *projectTaskListStatusRepository) Create(ctx context.Context, input model.CreateProjectTaskListStatusInput) (*model.ProjectTaskListStatus, error) {
	res, err := r.client.
		ProjectTaskListStatus.
		Create().
		SetInput(input).
		Save(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}
