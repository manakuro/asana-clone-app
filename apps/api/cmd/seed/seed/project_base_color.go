package seed

import (
	"asana-clone-app/cmd/seed/seedutil"
	"asana-clone-app/ent"
	"context"
	"log"
)

// ProjectBaseColor generates project base color data.
func ProjectBaseColor(ctx context.Context, client *ent.Client) {
	_, err := client.ProjectBaseColor.Delete().Exec(ctx)
	if err != nil {
		log.Fatalf("ProjectBaseColor failed to delete data: %v", err)
	}

	inputs := []ent.CreateProjectBaseColorInput{
		{
			ColorID: seedutil.GetColor(ctx, client, colorSeed.gray400.Color).ID,
		},
		{
			ColorID: seedutil.GetColor(ctx, client, colorSeed.red400.Color).ID,
		},
		{
			ColorID: seedutil.GetColor(ctx, client, colorSeed.orange400.Color).ID,
		},
		{
			ColorID: seedutil.GetColor(ctx, client, colorSeed.yellow400.Color).ID,
		},
		{
			ColorID: seedutil.GetColor(ctx, client, colorSeed.green400.Color).ID,
		},
		{
			ColorID: seedutil.GetColor(ctx, client, colorSeed.teal400.Color).ID,
		},
		{
			ColorID: seedutil.GetColor(ctx, client, colorSeed.blue400.Color).ID,
		},
		{
			ColorID: seedutil.GetColor(ctx, client, colorSeed.cyan400.Color).ID,
		},
		{
			ColorID: seedutil.GetColor(ctx, client, colorSeed.purple400.Color).ID,
		},
		{
			ColorID: seedutil.GetColor(ctx, client, colorSeed.pink400.Color).ID,
		},
	}
	bulk := make([]*ent.ProjectBaseColorCreate, len(inputs))
	for i, t := range inputs {
		bulk[i] = client.ProjectBaseColor.Create().SetInput(t)
	}
	if _, err = client.ProjectBaseColor.CreateBulk(bulk...).Save(ctx); err != nil {
		log.Fatalf("ProjectBaseColor failed to seed data: %v", err)
	}
}
