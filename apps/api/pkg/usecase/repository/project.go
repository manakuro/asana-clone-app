package repository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

// Project is interface of repository
type Project interface {
	Get(ctx context.Context, where *model.ProjectWhereInput) (*model.Project, error)
	List(ctx context.Context) ([]*model.Project, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ProjectWhereInput) (*model.ProjectConnection, error)
	Create(ctx context.Context, input model.CreateProjectInput) (*model.Project, error)
	Update(ctx context.Context, input model.UpdateProjectInput) (*model.Project, error)
}
