package seed

import (
	"asana-clone-app/cmd/seed/seedutil"
	"asana-clone-app/ent"
	"context"
	"log"
)

var archivedWorkspaceActivitySeed = make([]*ent.ArchivedWorkspaceActivity, 1)

// ArchivedWorkspaceActivity generates archived workspace activity data.
func ArchivedWorkspaceActivity(ctx context.Context, client *ent.Client) {
	_, err := client.ArchivedWorkspaceActivity.Delete().Exec(ctx)
	if err != nil {
		log.Fatalf("ArchivedWorkspaceActivity failed to delete data: %v", err)
	}
	activityTypeID := seedutil.GetActivityType(ctx, client, "Workspace").ID
	teammateID := seedutil.GetTeammateByEmail(ctx, client, teammateSeed.manato.Email).ID
	workspaceID := seedutil.GetWorkspace(ctx, client).ID
	projectID := seedutil.GetProjectByName(ctx, client, projectSeed.appDevelopment.name).ID

	inputs := []ent.CreateArchivedWorkspaceActivityInput{
		{
			TeammateID:     teammateID,
			ActivityTypeID: activityTypeID,
			ProjectID:      projectID,
			WorkspaceID:    workspaceID,
			CreatedAt:      seedutil.AddDate(-1),
			UpdatedAt:      seedutil.AddDate(-1),
		},
	}
	bulk := make([]*ent.ArchivedWorkspaceActivityCreate, len(inputs))
	for i, t := range inputs {
		bulk[i] = client.ArchivedWorkspaceActivity.Create().SetInput(t)
	}
	if _, err = client.ArchivedWorkspaceActivity.CreateBulk(bulk...).Save(ctx); err != nil {
		log.Fatalf("ArchivedWorkspaceActivity failed to seed data: %v", err)
	}

	res, err := client.ArchivedWorkspaceActivity.Query().All(ctx)
	if err != nil {
		log.Fatalf("ArchivedWorkspaceActivity failed to seed data: %v", err)
	}

	for i, r := range res {
		archivedWorkspaceActivitySeed[i] = r
	}
}
