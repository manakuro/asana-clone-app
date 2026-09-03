package seed

import (
	"asana-clone-app/cmd/seed/seedutil"
	"asana-clone-app/ent"
	"context"
	"log"
)

// TaskTag generates tasks tag data.
func TaskTag(ctx context.Context, client *ent.Client) {
	_, err := client.TaskTag.Delete().Exec(ctx)
	if err != nil {
		log.Fatalf("TaskTag failed to delete data: %v", err)
	}
	designTag := seedutil.GetTagByName(ctx, client, tagSeed.design.Name)
	bugTag := seedutil.GetTagByName(ctx, client, tagSeed.bug.Name)
	developmentTag := seedutil.GetTagByName(ctx, client, tagSeed.development.Name)

	inputs := []ent.CreateTaskTagInput{
		{
			TaskID: seedutil.GetTaskByName(ctx, client, taskAssignedFeed.task1.Name).ID,
			TagID:  developmentTag.ID,
		},
		{
			TaskID: seedutil.GetTaskByName(ctx, client, taskAssignedFeed.task2.Name).ID,
			TagID:  bugTag.ID,
		},
		{
			TaskID: seedutil.GetTaskByName(ctx, client, taskAssignedFeed.task3.Name).ID,
			TagID:  designTag.ID,
		},
		{
			TaskID: seedutil.GetTaskByName(ctx, client, taskAssignedFeed.task4.Name).ID,
			TagID:  developmentTag.ID,
		},
		{
			TaskID: seedutil.GetTaskByName(ctx, client, taskAssignedFeed.task5.Name).ID,
			TagID:  developmentTag.ID,
		},
	}
	bulk := make([]*ent.TaskTagCreate, len(inputs))
	for i, t := range inputs {
		bulk[i] = client.TaskTag.Create().SetInput(t)
	}
	if _, err = client.TaskTag.CreateBulk(bulk...).Save(ctx); err != nil {
		log.Fatalf("TaskTag failed to seed data: %v", err)
	}
}
