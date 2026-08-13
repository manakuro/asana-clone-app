package deletedtaskrepository

import (
	"context"
	"project-management-demo-backend/ent"
	"project-management-demo-backend/ent/deletedtask"
	"project-management-demo-backend/pkg/adapter/repository/repositoryutil"
	"project-management-demo-backend/pkg/entity/model"
)

func (r *deletedTaskRepository) Undelete(ctx context.Context, input model.UndeleteDeletedTaskInput) ([]*model.DeletedTask, error) {
	client := repositoryutil.WithTransactionalMutation(ctx)

	deletedTasks, err := client.DeletedTask.
		Query().
		WithTask().
		Where(deletedtask.TaskID(input.TaskID)).
		All(ctx)

	if err != nil {
		if ent.IsNotFound(err) {
			return nil, model.NewNotFoundError(err, input.TaskID)
		}
		return nil, model.NewDBError(err)
	}

	deletedIDs := make([]model.ID, len(deletedTasks))
	for i, t := range deletedTasks {
		deletedIDs[i] = t.ID
	}

	_, err = client.DeletedTask.
		Delete().
		Where(deletedtask.IDIn(deletedIDs...)).
		Exec(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	return deletedTasks, nil
}
