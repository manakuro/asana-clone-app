package projecttasksectionrepository

import (
	"asana-clone-app/ent"
	"asana-clone-app/ent/projecttasksection"
	"asana-clone-app/pkg/adapter/repository/repositoryutil"
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *projectTaskSectionRepository) Delete(ctx context.Context, input model.DeleteProjectTaskSectionInput) (*model.ProjectTaskSection, error) {
	client := repositoryutil.WithTransactionalMutation(ctx)

	deleted, err := client.ProjectTaskSection.Query().Where(projecttasksection.IDEQ(input.ID)).Only(ctx)
	if err != nil {
		if ent.IsNotFound(err) {
			return nil, model.NewNotFoundError(err, input.ID)
		}
		return nil, model.NewDBError(err)
	}

	err = client.ProjectTaskSection.DeleteOneID(input.ID).Exec(ctx)
	if err != nil {
		return nil, model.NewDBError(err)
	}

	return deleted, nil
}
