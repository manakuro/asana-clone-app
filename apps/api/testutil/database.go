package testutil

import (
	"asana-clone-app/ent"
	"asana-clone-app/ent/enttest"
	"asana-clone-app/pkg/infrastructure/datastore"
	"context"
	"testing"

	"entgo.io/ent/dialect"
)

// NewDBClient loads database for test.
func NewDBClient(t *testing.T) *ent.Client {
	d := datastore.New()
	return enttest.Open(t, dialect.MySQL, d)
}

// DropAll drops all data from database.
func DropAll(t *testing.T, client *ent.Client) {
	t.Log("drop data from database")
	DropTestUser(t, client)
	DropTestTodo(t, client)
}

// DropTestUser drops data from test_users.
func DropTestUser(t *testing.T, client *ent.Client) {
	ctx := context.Background()
	_, err := client.TestUser.Delete().Exec(ctx)

	if err != nil {
		t.Error(err)
		t.FailNow()
	}
}

// DropTestTodo drops data from test_todos.
func DropTestTodo(t *testing.T, client *ent.Client) {
	ctx := context.Background()
	_, err := client.TestTodo.Delete().Exec(ctx)

	if err != nil {
		t.Error(err)
		t.FailNow()
	}
}
