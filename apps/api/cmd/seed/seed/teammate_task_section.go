package seed

import (
	"asana-clone-app/cmd/seed/seedutil"
	"asana-clone-app/ent"
	"context"
	"log"
)

var teammateTaskSectionSeed = struct {
	recentlyAssigned ent.CreateTeammateTaskSectionInput
	today            ent.CreateTeammateTaskSectionInput
}{
	recentlyAssigned: ent.CreateTeammateTaskSectionInput{
		Name:     "Recently assigned",
		Assigned: true,
	},
	today: ent.CreateTeammateTaskSectionInput{
		Name:     "Today",
		Assigned: false,
	},
}

// TeammateTaskSection generates teammate task section data.
func TeammateTaskSection(ctx context.Context, client *ent.Client) {
	_, err := client.TeammateTaskSection.Delete().Exec(ctx)
	if err != nil {
		log.Fatalf("TeammateTaskSection failed to delete data: %v", err)
	}

	inputs := []ent.CreateTeammateTaskSectionInput{
		{
			WorkspaceID: seedutil.GetWorkspace(ctx, client).ID,
			TeammateID:  seedutil.GetTeammateByEmail(ctx, client, teammateSeed.manato.Email).ID,
			Name:        teammateTaskSectionSeed.recentlyAssigned.Name,
			Assigned:    teammateTaskSectionSeed.recentlyAssigned.Assigned,
		},
		{
			WorkspaceID: seedutil.GetWorkspace(ctx, client).ID,
			TeammateID:  seedutil.GetTeammateByEmail(ctx, client, teammateSeed.manato.Email).ID,
			Name:        teammateTaskSectionSeed.today.Name,
			Assigned:    teammateTaskSectionSeed.today.Assigned,
		},
		{
			WorkspaceID: seedutil.GetWorkspace(ctx, client).ID,
			TeammateID:  seedutil.GetTeammateByEmail(ctx, client, teammateSeed.dan.Email).ID,
			Name:        teammateTaskSectionSeed.recentlyAssigned.Name,
			Assigned:    teammateTaskSectionSeed.recentlyAssigned.Assigned,
		},
		{
			WorkspaceID: seedutil.GetWorkspace(ctx, client).ID,
			TeammateID:  seedutil.GetTeammateByEmail(ctx, client, teammateSeed.dan.Email).ID,
			Name:        teammateTaskSectionSeed.today.Name,
			Assigned:    teammateTaskSectionSeed.today.Assigned,
		},
		{
			WorkspaceID: seedutil.GetWorkspace(ctx, client).ID,
			TeammateID:  seedutil.GetTeammateByEmail(ctx, client, teammateSeed.kent.Email).ID,
			Name:        teammateTaskSectionSeed.recentlyAssigned.Name,
			Assigned:    teammateTaskSectionSeed.recentlyAssigned.Assigned,
		},
		{
			WorkspaceID: seedutil.GetWorkspace(ctx, client).ID,
			TeammateID:  seedutil.GetTeammateByEmail(ctx, client, teammateSeed.kent.Email).ID,
			Name:        teammateTaskSectionSeed.today.Name,
			Assigned:    teammateTaskSectionSeed.today.Assigned,
		},
	}
	bulk := make([]*ent.TeammateTaskSectionCreate, len(inputs))
	for i, t := range inputs {
		bulk[i] = client.TeammateTaskSection.Create().SetInput(t)
	}
	if _, err = client.TeammateTaskSection.CreateBulk(bulk...).Save(ctx); err != nil {
		log.Fatalf("TeammateTaskSection failed to seed data: %v", err)
	}
}
