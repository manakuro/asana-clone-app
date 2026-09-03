package usecase

import (
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/pkg/usecase/repository"
	"context"
)

type mentionUsecase struct {
	mentionRepository repository.Mention
}

// Mention is an interface of test user
type Mention interface {
	List(ctx context.Context, where model.MentionWhereInput) ([]*model.Mention, error)
}

// NewMentionUsecase generates test user repository
func NewMentionUsecase(r repository.Mention) Mention {
	return &mentionUsecase{mentionRepository: r}
}

func (u *mentionUsecase) List(ctx context.Context, where model.MentionWhereInput) ([]*model.Mention, error) {
	return u.mentionRepository.List(ctx, where)
}
