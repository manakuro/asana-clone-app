package seed

import (
	"asana-clone-app/cmd/seed/seedutil"
	"asana-clone-app/ent"
	"context"
	"log"
)

// ProjectLightColor generates project light color data.
func ProjectLightColor(ctx context.Context, client *ent.Client) {
	_, err := client.ProjectLightColor.Delete().Exec(ctx)
	if err != nil {
		log.Fatalf("ProjectLightColor failed to delete data: %v", err)
	}

	inputs := []ent.CreateProjectLightColorInput{
		{
			ColorID: seedutil.GetColor(ctx, client, colorSeed.gray200.Color).ID,
		},
		{
			ColorID: seedutil.GetColor(ctx, client, colorSeed.red200.Color).ID,
		},
		{
			ColorID: seedutil.GetColor(ctx, client, colorSeed.orange200.Color).ID,
		},
		{
			ColorID: seedutil.GetColor(ctx, client, colorSeed.yellow200.Color).ID,
		},
		{
			ColorID: seedutil.GetColor(ctx, client, colorSeed.green200.Color).ID,
		},
		{
			ColorID: seedutil.GetColor(ctx, client, colorSeed.teal200.Color).ID,
		},
		{
			ColorID: seedutil.GetColor(ctx, client, colorSeed.blue200.Color).ID,
		},
		{
			ColorID: seedutil.GetColor(ctx, client, colorSeed.cyan200.Color).ID,
		},
		{
			ColorID: seedutil.GetColor(ctx, client, colorSeed.purple200.Color).ID,
		},
		{
			ColorID: seedutil.GetColor(ctx, client, colorSeed.pink200.Color).ID,
		},
	}
	bulk := make([]*ent.ProjectLightColorCreate, len(inputs))
	for i, t := range inputs {
		bulk[i] = client.ProjectLightColor.Create().SetInput(t)
	}
	if _, err = client.ProjectLightColor.CreateBulk(bulk...).Save(ctx); err != nil {
		log.Fatalf("ProjectLightColor failed to seed data: %v", err)
	}
}
