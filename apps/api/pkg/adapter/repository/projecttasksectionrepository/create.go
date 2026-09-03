package projecttasksectionrepository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *projectTaskSectionRepository) Create(ctx context.Context, input model.CreateProjectTaskSectionInput) (*model.ProjectTaskSection, error) {
	res, err := r.client.
		ProjectTaskSection.
		Create().
		SetInput(input).
		SetName("").
		Save(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}
