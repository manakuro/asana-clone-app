package usecase

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/repository"
	"context"
)

type activityTypeUsecase struct {
	activityTypeRepository repository.ActivityType
}

// ActivityType is an interface of test user
type ActivityType interface {
	Get(ctx context.Context, where *model.ActivityTypeWhereInput) (*model.ActivityType, error)
	List(ctx context.Context) ([]*model.ActivityType, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ActivityTypeWhereInput) (*model.ActivityTypeConnection, error)
	Create(ctx context.Context, input model.CreateActivityTypeInput) (*model.ActivityType, error)
	Update(ctx context.Context, input model.UpdateActivityTypeInput) (*model.ActivityType, error)
}

// NewActivityTypeUsecase generates test user repository
func NewActivityTypeUsecase(r repository.ActivityType) ActivityType {
	return &activityTypeUsecase{activityTypeRepository: r}
}

func (u *activityTypeUsecase) Get(ctx context.Context, where *model.ActivityTypeWhereInput) (*model.ActivityType, error) {
	return u.activityTypeRepository.Get(ctx, where)
}

func (u *activityTypeUsecase) List(ctx context.Context) ([]*model.ActivityType, error) {
	return u.activityTypeRepository.List(ctx)
}

func (u *activityTypeUsecase) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ActivityTypeWhereInput) (*model.ActivityTypeConnection, error) {
	return u.activityTypeRepository.ListWithPagination(ctx, after, first, before, last, where)
}

func (u *activityTypeUsecase) Create(ctx context.Context, input model.CreateActivityTypeInput) (*model.ActivityType, error) {
	return u.activityTypeRepository.Create(ctx, input)
}

func (u *activityTypeUsecase) Update(ctx context.Context, input model.UpdateActivityTypeInput) (*model.ActivityType, error) {
	return u.activityTypeRepository.Update(ctx, input)
}
