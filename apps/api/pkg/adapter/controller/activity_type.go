package controller

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/usecase"
	"context"
)

// ActivityType is an interface of controller.
type ActivityType interface {
	Get(ctx context.Context, where *model.ActivityTypeWhereInput) (*model.ActivityType, error)
	List(ctx context.Context) ([]*model.ActivityType, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ActivityTypeWhereInput) (*model.ActivityTypeConnection, error)
	Create(ctx context.Context, input model.CreateActivityTypeInput) (*model.ActivityType, error)
	Update(ctx context.Context, input model.UpdateActivityTypeInput) (*model.ActivityType, error)
}

type activityTypeController struct {
	activityTypeUsecase usecase.ActivityType
}

// NewActivityTypeController generates activityType controller.
func NewActivityTypeController(pt usecase.ActivityType) ActivityType {
	return &activityTypeController{
		activityTypeUsecase: pt,
	}
}

func (c *activityTypeController) Get(ctx context.Context, where *model.ActivityTypeWhereInput) (*model.ActivityType, error) {
	return c.activityTypeUsecase.Get(ctx, where)
}

func (c *activityTypeController) List(ctx context.Context) ([]*model.ActivityType, error) {
	return c.activityTypeUsecase.List(ctx)
}

func (c *activityTypeController) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ActivityTypeWhereInput) (*model.ActivityTypeConnection, error) {
	return c.activityTypeUsecase.ListWithPagination(ctx, after, first, before, last, where)
}

func (c *activityTypeController) Create(ctx context.Context, input model.CreateActivityTypeInput) (*model.ActivityType, error) {
	return c.activityTypeUsecase.Create(ctx, input)
}

func (c *activityTypeController) Update(ctx context.Context, input model.UpdateActivityTypeInput) (*model.ActivityType, error) {
	return c.activityTypeUsecase.Update(ctx, input)
}
