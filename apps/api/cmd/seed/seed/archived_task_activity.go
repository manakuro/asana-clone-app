package seed

import (
	"asana-clone-app/cmd/seed/seedutil"
	"asana-clone-app/ent"
	"context"
	"log"
)

var archivedTaskActivitySeed = make([]*ent.ArchivedTaskActivity, 1)

// ArchivedTaskActivity generates task activity data.
func ArchivedTaskActivity(ctx context.Context, client *ent.Client) {
	_, err := client.ArchivedTaskActivity.Delete().Exec(ctx)
	if err != nil {
		log.Fatalf("ArchivedTaskActivity failed to delete data: %v", err)
	}
	activityTypeID := seedutil.GetActivityType(ctx, client, "Task").ID
	teammateID := seedutil.GetTeammateByEmail(ctx, client, teammateSeed.manato.Email).ID
	workspaceID := seedutil.GetWorkspace(ctx, client).ID

	inputs := []ent.CreateArchivedTaskActivityInput{
		{
			TeammateID:     teammateID,
			ActivityTypeID: activityTypeID,
			WorkspaceID:    workspaceID,
		},
	}
	bulk := make([]*ent.ArchivedTaskActivityCreate, len(inputs))
	for i, t := range inputs {
		bulk[i] = client.ArchivedTaskActivity.Create().SetInput(t)
	}
	if _, err = client.ArchivedTaskActivity.CreateBulk(bulk...).Save(ctx); err != nil {
		log.Fatalf("ArchivedTaskActivity failed to seed data: %v", err)
	}

	res, err := client.ArchivedTaskActivity.Query().All(ctx)
	if err != nil {
		log.Fatalf("ArchivedTaskActivity failed to seed data: %v", err)
	}

	for i, r := range res {
		archivedTaskActivitySeed[i] = r
	}
}
