package tasklistsortstatusrepository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *taskListSortStatusRepository) Create(ctx context.Context, input model.CreateTaskListSortStatusInput) (*model.TaskListSortStatus, error) {
	res, err := r.client.
		TaskListSortStatus.
		Create().
		SetInput(input).
		Save(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}
