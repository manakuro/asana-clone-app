package repository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

// TaskCollaborator is interface of repository
type TaskCollaborator interface {
	Get(ctx context.Context, where *model.TaskCollaboratorWhereInput) (*model.TaskCollaborator, error)
	List(ctx context.Context, where *model.TaskCollaboratorWhereInput) ([]*model.TaskCollaborator, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TaskCollaboratorWhereInput) (*model.TaskCollaboratorConnection, error)
	Create(ctx context.Context, input model.CreateTaskCollaboratorInput) (*model.TaskCollaborator, error)
	Update(ctx context.Context, input model.UpdateTaskCollaboratorInput) (*model.TaskCollaborator, error)
	Delete(ctx context.Context, input model.DeleteTaskCollaboratorInput) (*model.TaskCollaborator, error)
}
