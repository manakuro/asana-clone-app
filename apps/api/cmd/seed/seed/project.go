package seed

import (
	"asana-clone-app/cmd/seed/seedutil"
	"asana-clone-app/ent"
	"asana-clone-app/pkg/util/datetime"
	"context"
	"log"
	"time"
)

type projectSeedField struct {
	name string
}

var projectSeed = struct {
	appDevelopment  projectSeedField
	marketing       projectSeedField
	customerSuccess projectSeedField
}{
	appDevelopment:  projectSeedField{name: "App Development"},
	marketing:       projectSeedField{name: "Marketing"},
	customerSuccess: projectSeedField{name: "Customer Success"},
}

// Project generates projects data.
func Project(ctx context.Context, client *ent.Client) {
	_, err := client.Project.Delete().Exec(ctx)
	if err != nil {
		log.Fatalf("Project failed to delete data: %v", err)
	}

	createdBy := seedutil.GetTeammateByEmail(ctx, client, teammateSeed.manato.Email)
	ws := seedutil.GetWorkspace(ctx, client)
	inputs := []ent.CreateProjectInput{
		{
			Name:                projectSeed.appDevelopment.name,
			WorkspaceID:         ws.ID,
			ProjectBaseColorID:  seedutil.GetProjectBaseColorByColor(ctx, client, colorSeed.pink400.Color).ID,
			ProjectLightColorID: seedutil.GetProjectLightColorByColor(ctx, client, colorSeed.pink200.Color).ID,
			ProjectIconID:       seedutil.GetProjectIconByIcon(ctx, client, iconSeed.sun.Icon).ID,
			Description:         seedutil.ParseDescription([]byte(`{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Welcome to the App Development team! We’ll be using this project to track our progress on our Q1 product launch. Final ad designs are in the “Key Resources” section below. Use this form to submit new ideas! 😆","attrs":{"mentionId":"","mentionType":""}}]},{"type":"paragraph","content":null},{"type":"paragraph","content":null},{"type":"paragraph","content":null},{"type":"paragraph","content":null}]}`)),
			DescriptionTitle:    "How we'll collaborate",
			DueDate:             getDueDate(3),
			CreatedBy:           createdBy.ID,
		},
		{
			Name:                projectSeed.marketing.name,
			WorkspaceID:         ws.ID,
			ProjectBaseColorID:  seedutil.GetProjectBaseColorByColor(ctx, client, colorSeed.teal400.Color).ID,
			ProjectLightColorID: seedutil.GetProjectLightColorByColor(ctx, client, colorSeed.teal200.Color).ID,
			ProjectIconID:       seedutil.GetProjectIconByIcon(ctx, client, iconSeed.moon.Icon).ID,
			Description:         seedutil.ParseDescription([]byte(`{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Welcome to the Marketing team! We’ll be using this project to track our progress on our Q1 product launch. Final ad designs are in the “Key Resources” section below. Use this form to submit new ideas! 😆","attrs":{"mentionId":"","mentionType":""}}]},{"type":"paragraph","content":null},{"type":"paragraph","content":null},{"type":"paragraph","content":null},{"type":"paragraph","content":null}]}`)),
			DescriptionTitle:    "How we'll collaborate",
			DueDate:             getDueDate(10),
			CreatedBy:           createdBy.ID,
		},
		{
			Name:                projectSeed.customerSuccess.name,
			WorkspaceID:         ws.ID,
			ProjectBaseColorID:  seedutil.GetProjectBaseColorByColor(ctx, client, colorSeed.orange400.Color).ID,
			ProjectLightColorID: seedutil.GetProjectLightColorByColor(ctx, client, colorSeed.orange200.Color).ID,
			ProjectIconID:       seedutil.GetProjectIconByIcon(ctx, client, iconSeed.moon.Icon).ID,
			Description:         seedutil.ParseDescription([]byte(`{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Welcome to the Customer Success team! We’ll be using this project to track our progress on our Q1 product launch. Final ad designs are in the “Key Resources” section below. Use this form to submit new ideas! 😆","attrs":{"mentionId":"","mentionType":""}}]},{"type":"paragraph","content":null},{"type":"paragraph","content":null},{"type":"paragraph","content":null},{"type":"paragraph","content":null}]}`)),
			DescriptionTitle:    "How we'll collaborate",
			DueDate:             nil,
			CreatedBy:           createdBy.ID,
		},
	}
	bulk := make([]*ent.ProjectCreate, len(inputs))
	for i, t := range inputs {
		bulk[i] = client.Project.Create().SetInput(t)
	}
	if _, err = client.Project.CreateBulk(bulk...).Save(ctx); err != nil {
		log.Fatalf("Project failed to seed data: %v", err)
	}
}

func getDueDate(date int) *time.Time {
	t := datetime.Now()
	t.AddDate(0, 0, date)

	return &t
}
