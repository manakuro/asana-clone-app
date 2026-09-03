package seed

import (
	"asana-clone-app/cmd/seed/seedutil"
	"asana-clone-app/ent"
	"context"
	"log"
)

// TeammateTaskListStatus generates teammate task list status data.
func TeammateTaskListStatus(ctx context.Context, client *ent.Client) {
	_, err := client.TeammateTaskListStatus.Delete().Exec(ctx)
	if err != nil {
		log.Fatalf("TeammateTaskListStatus failed to delete data: %v", err)
	}

	inputs := []ent.CreateTeammateTaskListStatusInput{
		{
			WorkspaceID:               seedutil.GetWorkspace(ctx, client).ID,
			TeammateID:                seedutil.GetTeammateByEmail(ctx, client, teammateSeed.manato.Email).ID,
			TaskListCompletedStatusID: seedutil.GetTaskListCompletedStatusByName(ctx, client, taskListCompletedStatusFeed.incomplete.Name).ID,
			TaskListSortStatusID:      seedutil.GetTaskListSortStatusByName(ctx, client, taskListSortStatusFeed.none.Name).ID,
		},
	}
	bulk := make([]*ent.TeammateTaskListStatusCreate, len(inputs))
	for i, t := range inputs {
		bulk[i] = client.TeammateTaskListStatus.Create().SetInput(t)
	}
	if _, err = client.TeammateTaskListStatus.CreateBulk(bulk...).Save(ctx); err != nil {
		log.Fatalf("TeammateTaskListStatus failed to seed data: %v", err)
	}
}
