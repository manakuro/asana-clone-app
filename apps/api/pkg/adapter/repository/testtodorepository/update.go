package testtodorepository

import (
	"asana-clone-app/ent"
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *testTodoRepository) Update(ctx context.Context, input model.UpdateTestTodoInput) (*model.TestTodo, error) {
	res, err := r.client.
		TestTodo.UpdateOneID(input.ID).
		SetInput(input).
		Save(ctx)

	if err != nil {
		if ent.IsNotFound(err) {
			return nil, model.NewNotFoundError(err, input.ID)
		}

		return nil, model.NewDBError(err)
	}

	return res, nil
}
