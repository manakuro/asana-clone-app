package seed

import (
	"asana-clone-app/cmd/seed/seedutil"
	"asana-clone-app/ent"
	"context"
	"log"
)

// ProjectIcon generates project icon data.
func ProjectIcon(ctx context.Context, client *ent.Client) {
	_, err := client.ProjectIcon.Delete().Exec(ctx)
	if err != nil {
		log.Fatalf("ProjectIcon failed to delete data: %v", err)
	}

	inputs := []ent.CreateProjectIconInput{
		{
			IconID: seedutil.GetIcon(ctx, client, iconSeed.play.Icon).ID,
		},
		{
			IconID: seedutil.GetIcon(ctx, client, iconSeed.home.Icon).ID,
		},
		{
			IconID: seedutil.GetIcon(ctx, client, iconSeed.moon.Icon).ID,
		},
		{
			IconID: seedutil.GetIcon(ctx, client, iconSeed.sun.Icon).ID,
		},
		{
			IconID: seedutil.GetIcon(ctx, client, iconSeed.menu.Icon).ID,
		},
		{
			IconID: seedutil.GetIcon(ctx, client, iconSeed.codeAlt.Icon).ID,
		},
		{
			IconID: seedutil.GetIcon(ctx, client, iconSeed.rocket.Icon).ID,
		},
		{
			IconID: seedutil.GetIcon(ctx, client, iconSeed.idCard.Icon).ID,
		},
		{
			IconID: seedutil.GetIcon(ctx, client, iconSeed.trashAlt.Icon).ID,
		},
		{
			IconID: seedutil.GetIcon(ctx, client, iconSeed.task.Icon).ID,
		},
		{
			IconID: seedutil.GetIcon(ctx, client, iconSeed.bell.Icon).ID,
		},
		{
			IconID: seedutil.GetIcon(ctx, client, iconSeed.notification.Icon).ID,
		},
		{
			IconID: seedutil.GetIcon(ctx, client, iconSeed.barChart.Icon).ID,
		},
		{
			IconID: seedutil.GetIcon(ctx, client, iconSeed.bookOpen.Icon).ID,
		},
		{
			IconID: seedutil.GetIcon(ctx, client, iconSeed.layerPlus.Icon).ID,
		},
		{
			IconID: seedutil.GetIcon(ctx, client, iconSeed.mobile.Icon).ID,
		},
		{
			IconID: seedutil.GetIcon(ctx, client, iconSeed.movie.Icon).ID,
		},
		{
			IconID: seedutil.GetIcon(ctx, client, iconSeed.shapePolygon.Icon).ID,
		},
		{
			IconID: seedutil.GetIcon(ctx, client, iconSeed.spreadsheet.Icon).ID,
		},
		{
			IconID: seedutil.GetIcon(ctx, client, iconSeed.layout.Icon).ID,
		},
	}
	bulk := make([]*ent.ProjectIconCreate, len(inputs))
	for i, t := range inputs {
		bulk[i] = client.ProjectIcon.Create().SetInput(t)
	}
	if _, err = client.ProjectIcon.CreateBulk(bulk...).Save(ctx); err != nil {
		log.Fatalf("ProjectIcon failed to seed data: %v", err)
	}
}
