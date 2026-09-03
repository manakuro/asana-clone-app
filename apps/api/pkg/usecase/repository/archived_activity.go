package repository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

// ArchivedActivity is interface of repository.
type ArchivedActivity interface {
	List(ctx context.Context, where model.ArchivedActivityWhereInput) ([]*model.ArchivedActivity, error)
}
