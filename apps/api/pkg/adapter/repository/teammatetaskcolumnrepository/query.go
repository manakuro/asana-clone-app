package teammatetaskcolumnrepository

import (
	"context"
	"fmt"
	"project-management-demo-backend/ent"
	"project-management-demo-backend/ent/teammatetaskcolumn"
	"project-management-demo-backend/pkg/entity/model"
	"time"
)

func (r *teammateTaskColumnRepository) Get(ctx context.Context, where *model.TeammateTaskColumnWhereInput) (*model.TeammateTaskColumn, error) {
	q := r.client.TeammateTaskColumn.Query()

	q, err := where.Filter(q)
	if err != nil {
		return nil, model.NewInvalidParamError(nil)
	}

	res, err := q.Only(ctx)

	if err != nil {
		if ent.IsNotSingular(err) {
			return nil, model.NewNotFoundError(err, nil)
		}
		if ent.IsNotFound(err) {
			return nil, nil
		}
		return nil, model.NewDBError(err)
	}

	return res, nil
}

func (r *teammateTaskColumnRepository) List(ctx context.Context) ([]*model.TeammateTaskColumn, error) {
	res, err := r.client.TeammateTaskColumn.Query().All(ctx)
	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}

func (r *teammateTaskColumnRepository) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TeammateTaskColumnWhereInput) (*model.TeammateTaskColumnConnection, error) {
	start := time.Now()
	q := r.client.TeammateTaskColumn.Query().Order(ent.Asc(teammatetaskcolumn.FieldOrder))

	res, err := q.Paginate(ctx, after, first, before, last, ent.WithTeammateTaskColumnFilter(where.Filter))
	if err != nil {
		return nil, model.NewDBError(err)
	}

	fmt.Println("\n\n========================================================================")
	fmt.Println("【teammateTaskColumn - ListWithPagination】duration: ", time.Since(start).String())
	fmt.Print("========================================================================\n\n")

	return res, nil
}
