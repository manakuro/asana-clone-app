package repository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

// ProjectTaskSection is interface of repository
type ProjectTaskSection interface {
	Get(ctx context.Context, where *model.ProjectTaskSectionWhereInput) (*model.ProjectTaskSection, error)
	List(ctx context.Context) ([]*model.ProjectTaskSection, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ProjectTaskSectionWhereInput) (*model.ProjectTaskSectionConnection, error)
	ListByTaskID(ctx context.Context, taskID model.ID, where *model.ProjectTaskSectionWhereInput) ([]*model.ProjectTaskSection, error)
	Create(ctx context.Context, input model.CreateProjectTaskSectionInput) (*model.ProjectTaskSection, error)
	Update(ctx context.Context, input model.UpdateProjectTaskSectionInput) (*model.ProjectTaskSection, error)
	Delete(ctx context.Context, input model.DeleteProjectTaskSectionInput) (*model.ProjectTaskSection, error)
	DeleteAndKeepTasks(ctx context.Context, input model.DeleteProjectTaskSectionAndKeepTasksInput) (*model.DeleteProjectTaskSectionAndKeepTasksPayload, error)
	DeleteAndDeleteTasks(ctx context.Context, input model.DeleteProjectTaskSectionAndDeleteTasksInput) (*model.DeleteProjectTaskSectionAndDeleteTasksPayload, error)
	UndeleteAndKeepTasks(ctx context.Context, input model.UndeleteProjectTaskSectionAndKeepTasksInput) (*model.UndeleteProjectTaskSectionAndKeepTasksPayload, error)
	UndeleteAndDeleteTasks(ctx context.Context, input model.UndeleteProjectTaskSectionAndDeleteTasksInput) (*model.UndeleteProjectTaskSectionAndDeleteTasksPayload, error)
}
