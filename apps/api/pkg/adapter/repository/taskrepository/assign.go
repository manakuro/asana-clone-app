package taskrepository

import (
	"asana-clone-app/ent"
	"asana-clone-app/ent/teammatetask"
	"asana-clone-app/ent/teammatetasksection"
	"asana-clone-app/pkg/adapter/repository/repositoryutil"
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *taskRepository) Assign(ctx context.Context, input model.AssignTaskInput) (*model.AssignTaskPayload, error) {
	client := repositoryutil.WithTransactionalMutation(ctx)

	updatedTask, err := client.Task.UpdateOneID(input.ID).SetAssigneeID(input.AssigneeID).Save(ctx)
	if err != nil {
		if ent.IsNotFound(err) {
			return nil, model.NewNotFoundError(err, input)
		}
		return nil, model.NewDBError(err)
	}

	t, err := client.TeammateTask.Query().Where(teammatetask.TaskID(updatedTask.ID)).Only(ctx)
	if err != nil && !ent.IsNotFound(err) {
		return nil, model.NewDBError(err)
	}
	if t != nil {
		_, derr := client.TeammateTask.Delete().Where(teammatetask.ID(t.ID)).Exec(ctx)
		if derr != nil {
			return nil, model.NewDBError(derr)
		}
	}

	assignedTeammateTaskSection, err := client.
		TeammateTaskSection.
		Query().
		Where(
			teammatetasksection.TeammateID(input.AssigneeID),
			teammatetasksection.Assigned(true),
		).
		Only(ctx)
	if err != nil {
		return nil, model.NewDBError(err)
	}

	t, err = client.TeammateTask.Create().
		SetTaskID(input.ID).
		SetTeammateID(input.AssigneeID).
		SetTeammateTaskSectionID(assignedTeammateTaskSection.ID).
		SetWorkspaceID(input.WorkspaceID).
		Save(ctx)
	if err != nil {
		return nil, model.NewDBError(err)
	}

	teammateTask, err := client.TeammateTask.
		Query().
		WithTask(func(tq *ent.TaskQuery) {
			repositoryutil.WithTask(tq)
		}).
		Where(teammatetask.ID(t.ID)).
		Only(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	return &model.AssignTaskPayload{
		Task:         updatedTask,
		TeammateTask: teammateTask.Unwrap(),
	}, nil
}
