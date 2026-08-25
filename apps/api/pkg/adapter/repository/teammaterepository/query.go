package teammaterepository

import (
	"context"
	"fmt"
	"project-management-demo-backend/ent"
	"project-management-demo-backend/ent/teammate"
	"project-management-demo-backend/pkg/entity/model"
	"time"
)

func (r *teammateRepository) Get(ctx context.Context, id model.ID) (*model.Teammate, error) {
	start := time.Now()
	q := r.client.Teammate.Query()

	if id == "" {
		return nil, model.NewInvalidParamError(map[string]interface{}{
			"id": id,
		})
	}
	q.Where(teammate.IDEQ(id))

	res, err := q.Only(ctx)

	if err != nil {
		if ent.IsNotSingular(err) {
			return nil, model.NewNotFoundError(err, map[string]interface{}{
				"id": id,
			})
		}
		if ent.IsNotFound(err) {
			return nil, nil
		}
		return nil, model.NewDBError(err)
	}

	fmt.Println("\n\n========================================================================")
	fmt.Println("【teammate - Get】duration: ", time.Since(start).String())
	fmt.Print("========================================================================\n\n")

	return res, nil
}

func (r *teammateRepository) List(ctx context.Context) ([]*model.Teammate, error) {
	start := time.Now()
	res, err := r.client.
		Teammate.Query().All(ctx)
	if err != nil {
		return nil, model.NewDBError(err)
	}

	fmt.Println("\n\n========================================================================")
	fmt.Println("【teammate - List】duration: ", time.Since(start).String())
	fmt.Print("========================================================================\n\n")

	return res, nil
}

func (r *teammateRepository) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TeammateWhereInput) (*model.TeammateConnection, error) {
	start := time.Now()
	res, err := r.client.
		Teammate.
		Query().
		Paginate(ctx, after, first, before, last, ent.WithTeammateFilter(where.Filter))
	if err != nil {
		return nil, model.NewDBError(err)
	}

	fmt.Println("\n\n========================================================================")
	fmt.Println("【teammate - ListWithPagination】duration: ", time.Since(start).String())
	fmt.Print("========================================================================\n\n")

	return res, nil
}
