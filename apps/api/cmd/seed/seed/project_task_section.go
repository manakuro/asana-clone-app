package seed

import (
	"asana-clone-app/cmd/seed/seedutil"
	"asana-clone-app/ent"
	"context"
	"log"
)

var projectTaskSectionFeedAppDevelopment = struct {
	backlog    ent.CreateProjectTaskSectionInput
	ready      ent.CreateProjectTaskSectionInput
	inProgress ent.CreateProjectTaskSectionInput
	done       ent.CreateProjectTaskSectionInput
}{
	backlog: ent.CreateProjectTaskSectionInput{
		Name: "Backlog",
	},
	ready: ent.CreateProjectTaskSectionInput{
		Name: "Ready",
	},
	inProgress: ent.CreateProjectTaskSectionInput{
		Name: "In Progress",
	},
	done: ent.CreateProjectTaskSectionInput{
		Name: "Done",
	},
}

var projectTaskSectionFeedMarketing = struct {
	upcoming           ent.CreateProjectTaskSectionInput
	planning           ent.CreateProjectTaskSectionInput
	campaign           ent.CreateProjectTaskSectionInput
	contentDevelopment ent.CreateProjectTaskSectionInput
}{
	upcoming: ent.CreateProjectTaskSectionInput{
		Name: "Upcoming Work",
	},
	planning: ent.CreateProjectTaskSectionInput{
		Name: "Planning",
	},
	contentDevelopment: ent.CreateProjectTaskSectionInput{
		Name: "Content Development",
	},
	campaign: ent.CreateProjectTaskSectionInput{
		Name: "Campaign Promotion",
	},
}

// ProjectTaskSection generates project task section data.
func ProjectTaskSection(ctx context.Context, client *ent.Client) {
	_, err := client.ProjectTaskSection.Delete().Exec(ctx)
	if err != nil {
		log.Fatalf("ProjectTaskSection failed to delete data: %v", err)
	}

	appDevelopmentProject := seedutil.GetProjectByName(ctx, client, projectSeed.appDevelopment.name)
	marketingProject := seedutil.GetProjectByName(ctx, client, projectSeed.marketing.name)
	customerSuccessProject := seedutil.GetProjectByName(ctx, client, projectSeed.customerSuccess.name)

	inputs := []ent.CreateProjectTaskSectionInput{
		// App Development
		{
			ProjectID: appDevelopmentProject.ID,
			Name:      projectTaskSectionFeedAppDevelopment.backlog.Name,
			CreatedAt: seedutil.AddDate(-3),
		},
		{
			ProjectID: appDevelopmentProject.ID,
			Name:      projectTaskSectionFeedAppDevelopment.ready.Name,
			CreatedAt: seedutil.AddDate(-2),
		},
		{
			ProjectID: appDevelopmentProject.ID,
			Name:      projectTaskSectionFeedAppDevelopment.inProgress.Name,
			CreatedAt: seedutil.AddDate(-1),
		},
		{
			ProjectID: appDevelopmentProject.ID,
			Name:      projectTaskSectionFeedAppDevelopment.done.Name,
		},

		// Marketing
		{
			ProjectID: marketingProject.ID,
			Name:      projectTaskSectionFeedMarketing.upcoming.Name,
			CreatedAt: seedutil.AddDate(-3),
		},
		{
			ProjectID: marketingProject.ID,
			Name:      projectTaskSectionFeedMarketing.planning.Name,
			CreatedAt: seedutil.AddDate(-2),
		},
		{
			ProjectID: marketingProject.ID,
			Name:      projectTaskSectionFeedMarketing.contentDevelopment.Name,
			CreatedAt: seedutil.AddDate(-1),
		},
		{
			ProjectID: marketingProject.ID,
			Name:      projectTaskSectionFeedMarketing.campaign.Name,
		},

		// Customer Success
		{
			ProjectID: customerSuccessProject.ID,
			Name:      projectTaskSectionFeedAppDevelopment.backlog.Name,
			CreatedAt: seedutil.AddDate(-3),
		},
		{
			ProjectID: customerSuccessProject.ID,
			Name:      projectTaskSectionFeedAppDevelopment.ready.Name,
			CreatedAt: seedutil.AddDate(-2),
		},
		{
			ProjectID: customerSuccessProject.ID,
			Name:      projectTaskSectionFeedAppDevelopment.inProgress.Name,
			CreatedAt: seedutil.AddDate(-1),
		},
		{
			ProjectID: customerSuccessProject.ID,
			Name:      projectTaskSectionFeedAppDevelopment.done.Name,
		},
	}
	bulk := make([]*ent.ProjectTaskSectionCreate, len(inputs))
	for i, t := range inputs {
		bulk[i] = client.ProjectTaskSection.Create().SetInput(t)
	}
	if _, err = client.ProjectTaskSection.CreateBulk(bulk...).Save(ctx); err != nil {
		log.Fatalf("ProjectTaskSection failed to seed data: %v", err)
	}
}
