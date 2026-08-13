package projecttaskrepository

import (
	"context"
	"fmt"
	"project-management-demo-backend/ent"
	"project-management-demo-backend/pkg/adapter/repository/repositoryutil"
	"project-management-demo-backend/pkg/entity/model"
	"time"
)

func (r *projectTaskRepository) Get(ctx context.Context, where *model.ProjectTaskWhereInput) (*model.ProjectTask, error) {
	start := time.Now()
	q := r.client.ProjectTask.Query()

	// Eager-loading with task explicitly.
	repositoryutil.WithProjectTask(q)

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
	fmt.Println("【projectTask - Get】duration: ", time.Since(start).String())
	fmt.Print("========================================================================\n\n")

	return res, nil
}

func (r *projectTaskRepository) List(ctx context.Context) ([]*model.ProjectTask, error) {
	res, err := r.client.ProjectTask.Query().All(ctx)
	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}

func (r *projectTaskRepository) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ProjectTaskWhereInput) (*model.ProjectTaskConnection, error) {
	q := r.client.ProjectTask.Query()

	res, err := q.Paginate(ctx, after, first, before, last, ent.WithProjectTaskFilter(where.Filter))
	if err != nil {
		return nil, model.NewDBError(err)
	}
	return res, nil
}
