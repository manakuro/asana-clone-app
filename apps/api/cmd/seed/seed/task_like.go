package seed

import (
	"asana-clone-app/cmd/seed/seedutil"
	"asana-clone-app/ent"
	"context"
	"log"
)

// TaskLike generates task like data.
func TaskLike(ctx context.Context, client *ent.Client) {
	_, err := client.TaskLike.Delete().Exec(ctx)
	if err != nil {
		log.Fatalf("TaskLike failed to delete data: %v", err)
	}
	manatoID := seedutil.GetTeammateByEmail(ctx, client, teammateSeed.manato.Email).ID
	danID := seedutil.GetTeammateByEmail(ctx, client, teammateSeed.dan.Email).ID
	kentID := seedutil.GetTeammateByEmail(ctx, client, teammateSeed.kent.Email).ID
	workspace := seedutil.GetWorkspace(ctx, client)

	inputs := []ent.CreateTaskLikeInput{
		{
			TeammateID:  manatoID,
			TaskID:      seedutil.GetTaskByName(ctx, client, taskAssignedFeed.task1.Name).ID,
			WorkspaceID: workspace.ID,
		},
		{
			TeammateID:  danID,
			TaskID:      seedutil.GetTaskByName(ctx, client, taskAssignedFeed.task1.Name).ID,
			WorkspaceID: workspace.ID,
		},
		{
			TeammateID:  kentID,
			TaskID:      seedutil.GetTaskByName(ctx, client, taskAssignedFeed.task1.Name).ID,
			WorkspaceID: workspace.ID,
		},
		{
			TeammateID:  manatoID,
			TaskID:      seedutil.GetTaskByName(ctx, client, taskAssignedFeed.task2.Name).ID,
			WorkspaceID: workspace.ID,
		},
		{
			TeammateID:  danID,
			TaskID:      seedutil.GetTaskByName(ctx, client, taskAssignedFeed.task2.Name).ID,
			WorkspaceID: workspace.ID,
		},
	}
	bulk := make([]*ent.TaskLikeCreate, len(inputs))
	for i, t := range inputs {
		bulk[i] = client.TaskLike.Create().SetInput(t)
	}
	if _, err = client.TaskLike.CreateBulk(bulk...).Save(ctx); err != nil {
		log.Fatalf("TaskLike failed to seed data: %v", err)
	}
}
