package registry

import (
	"asana-clone-app/pkg/adapter/controller"
	"asana-clone-app/pkg/adapter/repository/mentionrepository"
	"asana-clone-app/pkg/usecase/usecase"
)

func (r *registry) NewMentionController() controller.Mention {
	repo := mentionrepository.New(r.client)
	u := usecase.NewMentionUsecase(repo)

	return controller.NewMentionController(u)
}
