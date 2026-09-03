package seed

import (
	"asana-clone-app/cmd/seed/seedutil"
	"asana-clone-app/ent"
	"context"
	"log"
)

// ArchivedTaskActivityTask generates tasks data.
func ArchivedTaskActivityTask(ctx context.Context, client *ent.Client) {
	_, err := client.ArchivedTaskActivityTask.Delete().Exec(ctx)
	if err != nil {
		log.Fatalf("ArchivedTaskActivityTask failed to delete data: %v", err)
	}

	archivedTaskActivity1ID := seedutil.GetArchivedTaskActivity(ctx, client, archivedTaskActivitySeed[0].ID).ID
	task10ID := seedutil.GetTaskByName(ctx, client, taskAssignedFeed.task10.Name).ID

	inputs := []ent.CreateArchivedTaskActivityTaskInput{
		// archivedTaskActivity 1
		{
			ArchivedTaskActivityID: archivedTaskActivity1ID,
			TaskID:                 task10ID,
		},
	}
	bulk := make([]*ent.ArchivedTaskActivityTaskCreate, len(inputs))
	for i, t := range inputs {
		bulk[i] = client.ArchivedTaskActivityTask.Create().SetInput(t)
	}
	if _, err = client.ArchivedTaskActivityTask.CreateBulk(bulk...).Save(ctx); err != nil {
		log.Fatalf("ArchivedTaskActivityTask failed to seed data: %v", err)
	}
}
