package seed

import (
	"asana-clone-app/cmd/seed/seedutil"
	"asana-clone-app/ent"
	"context"
	"log"
)

// FavoriteProject generates favorite project data.
func FavoriteProject(ctx context.Context, client *ent.Client) {
	_, err := client.FavoriteProject.Delete().Exec(ctx)
	if err != nil {
		log.Fatalf("FavoriteProject failed to delete data: %v", err)
	}

	inputs := []ent.CreateFavoriteProjectInput{
		{
			ProjectID:  seedutil.GetProjectByName(ctx, client, projectSeed.appDevelopment.name).ID,
			TeammateID: seedutil.GetTeammateByEmail(ctx, client, teammateSeed.manato.Email).ID,
		},
		{
			ProjectID:  seedutil.GetProjectByName(ctx, client, projectSeed.marketing.name).ID,
			TeammateID: seedutil.GetTeammateByEmail(ctx, client, teammateSeed.manato.Email).ID,
		},
	}
	bulk := make([]*ent.FavoriteProjectCreate, len(inputs))
	for i, t := range inputs {
		bulk[i] = client.FavoriteProject.Create().SetInput(t)
	}
	if _, err = client.FavoriteProject.CreateBulk(bulk...).Save(ctx); err != nil {
		log.Fatalf("FavoriteProject failed to seed data: %v", err)
	}
}
