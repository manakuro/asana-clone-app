package repository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

// ProjectBaseColor is interface of repository
type ProjectBaseColor interface {
	Get(ctx context.Context, where *model.ProjectBaseColorWhereInput) (*model.ProjectBaseColor, error)
	List(ctx context.Context) ([]*model.ProjectBaseColor, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ProjectBaseColorWhereInput) (*model.ProjectBaseColorConnection, error)
	Create(ctx context.Context, input model.CreateProjectBaseColorInput) (*model.ProjectBaseColor, error)
	Update(ctx context.Context, input model.UpdateProjectBaseColorInput) (*model.ProjectBaseColor, error)
}
