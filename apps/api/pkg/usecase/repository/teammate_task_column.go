package repository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

// TeammateTaskColumn is interface of repository
type TeammateTaskColumn interface {
	Get(ctx context.Context, where *model.TeammateTaskColumnWhereInput) (*model.TeammateTaskColumn, error)
	List(ctx context.Context) ([]*model.TeammateTaskColumn, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TeammateTaskColumnWhereInput) (*model.TeammateTaskColumnConnection, error)
	Create(ctx context.Context, input model.CreateTeammateTaskColumnInput) (*model.TeammateTaskColumn, error)
	Update(ctx context.Context, input model.UpdateTeammateTaskColumnInput) (*model.TeammateTaskColumn, error)
	UpdateOrder(ctx context.Context, input model.UpdateTeammateTaskColumnOrderInput) ([]*model.TeammateTaskColumn, error)
}
