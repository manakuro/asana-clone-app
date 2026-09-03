package testuserrepository

import (
	"asana-clone-app/ent"
	ur "asana-clone-app/pkg/usecase/repository"
)

type testUserRepository struct {
	client *ent.Client
}

// New generates test user repository.
func New(client *ent.Client) ur.TestUser {
	return &testUserRepository{client: client}
}
