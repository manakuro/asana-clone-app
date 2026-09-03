package teammatetaskrepository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *teammateTaskRepository) Create(ctx context.Context, input model.CreateTeammateTaskInput) (*model.TeammateTask, error) {
	// TODO: Add transaction here
	//client := WithTransactionalMutation(ctx)

	tc := r.client.Task.
		Create().
		SetIsNew(true).
		SetCreatedBy(input.TeammateID).
		SetAssigneeID(input.TeammateID).
		SetName("").
		SetDescription(model.DefaultEditorDescription())

	if input.TaskParentID != nil {
		tc.SetTaskParentID(*input.TaskParentID)
	}

	newTask, err := tc.Save(ctx)
	if err != nil {
		return nil, model.NewDBError(err)
	}

	_, err = r.client.TaskFeed.Create().
		SetTask(newTask).
		SetIsFirst(true).
		SetDescription(model.DefaultEditorDescription()).
		SetTeammateID(input.TeammateID).
		Save(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	res, err := r.client.
		TeammateTask.
		Create().
		SetInput(input).
		SetTask(newTask).
		Save(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}
