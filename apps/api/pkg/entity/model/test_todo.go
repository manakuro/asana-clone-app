package model

import (
	"asana-clone-app/ent"
)

// TestTodo is the model entity for the TestTodo schema
type TestTodo = ent.TestTodo

// CreateTestTodoInput represents a mutation input for creating test users.
type CreateTestTodoInput = ent.CreateTestTodoInput

// UpdateTestTodoInput represents a mutation input for updating test users.
type UpdateTestTodoInput = ent.UpdateTestTodoInput

// TestTodoConnection is the connection containing edges to TestTodo.
type TestTodoConnection = ent.TestTodoConnection

// TestTodoWhereInput represents a where input.
type TestTodoWhereInput = ent.TestTodoWhereInput
