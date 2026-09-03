package controller

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/usecase"
	"context"
)

// ArchivedActivity is an interface of controller.
type ArchivedActivity interface {
	List(ctx context.Context, where model.ArchivedActivityWhereInput) ([]*model.ArchivedActivity, error)
}

type archivedActivityController struct {
	archivedActivityUsecase usecase.ArchivedActivity
}

// NewArchivedActivityController generates me controller.
func NewArchivedActivityController(u usecase.ArchivedActivity) ArchivedActivity {
	return &archivedActivityController{
		archivedActivityUsecase: u,
	}
}

func (c *archivedActivityController) List(ctx context.Context, where model.ArchivedActivityWhereInput) ([]*model.ArchivedActivity, error) {
	return c.archivedActivityUsecase.List(ctx, where)
}
