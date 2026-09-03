package repository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

// Activity is interface of repository
type Activity interface {
	List(ctx context.Context, where model.ActivityWhereInput) ([]*model.Activity, error)
}
