package seed

import (
	"asana-clone-app/cmd/seed/seedutil"
	"asana-clone-app/ent"
	"context"
	"log"
)

// ProjectTeammate generates project teammates data.
func ProjectTeammate(ctx context.Context, client *ent.Client) {
	_, err := client.ProjectTeammate.Delete().Exec(ctx)
	if err != nil {
		log.Fatalf("ProjectTeammate failed to delete data: %v", err)
	}

	inputs := []ent.CreateProjectTeammateInput{
		{
			ProjectID:  seedutil.GetProjectByName(ctx, client, projectSeed.appDevelopment.name).ID,
			TeammateID: seedutil.GetTeammateByEmail(ctx, client, teammateSeed.manato.Email).ID,
			Role:       "",
			IsOwner:    true,
		},
		{
			ProjectID:  seedutil.GetProjectByName(ctx, client, projectSeed.appDevelopment.name).ID,
			TeammateID: seedutil.GetTeammateByEmail(ctx, client, teammateSeed.dan.Email).ID,
			Role:       "",
			IsOwner:    false,
		},
		{
			ProjectID:  seedutil.GetProjectByName(ctx, client, projectSeed.appDevelopment.name).ID,
			TeammateID: seedutil.GetTeammateByEmail(ctx, client, teammateSeed.kent.Email).ID,
			Role:       "",
			IsOwner:    false,
		},
	}
	bulk := make([]*ent.ProjectTeammateCreate, len(inputs))
	for i, t := range inputs {
		bulk[i] = client.ProjectTeammate.Create().SetInput(t)
	}
	if _, err = client.ProjectTeammate.CreateBulk(bulk...).Save(ctx); err != nil {
		log.Fatalf("ProjectTeammate failed to seed data: %v", err)
	}
}
