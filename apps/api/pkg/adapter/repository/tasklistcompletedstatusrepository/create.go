package tasklistcompletedstatusrepository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *taskListCompletedStatusRepository) Create(ctx context.Context, input model.CreateTaskListCompletedStatusInput) (*model.TaskListCompletedStatus, error) {
	res, err := r.client.
		TaskListCompletedStatus.
		Create().
		SetInput(input).
		Save(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}
