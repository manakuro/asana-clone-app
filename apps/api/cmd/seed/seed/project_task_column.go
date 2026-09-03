package seed

import (
	"asana-clone-app/cmd/seed/seedutil"
	"asana-clone-app/ent"
	"context"
	"log"
)

// ProjectTaskColumn generates project task column data.
func ProjectTaskColumn(ctx context.Context, client *ent.Client) {
	_, err := client.ProjectTaskColumn.Delete().Exec(ctx)
	if err != nil {
		log.Fatalf("ProjectTaskColumn failed to delete data: %v", err)
	}

	inputs := []ent.CreateProjectTaskColumnInput{
		{
			TaskColumnID: seedutil.GetTaskColumnByName(ctx, client, taskColumnFeed.taskName.Name).ID,
			ProjectID:    seedutil.GetProjectByName(ctx, client, projectSeed.appDevelopment.name).ID,
			Width:        "500px",
			Disabled:     false,
			Customizable: false,
			Order:        1,
		},
		{
			TaskColumnID: seedutil.GetTaskColumnByName(ctx, client, taskColumnFeed.assignee.Name).ID,
			ProjectID:    seedutil.GetProjectByName(ctx, client, projectSeed.appDevelopment.name).ID,
			Width:        "120px",
			Disabled:     false,
			Customizable: true,
			Order:        2,
		},
		{
			TaskColumnID: seedutil.GetTaskColumnByName(ctx, client, taskColumnFeed.dueDate.Name).ID,
			ProjectID:    seedutil.GetProjectByName(ctx, client, projectSeed.appDevelopment.name).ID,
			Width:        "120px",
			Disabled:     false,
			Customizable: true,
			Order:        3,
		},
		{
			TaskColumnID: seedutil.GetTaskColumnByName(ctx, client, taskColumnFeed.tags.Name).ID,
			ProjectID:    seedutil.GetProjectByName(ctx, client, projectSeed.appDevelopment.name).ID,
			Width:        "120px",
			Disabled:     false,
			Customizable: true,
			Order:        4,
		},
		{
			TaskColumnID: seedutil.GetTaskColumnByName(ctx, client, taskColumnFeed.priority.Name).ID,
			ProjectID:    seedutil.GetProjectByName(ctx, client, projectSeed.appDevelopment.name).ID,
			Width:        "120px",
			Disabled:     false,
			Customizable: true,
			Order:        5,
		},
		{
			TaskColumnID: seedutil.GetTaskColumnByName(ctx, client, taskColumnFeed.taskName.Name).ID,
			ProjectID:    seedutil.GetProjectByName(ctx, client, projectSeed.marketing.name).ID,
			Width:        "500px",
			Disabled:     false,
			Customizable: false,
			Order:        1,
		},
		{
			TaskColumnID: seedutil.GetTaskColumnByName(ctx, client, taskColumnFeed.assignee.Name).ID,
			ProjectID:    seedutil.GetProjectByName(ctx, client, projectSeed.marketing.name).ID,
			Width:        "120px",
			Disabled:     false,
			Customizable: true,
			Order:        2,
		},
		{
			TaskColumnID: seedutil.GetTaskColumnByName(ctx, client, taskColumnFeed.dueDate.Name).ID,
			ProjectID:    seedutil.GetProjectByName(ctx, client, projectSeed.marketing.name).ID,
			Width:        "120px",
			Disabled:     false,
			Customizable: true,
			Order:        3,
		},
		{
			TaskColumnID: seedutil.GetTaskColumnByName(ctx, client, taskColumnFeed.tags.Name).ID,
			ProjectID:    seedutil.GetProjectByName(ctx, client, projectSeed.marketing.name).ID,
			Width:        "120px",
			Disabled:     false,
			Customizable: true,
			Order:        4,
		},
		{
			TaskColumnID: seedutil.GetTaskColumnByName(ctx, client, taskColumnFeed.priority.Name).ID,
			ProjectID:    seedutil.GetProjectByName(ctx, client, projectSeed.marketing.name).ID,
			Width:        "120px",
			Disabled:     false,
			Customizable: true,
			Order:        5,
		},
		{
			TaskColumnID: seedutil.GetTaskColumnByName(ctx, client, taskColumnFeed.taskName.Name).ID,
			ProjectID:    seedutil.GetProjectByName(ctx, client, projectSeed.customerSuccess.name).ID,
			Width:        "500px",
			Disabled:     false,
			Customizable: false,
			Order:        1,
		},
		{
			TaskColumnID: seedutil.GetTaskColumnByName(ctx, client, taskColumnFeed.assignee.Name).ID,
			ProjectID:    seedutil.GetProjectByName(ctx, client, projectSeed.customerSuccess.name).ID,
			Width:        "120px",
			Disabled:     false,
			Customizable: true,
			Order:        2,
		},
		{
			TaskColumnID: seedutil.GetTaskColumnByName(ctx, client, taskColumnFeed.dueDate.Name).ID,
			ProjectID:    seedutil.GetProjectByName(ctx, client, projectSeed.customerSuccess.name).ID,
			Width:        "120px",
			Disabled:     false,
			Customizable: true,
			Order:        3,
		},
		{
			TaskColumnID: seedutil.GetTaskColumnByName(ctx, client, taskColumnFeed.tags.Name).ID,
			ProjectID:    seedutil.GetProjectByName(ctx, client, projectSeed.customerSuccess.name).ID,
			Width:        "120px",
			Disabled:     false,
			Customizable: true,
			Order:        4,
		},
		{
			TaskColumnID: seedutil.GetTaskColumnByName(ctx, client, taskColumnFeed.priority.Name).ID,
			ProjectID:    seedutil.GetProjectByName(ctx, client, projectSeed.customerSuccess.name).ID,
			Width:        "120px",
			Disabled:     false,
			Customizable: true,
			Order:        5,
		},
	}
	bulk := make([]*ent.ProjectTaskColumnCreate, len(inputs))
	for i, t := range inputs {
		bulk[i] = client.ProjectTaskColumn.Create().SetInput(t)
	}
	if _, err = client.ProjectTaskColumn.CreateBulk(bulk...).Save(ctx); err != nil {
		log.Fatalf("ProjectTaskColumn failed to seed data: %v", err)
	}
}
