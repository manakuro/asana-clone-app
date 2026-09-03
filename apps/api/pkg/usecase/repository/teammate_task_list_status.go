package repository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

// TeammateTaskListStatus is interface of repository
type TeammateTaskListStatus interface {
	Get(ctx context.Context, where *model.TeammateTaskListStatusWhereInput) (*model.TeammateTaskListStatus, error)
	List(ctx context.Context) ([]*model.TeammateTaskListStatus, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TeammateTaskListStatusWhereInput) (*model.TeammateTaskListStatusConnection, error)
	Create(ctx context.Context, input model.CreateTeammateTaskListStatusInput) (*model.TeammateTaskListStatus, error)
	Update(ctx context.Context, input model.UpdateTeammateTaskListStatusInput) (*model.TeammateTaskListStatus, error)
}
