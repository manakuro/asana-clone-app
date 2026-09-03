package projecttasksectionrepository

import (
	"asana-clone-app/ent"
	"asana-clone-app/ent/projecttask"
	"asana-clone-app/pkg/adapter/repository/repositoryutil"
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *projectTaskSectionRepository) UndeleteAndKeepTasks(ctx context.Context, input model.UndeleteProjectTaskSectionAndKeepTasksInput) (*model.UndeleteProjectTaskSectionAndKeepTasksPayload, error) {
	client := repositoryutil.WithTransactionalMutation(ctx)

	createdProjectTaskSection, err := client.ProjectTaskSection.
		Create().
		SetProjectID(input.ProjectID).
		SetName(input.Name).
		SetCreatedAt(*input.CreatedAt).
		SetUpdatedAt(*input.UpdatedAt).
		Save(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	projectTasks, err := client.ProjectTask.
		Query().
		Where(projecttask.IDIn(input.KeptProjectTaskIDs...)).
		All(ctx)
	if err != nil {
		if ent.IsNotFound(err) {
			return nil, model.NewNotFoundError(err, input.KeptProjectTaskIDs)
		}
		return nil, model.NewDBError(err)
	}
	bulk := make([]*ent.ProjectTaskCreate, len(projectTasks))
	for i, t := range projectTasks {
		bulk[i] = client.ProjectTask.Create().
			SetID(t.ID).
			SetTaskID(t.TaskID).
			SetProjectID(t.ProjectID).
			SetProjectTaskSectionID(createdProjectTaskSection.ID).
			SetCreatedAt(t.CreatedAt)
	}
	err = client.ProjectTask.CreateBulk(bulk...).OnConflict().UpdateNewValues().Exec(ctx)
	if err != nil {
		return nil, model.NewDBError(err)
	}

	projectTaskIDs := make([]model.ID, len(projectTasks))
	for i, t := range projectTasks {
		projectTaskIDs[i] = t.ID
	}

	return &model.UndeleteProjectTaskSectionAndKeepTasksPayload{
		ProjectTaskSection: createdProjectTaskSection,
		ProjectTaskIDs:     projectTaskIDs,
	}, nil
}
