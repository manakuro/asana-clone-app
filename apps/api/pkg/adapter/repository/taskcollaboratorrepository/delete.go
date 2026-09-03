package taskcollaboratorrepository

import (
	"asana-clone-app/ent"
	"asana-clone-app/ent/taskcollaborator"
	"asana-clone-app/pkg/adapter/repository/repositoryutil"
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *taskCollaboratorRepository) Delete(ctx context.Context, input model.DeleteTaskCollaboratorInput) (*model.TaskCollaborator, error) {
	client := repositoryutil.WithTransactionalMutation(ctx)

	deleted, err := client.TaskCollaborator.
		Query().
		Where(taskcollaborator.IDEQ(input.ID)).
		Only(ctx)

	if err != nil {
		if ent.IsNotFound(err) {
			return nil, model.NewNotFoundError(err, input.ID)
		}
		return nil, model.NewDBError(err)
	}

	err = client.TaskCollaborator.DeleteOneID(input.ID).Exec(ctx)
	if err != nil {
		return nil, model.NewDBError(err)
	}

	return deleted, nil
}
