package projecttaskrepository

import (
	"asana-clone-app/ent"
	"asana-clone-app/ent/projecttask"
	"asana-clone-app/pkg/adapter/repository/repositoryutil"
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *projectTaskRepository) Delete(ctx context.Context, input model.DeleteProjectTaskInput) (*model.ProjectTask, error) {
	client := repositoryutil.WithTransactionalMutation(ctx)

	deleted, err := client.ProjectTask.
		Query().
		Where(projecttask.IDEQ(input.ID)).
		Only(ctx)

	if err != nil {
		if ent.IsNotFound(err) {
			return nil, model.NewNotFoundError(err, input.ID)
		}
		return nil, model.NewDBError(err)
	}

	err = client.ProjectTask.DeleteOneID(input.ID).Exec(ctx)
	if err != nil {
		return nil, model.NewDBError(err)
	}

	return deleted, nil
}
