package repository

import (
	"asana-clone-app/pkg/entity/model"
	"context"
)

// Me is interface of repository
type Me interface {
	Get(ctx context.Context, id model.ID) (*model.Me, error)
	Update(ctx context.Context, input model.UpdateMeInput) (*model.Me, error)
}
