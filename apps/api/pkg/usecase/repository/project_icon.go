package repository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

// ProjectIcon is interface of repository
type ProjectIcon interface {
	Get(ctx context.Context, where *model.ProjectIconWhereInput) (*model.ProjectIcon, error)
	List(ctx context.Context) ([]*model.ProjectIcon, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ProjectIconWhereInput) (*model.ProjectIconConnection, error)
	Create(ctx context.Context, input model.CreateProjectIconInput) (*model.ProjectIcon, error)
	Update(ctx context.Context, input model.UpdateProjectIconInput) (*model.ProjectIcon, error)
}
