package seed

import (
	"asana-clone-app/cmd/seed/seedutil"
	"asana-clone-app/ent"
	"context"
	"log"
)

var workspaceActivitySeed = make([]*ent.WorkspaceActivity, 3)

// WorkspaceActivity generates workspace activity data.
func WorkspaceActivity(ctx context.Context, client *ent.Client) {
	_, err := client.WorkspaceActivity.Delete().Exec(ctx)
	if err != nil {
		log.Fatalf("WorkspaceActivity failed to delete data: %v", err)
	}
	activityTypeID := seedutil.GetActivityType(ctx, client, "Workspace").ID
	teammateID := seedutil.GetTeammateByEmail(ctx, client, teammateSeed.manato.Email).ID
	workspaceID := seedutil.GetWorkspace(ctx, client).ID
	projectID := seedutil.GetProjectByName(ctx, client, projectSeed.appDevelopment.name).ID

	inputs := []ent.CreateWorkspaceActivityInput{
		{
			TeammateID:     teammateID,
			ActivityTypeID: activityTypeID,
			ProjectID:      projectID,
			WorkspaceID:    workspaceID,
			CreatedAt:      seedutil.AddDate(-1),
			UpdatedAt:      seedutil.AddDate(-1),
		},
		{
			TeammateID:     teammateID,
			ActivityTypeID: activityTypeID,
			ProjectID:      projectID,
			WorkspaceID:    workspaceID,
			CreatedAt:      seedutil.AddDate(-1),
			UpdatedAt:      seedutil.AddDate(-3),
		},
		{
			TeammateID:     teammateID,
			ActivityTypeID: activityTypeID,
			ProjectID:      projectID,
			WorkspaceID:    workspaceID,
			CreatedAt:      seedutil.AddDate(-1),
			UpdatedAt:      seedutil.AddDate(-7),
		},
	}
	bulk := make([]*ent.WorkspaceActivityCreate, len(inputs))
	for i, t := range inputs {
		bulk[i] = client.WorkspaceActivity.Create().SetInput(t)
	}
	if _, err = client.WorkspaceActivity.CreateBulk(bulk...).Save(ctx); err != nil {
		log.Fatalf("WorkspaceActivity failed to seed data: %v", err)
	}

	res, err := client.WorkspaceActivity.Query().All(ctx)
	if err != nil {
		log.Fatalf("WorkspaceActivity failed to seed data: %v", err)
	}

	for i, r := range res {
		workspaceActivitySeed[i] = r
	}
}
