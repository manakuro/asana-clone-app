package repository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

// ProjectTaskListStatus is interface of repository
type ProjectTaskListStatus interface {
	Get(ctx context.Context, where *model.ProjectTaskListStatusWhereInput) (*model.ProjectTaskListStatus, error)
	List(ctx context.Context) ([]*model.ProjectTaskListStatus, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ProjectTaskListStatusWhereInput) (*model.ProjectTaskListStatusConnection, error)
	Create(ctx context.Context, input model.CreateProjectTaskListStatusInput) (*model.ProjectTaskListStatus, error)
	Update(ctx context.Context, input model.UpdateProjectTaskListStatusInput) (*model.ProjectTaskListStatus, error)
}
