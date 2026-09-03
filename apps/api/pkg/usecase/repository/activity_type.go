package repository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

// ActivityType is interface of repository
type ActivityType interface {
	Get(ctx context.Context, where *model.ActivityTypeWhereInput) (*model.ActivityType, error)
	List(ctx context.Context) ([]*model.ActivityType, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ActivityTypeWhereInput) (*model.ActivityTypeConnection, error)
	Create(ctx context.Context, input model.CreateActivityTypeInput) (*model.ActivityType, error)
	Update(ctx context.Context, input model.UpdateActivityTypeInput) (*model.ActivityType, error)
}
