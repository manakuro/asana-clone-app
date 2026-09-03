package controller

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/usecase"
	"context"
)

// TestUser is an interface of controller.
type TestUser interface {
	Get(ctx context.Context, id model.ID, age *int) (*model.TestUser, error)
	List(ctx context.Context) ([]*model.TestUser, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TestUserWhereInput) (*model.TestUserConnection, error)
	Create(ctx context.Context, input model.CreateTestUserInput) (*model.TestUser, error)
	CreateWithTodo(ctx context.Context, input model.CreateTestUserInput) (*model.TestUser, error)
	Update(ctx context.Context, input model.UpdateTestUserInput) (*model.TestUser, error)
}

type testUserController struct {
	testUserUsecase usecase.TestUser
}

// NewTestUserController generates test user controller.
func NewTestUserController(tu usecase.TestUser) TestUser {
	return &testUserController{
		testUserUsecase: tu,
	}
}

func (c *testUserController) Get(ctx context.Context, id model.ID, age *int) (*model.TestUser, error) {
	return c.testUserUsecase.Get(ctx, id, age)
}

func (c *testUserController) List(ctx context.Context) ([]*model.TestUser, error) {
	return c.testUserUsecase.List(ctx)
}

func (c *testUserController) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TestUserWhereInput) (*model.TestUserConnection, error) {
	return c.testUserUsecase.ListWithPagination(ctx, after, first, before, last, where)
}

func (c *testUserController) Create(ctx context.Context, input model.CreateTestUserInput) (*model.TestUser, error) {
	return c.testUserUsecase.Create(ctx, input)
}

func (c *testUserController) CreateWithTodo(ctx context.Context, input model.CreateTestUserInput) (*model.TestUser, error) {
	return c.testUserUsecase.CreateWithTodo(ctx, input)
}

func (c *testUserController) Update(ctx context.Context, input model.UpdateTestUserInput) (*model.TestUser, error) {
	return c.testUserUsecase.Update(ctx, input)
}
