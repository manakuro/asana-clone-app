package repository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

// TeammateTaskTabStatus is interface of repository
type TeammateTaskTabStatus interface {
	Get(ctx context.Context, where *model.TeammateTaskTabStatusWhereInput) (*model.TeammateTaskTabStatus, error)
	List(ctx context.Context) ([]*model.TeammateTaskTabStatus, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TeammateTaskTabStatusWhereInput) (*model.TeammateTaskTabStatusConnection, error)
	Create(ctx context.Context, input model.CreateTeammateTaskTabStatusInput) (*model.TeammateTaskTabStatus, error)
	Update(ctx context.Context, input model.UpdateTeammateTaskTabStatusInput) (*model.TeammateTaskTabStatus, error)
}
