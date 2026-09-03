package seed

import (
	"asana-clone-app/cmd/seed/seedutil"
	"asana-clone-app/ent"
	"context"
	"log"
)

// TaskFeedLike generates task seed like data.
func TaskFeedLike(ctx context.Context, client *ent.Client) {
	_, err := client.TaskFeedLike.Delete().Exec(ctx)
	if err != nil {
		log.Fatalf("TaskFeedLike failed to delete data: %v", err)
	}
	manatoID := seedutil.GetTeammateByEmail(ctx, client, teammateSeed.manato.Email).ID
	danID := seedutil.GetTeammateByEmail(ctx, client, teammateSeed.dan.Email).ID
	kentID := seedutil.GetTeammateByEmail(ctx, client, teammateSeed.kent.Email).ID

	task1ID := seedutil.GetTaskByName(ctx, client, taskAssignedFeed.task1.Name).ID
	taskFeeds := seedutil.GetTaskFeeds(ctx, client, task1ID)

	inputs := []ent.CreateTaskFeedLikeInput{
		{
			TeammateID: manatoID,
			TaskID:     task1ID,
			TaskFeedID: taskFeeds[0].ID,
		},
		{
			TeammateID: danID,
			TaskID:     task1ID,
			TaskFeedID: taskFeeds[0].ID,
		},
		{
			TeammateID: kentID,
			TaskID:     task1ID,
			TaskFeedID: taskFeeds[0].ID,
		},
	}
	bulk := make([]*ent.TaskFeedLikeCreate, len(inputs))
	for i, t := range inputs {
		bulk[i] = client.TaskFeedLike.Create().SetInput(t)
	}
	if _, err = client.TaskFeedLike.CreateBulk(bulk...).Save(ctx); err != nil {
		log.Fatalf("TaskFeedLike failed to seed data: %v", err)
	}
}
