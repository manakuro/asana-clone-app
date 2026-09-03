package repository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

// ProjectTaskColumn is interface of repository
type ProjectTaskColumn interface {
	Get(ctx context.Context, where *model.ProjectTaskColumnWhereInput) (*model.ProjectTaskColumn, error)
	List(ctx context.Context) ([]*model.ProjectTaskColumn, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ProjectTaskColumnWhereInput) (*model.ProjectTaskColumnConnection, error)
	Create(ctx context.Context, input model.CreateProjectTaskColumnInput) (*model.ProjectTaskColumn, error)
	Update(ctx context.Context, input model.UpdateProjectTaskColumnInput) (*model.ProjectTaskColumn, error)
}
