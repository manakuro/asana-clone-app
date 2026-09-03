package seed

import (
	"asana-clone-app/cmd/seed/seedutil"
	"asana-clone-app/ent"
	"context"
	"log"
)

// ArchivedWorkspaceActivityTask generates workspace activity task data.
func ArchivedWorkspaceActivityTask(ctx context.Context, client *ent.Client) {
	_, err := client.ArchivedWorkspaceActivityTask.Delete().Exec(ctx)
	if err != nil {
		log.Fatalf("ArchivedWorkspaceActivityTask failed to delete data: %v", err)
	}

	archivedWorkspaceActivity1ID := seedutil.GetArchivedWorkspaceActivity(ctx, client, archivedWorkspaceActivitySeed[0].ID).ID
	task10ID := seedutil.GetTaskByName(ctx, client, taskAssignedFeed.task10.Name).ID

	inputs := []ent.CreateArchivedWorkspaceActivityTaskInput{
		// archivedWorkspaceActivity 1
		{
			ArchivedWorkspaceActivityID: archivedWorkspaceActivity1ID,
			TaskID:                      task10ID,
		},
	}
	bulk := make([]*ent.ArchivedWorkspaceActivityTaskCreate, len(inputs))
	for i, t := range inputs {
		bulk[i] = client.ArchivedWorkspaceActivityTask.Create().SetInput(t)
	}
	if _, err = client.ArchivedWorkspaceActivityTask.CreateBulk(bulk...).Save(ctx); err != nil {
		log.Fatalf("ArchivedWorkspaceActivityTask failed to seed data: %v", err)
	}
}
