package usecase

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/repository"
	"context"
)

type testTodoUsecase struct {
	testTodoRepository repository.TestTodo
}

// TestTodo is an interface of test user
type TestTodo interface {
	Get(ctx context.Context, where *model.TestTodoWhereInput) (*model.TestTodo, error)
	List(ctx context.Context) ([]*model.TestTodo, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TestTodoWhereInput) (*model.TestTodoConnection, error)
	Create(ctx context.Context, input model.CreateTestTodoInput) (*model.TestTodo, error)
	Update(ctx context.Context, input model.UpdateTestTodoInput) (*model.TestTodo, error)
}

// NewTestTodoUsecase generates test user repository
func NewTestTodoUsecase(r repository.TestTodo) TestTodo {
	return &testTodoUsecase{testTodoRepository: r}
}

func (u *testTodoUsecase) Get(ctx context.Context, where *model.TestTodoWhereInput) (*model.TestTodo, error) {
	return u.testTodoRepository.Get(ctx, where)
}

func (u *testTodoUsecase) List(ctx context.Context) ([]*model.TestTodo, error) {
	return u.testTodoRepository.List(ctx)
}

func (u *testTodoUsecase) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TestTodoWhereInput) (*model.TestTodoConnection, error) {
	return u.testTodoRepository.ListWithPagination(ctx, after, first, before, last, where)
}

func (u *testTodoUsecase) Create(ctx context.Context, input model.CreateTestTodoInput) (*model.TestTodo, error) {
	return u.testTodoRepository.Create(ctx, input)
}

func (u *testTodoUsecase) Update(ctx context.Context, input model.UpdateTestTodoInput) (*model.TestTodo, error) {
	return u.testTodoRepository.Update(ctx, input)
}
