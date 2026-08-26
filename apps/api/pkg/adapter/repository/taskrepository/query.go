package taskrepository

import (
	"context"
	"fmt"
	"project-management-demo-backend/ent"
	"project-management-demo-backend/pkg/adapter/repository/repositoryutil"
	"project-management-demo-backend/pkg/entity/model"
	"time"
)

func (r *taskRepository) Get(ctx context.Context, where *model.TaskWhereInput) (*model.Task, error) {
	start := time.Now()
	q := r.client.Task.Query()

	repositoryutil.WithTask(q)

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
	fmt.Println("【task - Get】duration: ", time.Since(start).String())
	fmt.Print("========================================================================\n\n")

	return res, nil
}

func (r *taskRepository) List(ctx context.Context) ([]*model.Task, error) {
	start := time.Now()
	res, err := r.client.Task.Query().All(ctx)
	if err != nil {
		return nil, model.NewDBError(err)
	}

	fmt.Println("\n\n========================================================================")
	fmt.Println("【task - List】duration: ", time.Since(start).String())
	fmt.Print("========================================================================\n\n")

	return res, nil
}

func (r *taskRepository) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskWhereInput) (*model.TaskConnection, error) {
	start := time.Now()
	q := r.client.Task.Query()

	res, err := q.Paginate(ctx, after, first, before, last, ent.WithTaskFilter(where.Filter))
	if err != nil {
		return nil, model.NewDBError(err)
	}

	fmt.Println("\n\n========================================================================")
	fmt.Println("【task - ListWithPagination】duration: ", time.Since(start).String())
	fmt.Print("========================================================================\n\n")

	return res, nil
}
