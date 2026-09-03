package repository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

// Mention is interface of repository
type Mention interface {
	List(ctx context.Context, where model.MentionWhereInput) ([]*model.Mention, error)
}
