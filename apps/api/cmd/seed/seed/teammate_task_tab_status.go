package seed

import (
	"asana-clone-app/cmd/seed/seedutil"
	"asana-clone-app/ent"
	"context"
	"log"
)

// TeammateTaskTabStatus generates teammate task tab status data.
func TeammateTaskTabStatus(ctx context.Context, client *ent.Client) {
	_, err := client.TeammateTaskTabStatus.Delete().Exec(ctx)
	if err != nil {
		log.Fatalf("TeammateTaskTabStatus failed to delete data: %v", err)
	}

	inputs := []ent.CreateTeammateTaskTabStatusInput{
		{
			WorkspaceID: seedutil.GetWorkspace(ctx, client).ID,
			TeammateID:  seedutil.GetTeammateByEmail(ctx, client, teammateSeed.manato.Email).ID,
		},
	}
	bulk := make([]*ent.TeammateTaskTabStatusCreate, len(inputs))
	for i, t := range inputs {
		bulk[i] = client.TeammateTaskTabStatus.Create().SetInput(t)
	}
	if _, err = client.TeammateTaskTabStatus.CreateBulk(bulk...).Save(ctx); err != nil {
		log.Fatalf("TeammateTaskTabStatus failed to seed data: %v", err)
	}
}
