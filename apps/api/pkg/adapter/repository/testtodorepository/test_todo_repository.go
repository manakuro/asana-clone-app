package testtodorepository

import (
	"asana-clone-app/ent"
	ur "asana-clone-app/pkg/usecase/repository"
)

type testTodoRepository struct {
	client *ent.Client
}

// New generates testTodo repository.
func New(client *ent.Client) ur.TestTodo {
	return &testTodoRepository{client: client}
}
