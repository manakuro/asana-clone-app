package repository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

// Task is interface of repository
type Task interface {
	Get(ctx context.Context, where *model.TaskWhereInput) (*model.Task, error)
	List(ctx context.Context) ([]*model.Task, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskWhereInput) (*model.TaskConnection, error)
	Create(ctx context.Context, input model.CreateTaskInput) (*model.Task, error)
	Update(ctx context.Context, input model.UpdateTaskInput) (*model.Task, error)
	Delete(ctx context.Context, input model.DeleteTaskInput) (*model.DeleteTaskPayload, error)
	DeleteAll(ctx context.Context, input model.DeleteAllTaskInput) (*model.DeleteAllTaskPayload, error)
	Undelete(ctx context.Context, input model.UndeleteTaskInput) (*model.UndeleteTaskPayload, error)
	UndeleteAll(ctx context.Context, input model.UndeleteAllTaskInput) (*model.UndeleteAllTaskPayload, error)
	Assign(ctx context.Context, input model.AssignTaskInput) (*model.AssignTaskPayload, error)
	Unassign(ctx context.Context, input model.UnassignTaskInput) (*model.UnassignTaskPayload, error)
}
