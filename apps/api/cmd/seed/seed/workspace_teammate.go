package seed

import (
	"asana-clone-app/cmd/seed/seedutil"
	"asana-clone-app/ent"
	"context"
	"log"
)

// WorkspaceTeammate generates workspace teammates data.
func WorkspaceTeammate(ctx context.Context, client *ent.Client) {
	_, err := client.WorkspaceTeammate.Delete().Exec(ctx)
	if err != nil {
		log.Fatalf("WorkspaceTeammate failed to delete data: %v", err)
	}

	inputs := []ent.CreateWorkspaceTeammateInput{
		{
			WorkspaceID: seedutil.GetWorkspace(ctx, client).ID,
			TeammateID:  seedutil.GetTeammateByEmail(ctx, client, teammateSeed.manato.Email).ID,
			Role:        "",
			IsOwner:     true,
		},
		{
			WorkspaceID: seedutil.GetWorkspace(ctx, client).ID,
			TeammateID:  seedutil.GetTeammateByEmail(ctx, client, teammateSeed.dan.Email).ID,
			Role:        "",
			IsOwner:     false,
		},
		{
			WorkspaceID: seedutil.GetWorkspace(ctx, client).ID,
			TeammateID:  seedutil.GetTeammateByEmail(ctx, client, teammateSeed.kent.Email).ID,
			Role:        "",
			IsOwner:     false,
		},
	}
	bulk := make([]*ent.WorkspaceTeammateCreate, len(inputs))
	for i, t := range inputs {
		bulk[i] = client.WorkspaceTeammate.Create().SetInput(t)
	}
	if _, err = client.WorkspaceTeammate.CreateBulk(bulk...).Save(ctx); err != nil {
		log.Fatalf("WorkspaceTeammate failed to seed data: %v", err)
	}
}
