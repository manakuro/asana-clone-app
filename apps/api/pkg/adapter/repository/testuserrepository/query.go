package testuserrepository

import (
	"asana-clone-app/ent"
	"asana-clone-app/ent/testuser"
	"asana-clone-app/pkg/entity/model"
	"context"
)

func (r *testUserRepository) Get(ctx context.Context, id model.ID, age *int) (*model.TestUser, error) {
	q := r.client.TestUser.Query()

	if id == "" {
		return nil, model.NewInvalidParamError(map[string]interface{}{
			"id": id,
		})
	}
	q.Where(testuser.IDEQ(id))

	if age != nil {
		q.Where(testuser.AgeEQ(*age))
	}

	res, err := q.Only(ctx)

	if err != nil {
		if ent.IsNotSingular(err) {
			return nil, model.NewNotFoundError(err, map[string]interface{}{
				"id":  id,
				"age": age,
			})
		}
		if ent.IsNotFound(err) {
			return nil, nil
		}
		return nil, model.NewDBError(err)
	}

	return res, nil
}

func (r *testUserRepository) List(ctx context.Context) ([]*model.TestUser, error) {
	res, err := r.client.
		TestUser.Query().All(ctx)
	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}

func (r *testUserRepository) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TestUserWhereInput) (*model.TestUserConnection, error) {
	q := r.client.TestUser.Query()

	res, err := q.Paginate(ctx, after, first, before, last, ent.WithTestUserFilter(where.Filter))
	if err != nil {
		return nil, model.NewDBError(err)
	}
	return res, nil
}
