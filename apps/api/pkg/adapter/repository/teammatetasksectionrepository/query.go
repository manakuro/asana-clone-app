package teammatetasksectionrepository

import (
	"context"
	"fmt"
	"project-management-demo-backend/ent"
	"project-management-demo-backend/pkg/entity/model"
	"time"
)

func (r *teammateTaskSectionRepository) Get(ctx context.Context, where *model.TeammateTaskSectionWhereInput) (*model.TeammateTaskSection, error) {
	start := time.Now()
	q := r.client.TeammateTaskSection.Query()

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

	fmt.Println("\n\n========================================================================")
	fmt.Println("【teammateTaskSection - Get】duration: ", time.Since(start).String())
	fmt.Print("========================================================================\n\n")

	return res, nil
}

func (r *teammateTaskSectionRepository) List(ctx context.Context) ([]*model.TeammateTaskSection, error) {
	res, err := r.client.TeammateTaskSection.Query().All(ctx)
	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}

func (r *teammateTaskSectionRepository) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TeammateTaskSectionWhereInput) (*model.TeammateTaskSectionConnection, error) {
	start := time.Now()
	q := r.client.TeammateTaskSection.Query()

	res, err := q.Paginate(ctx, after, first, before, last, ent.WithTeammateTaskSectionFilter(where.Filter))
	if err != nil {
		return nil, model.NewDBError(err)
	}

	fmt.Println("\n\n========================================================================")
	fmt.Println("【teammateTaskSection - ListWithPagination】duration: ", time.Since(start).String())
	fmt.Print("========================================================================\n\n")

	return res, nil
}
