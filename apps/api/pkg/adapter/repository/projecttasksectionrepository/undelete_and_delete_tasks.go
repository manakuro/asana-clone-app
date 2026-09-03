package projecttasksectionrepository

import (
	"asana-clone-app/ent"
	"asana-clone-app/ent/deletedtask"
	"asana-clone-app/ent/projecttask"
	"asana-clone-app/ent/projecttasksection"
	"asana-clone-app/pkg/adapter/repository/repositoryutil"
	"asana-clone-app/pkg/adapter/repository/taskrepository"
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *projectTaskSectionRepository) UndeleteAndDeleteTasks(ctx context.Context, input model.UndeleteProjectTaskSectionAndDeleteTasksInput) (*model.UndeleteProjectTaskSectionAndDeleteTasksPayload, error) {
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

	deletedTasks, err := client.DeletedTask.
		Query().
		Where(deletedtask.TaskIDIn(input.DeletedTaskIDs...)).
		All(ctx)
	if err != nil {
		return nil, model.NewDBError(err)
	}
	if len(deletedTasks) == 0 {
		return nil, model.NewNotFoundError(err, input)
	}

	taskIDs := make([]model.ID, len(deletedTasks))
	for i, t := range deletedTasks {
		taskIDs[i] = t.TaskID
	}

	// TODO: Task repository can be called in usecase/usecase package
	taskRepo := taskrepository.New(r.client)

	p, rerr := taskRepo.UndeleteAll(ctx, model.UndeleteAllTaskInput{
		TaskIDs:              taskIDs,
		WorkspaceID:          input.WorkspaceID,
		ProjectTaskSectionID: &createdProjectTaskSection.ID,
		RequestID:            "",
	})
	if rerr != nil {
		return nil, model.NewDBError(err)
	}

	bulk := make([]*ent.ProjectTaskCreate, len(p.ProjectTasks))
	for i, t := range p.ProjectTasks {
		bulk[i] = client.ProjectTask.Create().
			SetID(t.ID).
			SetCreatedAt(t.CreatedAt).
			SetUpdatedAt(t.UpdatedAt).
			SetTaskID(t.TaskID).
			SetProjectID(t.ProjectID).
			SetProjectTaskSectionID(createdProjectTaskSection.ID)
	}
	err = client.ProjectTask.CreateBulk(bulk...).OnConflict().UpdateNewValues().Exec(ctx)
	if err != nil {
		return nil, model.NewDBError(err)
	}

	projectTaskIDs := make([]model.ID, len(p.ProjectTasks))
	for i, t := range p.TeammateTasks {
		projectTaskIDs[i] = t.ID
	}
	ts, err := client.ProjectTask.Query().Where(projecttask.IDIn(projectTaskIDs...)).All(ctx)
	if err != nil {
		if ent.IsNotFound(err) {
			return nil, model.NewNotFoundError(err, map[string]interface{}{
				"IDs": projectTaskIDs,
			})
		}
		return nil, model.NewDBError(err)
	}

	createdProjectTasks := make([]*model.ProjectTask, len(ts))
	for i, t := range ts {
		createdProjectTasks[i] = t.Unwrap()
	}

	// Eager-loads associations with task.
	projectTaskSection, err := client.ProjectTaskSection.Query().
		WithProjectTasks(func(ptq *ent.ProjectTaskQuery) {
			repositoryutil.WithProjectTask(ptq)
		}).
		Where(projecttasksection.ID(createdProjectTaskSection.ID)).
		Only(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	return &model.UndeleteProjectTaskSectionAndDeleteTasksPayload{
		ProjectTaskSection: projectTaskSection,
		ProjectTasks:       createdProjectTasks,
	}, nil
}
