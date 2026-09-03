package repository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

// ProjectLightColor is interface of repository
type ProjectLightColor interface {
	Get(ctx context.Context, where *model.ProjectLightColorWhereInput) (*model.ProjectLightColor, error)
	List(ctx context.Context) ([]*model.ProjectLightColor, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ProjectLightColorWhereInput) (*model.ProjectLightColorConnection, error)
	Create(ctx context.Context, input model.CreateProjectLightColorInput) (*model.ProjectLightColor, error)
	Update(ctx context.Context, input model.UpdateProjectLightColorInput) (*model.ProjectLightColor, error)
}
