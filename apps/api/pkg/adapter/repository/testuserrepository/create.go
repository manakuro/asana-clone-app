package testuserrepository

import (
	"asana-clone-app/pkg/adapter/repository/repositoryutil"
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *testUserRepository) Create(ctx context.Context, input model.CreateTestUserInput) (*model.TestUser, error) {
	res, err := r.client.
		TestUser.
		Create().
		SetInput(input).
		Save(ctx)

	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}

func (r *testUserRepository) CreateWithTodo(ctx context.Context, input model.CreateTestUserInput) (*model.TestUser, error) {
	client := repositoryutil.WithTransactionalMutation(ctx)

	todo, err := client.
		TestTodo.
		Create().
		Save(ctx)
	if err != nil {
		return nil, model.NewDBError(err)
	}

	u, err := client.TestUser.
		Create().
		SetInput(input).
		AddTestTodos(todo).
		Save(ctx)
	if err != nil {
		return nil, model.NewDBError(err)
	}

	return u, nil
}
