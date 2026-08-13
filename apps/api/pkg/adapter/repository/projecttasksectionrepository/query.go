package projecttasksectionrepository

import (
	"context"
	"fmt"
	"project-management-demo-backend/ent"
	"project-management-demo-backend/ent/projecttask"
	"project-management-demo-backend/ent/projecttasksection"
	"project-management-demo-backend/pkg/adapter/repository/repositoryutil"
	"project-management-demo-backend/pkg/entity/model"
	"time"
)

func (r *projectTaskSectionRepository) Get(ctx context.Context, where *model.ProjectTaskSectionWhereInput) (*model.ProjectTaskSection, error) {
	start := time.Now()
	q := r.client.ProjectTaskSection.Query()

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
	fmt.Println("【projectTaskSection GET】duration: ", time.Since(start).String())
	fmt.Print("========================================================================\n\n")

	return res, nil
}

func (r *projectTaskSectionRepository) List(ctx context.Context) ([]*model.ProjectTaskSection, error) {
	res, err := r.client.ProjectTaskSection.Query().All(ctx)
	if err != nil {
		return nil, model.NewDBError(err)
	}

	return res, nil
}

func (r *projectTaskSectionRepository) ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.ProjectTaskSectionWhereInput) (*model.ProjectTaskSectionConnection, error) {
	start := time.Now()
	q := r.client.ProjectTaskSection.Query()

	res, err := q.Paginate(ctx, after, first, before, last, ent.WithProjectTaskSectionFilter(where.Filter))
	if err != nil {
		return nil, model.NewDBError(err)
	}

	fmt.Println("\n\n========================================================================")
	fmt.Println("【projectTaskSection List】duration: ", time.Since(start).String())
	fmt.Print("========================================================================\n\n")

	return res, nil
}

func (r *projectTaskSectionRepository) ListByTaskID(ctx context.Context, taskID model.ID, where *model.ProjectTaskSectionWhereInput) ([]*model.ProjectTaskSection, error) {
	start := time.Now()
	projectTask, err := r.client.ProjectTask.Query().Where(projecttask.TaskID(taskID)).Only(ctx)
	if err != nil {
		if ent.IsNotFound(err) {
			return nil, nil
		}
		return nil, model.NewDBError(err)
	}

	q := r.client.ProjectTaskSection.
		Query().Where(projecttasksection.ProjectID(projectTask.ProjectID))

	q, err = where.Filter(q)
	if err != nil {
		return nil, model.NewDBError(err)
	}

	q.WithProject(func(pq *ent.ProjectQuery) {
		repositoryutil.WithProject(pq)
	})

	projectTaskSections, err := q.All(ctx)
	if err != nil {
		return nil, model.NewDBError(err)
	}

	fmt.Println("\n\n========================================================================")
	fmt.Println("【projectTaskSection ListByTaskID】duration: ", time.Since(start).String())
	fmt.Print("========================================================================\n\n")

	return projectTaskSections, nil
}
