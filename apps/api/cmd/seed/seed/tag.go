package seed

import (
	"asana-clone-app/cmd/seed/seedutil"
	"asana-clone-app/ent"
	"context"
	"log"
)

var tagSeed = struct {
	design      ent.CreateTagInput
	development ent.CreateTagInput
	bug         ent.CreateTagInput
}{
	design:      ent.CreateTagInput{Name: "Design"},
	development: ent.CreateTagInput{Name: "Development"},
	bug:         ent.CreateTagInput{Name: "Bug"},
}

// Tag generates tag data.
func Tag(ctx context.Context, client *ent.Client) {
	_, err := client.Tag.Delete().Exec(ctx)
	if err != nil {
		log.Fatalf("Tag failed to delete data: %v", err)
	}

	workspace := seedutil.GetWorkspace(ctx, client)
	inputs := []ent.CreateTagInput{
		{
			WorkspaceID: workspace.ID,
			ColorID:     seedutil.GetColor(ctx, client, colorSeed.gray400.Color).ID,
			Name:        tagSeed.design.Name,
		},
		{
			WorkspaceID: workspace.ID,
			ColorID:     seedutil.GetColor(ctx, client, colorSeed.orange400.Color).ID,
			Name:        tagSeed.development.Name,
		},
		{
			WorkspaceID: workspace.ID,
			ColorID:     seedutil.GetColor(ctx, client, colorSeed.red400.Color).ID,
			Name:        tagSeed.bug.Name,
		},
	}
	bulk := make([]*ent.TagCreate, len(inputs))
	for i, t := range inputs {
		bulk[i] = client.Tag.Create().SetInput(t)
	}
	if _, err = client.Tag.CreateBulk(bulk...).Save(ctx); err != nil {
		log.Fatalf("Tag failed to seed data: %v", err)
	}
}
