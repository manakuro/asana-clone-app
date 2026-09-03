package taskcollaboratorrepository

import (
	"asana-clone-app/ent/taskcollaborator"
	"asana-clone-app/pkg/adapter/repository/repositoryutil"
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *taskCollaboratorRepository) Create(ctx context.Context, input model.CreateTaskCollaboratorInput) (*model.TaskCollaborator, error) {
	client := repositoryutil.WithTransactionalMutation(ctx)

	res, err := client.
		TaskCollaborator.
		Create().
		SetInput(input).
		Save(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	q := client.TaskCollaborator.Query().Where(taskcollaborator.ID(res.ID))

	repositoryutil.WithTaskCollaborator(q)

	taskCollaborator, err := q.Only(ctx)
	if err != nil {
		return nil, model.NewDBError(err)
	}

	return taskCollaborator, nil
}
