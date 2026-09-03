package projecttaskrepository

import (
	"asana-clone-app/ent"
	"asana-clone-app/ent/projecttask"
	"asana-clone-app/ent/projecttasksection"
	"asana-clone-app/pkg/adapter/repository/repositoryutil"
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *projectTaskRepository) Create(ctx context.Context, input model.CreateProjectTaskInput) (*model.ProjectTask, error) {
	tc := r.client.Task.
		Create().
		SetIsNew(true).
		SetName("").
		SetCreatedBy(input.CreatedBy).
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
		SetTeammateID(input.CreatedBy).
		Save(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	res, err := r.client.
		ProjectTask.
		Create().
		SetInput(input).
		SetTask(newTask).
		Save(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}

func (r *projectTaskRepository) CreateByTaskID(ctx context.Context, input model.CreateProjectTaskByTaskIDInput) (*model.ProjectTask, error) {
	client := repositoryutil.WithTransactionalMutation(ctx)

	ps, err := client.ProjectTaskSection.
		Query().
		Where(projecttasksection.ProjectID(input.ProjectID)).
		All(ctx)
	if err != nil {
		if ent.IsNotFound(err) {
			return nil, model.NewNotFoundError(err, input)
		}
		return nil, model.NewDBError(err)
	}

	projectTaskSection := ps[0]

	p, err := client.ProjectTask.
		Create().
		SetTaskID(input.TaskID).
		SetProjectID(input.ProjectID).
		SetProjectTaskSectionID(projectTaskSection.ID).
		Save(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	pq := client.ProjectTask.
		Query().
		Where(projecttask.IDEQ(p.ID))

	repositoryutil.WithProjectTask(pq)

	projectTask, err := pq.Only(ctx)
	if err != nil {
		return nil, model.NewDBError(err)
	}

	return projectTask, nil
}
