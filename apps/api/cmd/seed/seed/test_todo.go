package seed

import (
	"asana-clone-app/cmd/seed/seedutil"
	"asana-clone-app/ent"
	"context"
	"log"
)

// TestTodo generates test todo data.
func TestTodo(ctx context.Context, client *ent.Client) {
	_, err := client.TestTodo.Delete().Exec(ctx)
	if err != nil {
		log.Fatalf("TestTodo failed to delete data: %v", err)
	}
	id := seedutil.GetTestUserByName(ctx, client, testUserFeed.tom.Name).ID

	parentTodo, err := client.TestTodo.Create().SetInput(ent.CreateTestTodoInput{
		TestUserID: &id,
	}).Save(ctx)
	if err != nil {
		log.Fatalf("TestTodo failed to seed data: %v", err)
	}

	c1, err := client.TestTodo.
		Create().
		SetInput(ent.CreateTestTodoInput{
			TestUserID: &id,
			CreatedBy:  id,
		}).
		SetParent(parentTodo).
		Save(ctx)
	if err != nil {
		log.Fatalf("TestTodo failed to seed data: %v", err)
	}

	_, err = client.TestTodo.
		Create().
		SetTestUserID(id).
		SetParent(c1).
		SetCreatedBy(id).
		Save(ctx)
	if err != nil {
		log.Fatalf("TestTodo failed to seed data: %v", err)
	}

	inputs := []ent.CreateTestTodoInput{
		{TestUserID: &id, ParentTodoID: &parentTodo.ID, CreatedBy: id},
		{TestUserID: &id, ParentTodoID: &parentTodo.ID, CreatedBy: id},
		{TestUserID: &id, ParentTodoID: &parentTodo.ID, CreatedBy: id},
		{TestUserID: &id, ParentTodoID: &parentTodo.ID, CreatedBy: id},
		{TestUserID: &id, ParentTodoID: &parentTodo.ID, CreatedBy: id},
		{TestUserID: &id, ParentTodoID: &parentTodo.ID, CreatedBy: id},
		{TestUserID: &id, ParentTodoID: &parentTodo.ID, CreatedBy: id},
		{TestUserID: &id, ParentTodoID: &parentTodo.ID, CreatedBy: id},
		{TestUserID: &id, ParentTodoID: &parentTodo.ID, CreatedBy: id},
		{TestUserID: &id, ParentTodoID: &parentTodo.ID, CreatedBy: id},
		{TestUserID: &id, ParentTodoID: &parentTodo.ID, CreatedBy: id},
		{TestUserID: &id, ParentTodoID: &parentTodo.ID, CreatedBy: id},
	}
	bulk := make([]*ent.TestTodoCreate, len(inputs))
	for i, t := range inputs {
		bulk[i] = client.TestTodo.Create().SetInput(t)
	}
	if _, err = client.TestTodo.CreateBulk(bulk...).Save(ctx); err != nil {
		log.Fatalf("TestTodo failed to seed data: %v", err)
	}
}
