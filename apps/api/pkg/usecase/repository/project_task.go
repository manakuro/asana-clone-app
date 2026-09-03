package repository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

// ProjectTask is interface of repository
type ProjectTask interface {
	Get(ctx context.Context, where *model.ProjectTaskWhereInput) (*model.ProjectTask, error)
	List(ctx context.Context) ([]*model.ProjectTask, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ProjectTaskWhereInput) (*model.ProjectTaskConnection, error)
	Create(ctx context.Context, input model.CreateProjectTaskInput) (*model.ProjectTask, error)
	CreateByTaskID(ctx context.Context, input model.CreateProjectTaskByTaskIDInput) (*model.ProjectTask, error)
	Update(ctx context.Context, input model.UpdateProjectTaskInput) (*model.ProjectTask, error)
	Delete(ctx context.Context, input model.DeleteProjectTaskInput) (*model.ProjectTask, error)
}
