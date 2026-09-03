package usecase

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/repository"
	"context"
)

type testUserUsecase struct {
	testUserRepository repository.TestUser
}

// TestUser is an interface of test user
type TestUser interface {
	Get(ctx context.Context, id model.ID, age *int) (*model.TestUser, error)
	List(ctx context.Context) ([]*model.TestUser, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TestUserWhereInput) (*model.TestUserConnection, error)
	Create(ctx context.Context, input model.CreateTestUserInput) (*model.TestUser, error)
	CreateWithTodo(ctx context.Context, input model.CreateTestUserInput) (*model.TestUser, error)
	Update(ctx context.Context, input model.UpdateTestUserInput) (*model.TestUser, error)
}

// NewTestUserUsecase generates test user repository
func NewTestUserUsecase(r repository.TestUser) TestUser {
	return &testUserUsecase{testUserRepository: r}
}

func (u *testUserUsecase) Get(ctx context.Context, id model.ID, age *int) (*model.TestUser, error) {
	return u.testUserRepository.Get(ctx, id, age)
}

func (u *testUserUsecase) List(ctx context.Context) ([]*model.TestUser, error) {
	return u.testUserRepository.List(ctx)
}

func (u *testUserUsecase) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TestUserWhereInput) (*model.TestUserConnection, error) {
	return u.testUserRepository.ListWithPagination(ctx, after, first, before, last, where)
}

func (u *testUserUsecase) Create(ctx context.Context, input model.CreateTestUserInput) (*model.TestUser, error) {
	return u.testUserRepository.Create(ctx, input)
}

func (u *testUserUsecase) CreateWithTodo(ctx context.Context, input model.CreateTestUserInput) (*model.TestUser, error) {
	return u.testUserRepository.CreateWithTodo(ctx, input)
}

func (u *testUserUsecase) Update(ctx context.Context, input model.UpdateTestUserInput) (*model.TestUser, error) {
	return u.testUserRepository.Update(ctx, input)
}
