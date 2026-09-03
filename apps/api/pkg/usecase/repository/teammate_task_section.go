package repository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

// TeammateTaskSection is interface of repository
type TeammateTaskSection interface {
	Get(ctx context.Context, where *model.TeammateTaskSectionWhereInput) (*model.TeammateTaskSection, error)
	List(ctx context.Context) ([]*model.TeammateTaskSection, error)
	ListWithPagination(ctx context.Context, after *model.Cursor, first *int, before *model.Cursor, last *int, where *model.TeammateTaskSectionWhereInput) (*model.TeammateTaskSectionConnection, error)
	Create(ctx context.Context, input model.CreateTeammateTaskSectionInput) (*model.TeammateTaskSection, error)
	Update(ctx context.Context, input model.UpdateTeammateTaskSectionInput) (*model.TeammateTaskSection, error)
	Delete(ctx context.Context, input model.DeleteTeammateTaskSectionInput) (*model.TeammateTaskSection, error)
	DeleteAndKeepTasks(ctx context.Context, input model.DeleteTeammateTaskSectionAndKeepTasksInput) (*model.DeleteTeammateTaskSectionAndKeepTasksPayload, error)
	DeleteAndDeleteTasks(ctx context.Context, input model.DeleteTeammateTaskSectionAndDeleteTasksInput) (*model.DeleteTeammateTaskSectionAndDeleteTasksPayload, error)
	UndeleteAndKeepTasks(ctx context.Context, input model.UndeleteTeammateTaskSectionAndKeepTasksInput) (*model.UndeleteTeammateTaskSectionAndKeepTasksPayload, error)
	UndeleteAndDeleteTasks(ctx context.Context, input model.UndeleteTeammateTaskSectionAndDeleteTasksInput) (*model.UndeleteTeammateTaskSectionAndDeleteTasksPayload, error)
}
