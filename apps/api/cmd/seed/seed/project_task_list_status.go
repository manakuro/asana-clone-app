package seed

import (
	"asana-clone-app/cmd/seed/seedutil"
	"asana-clone-app/ent"
	"context"
	"log"
)

// ProjectTaskListStatus generates project task list status data.
func ProjectTaskListStatus(ctx context.Context, client *ent.Client) {
	_, err := client.ProjectTaskListStatus.Delete().Exec(ctx)
	if err != nil {
		log.Fatalf("ProjectTaskListStatus failed to delete data: %v", err)
	}

	inputs := []ent.CreateProjectTaskListStatusInput{
		{
			ProjectID:                 seedutil.GetProjectByName(ctx, client, projectSeed.appDevelopment.name).ID,
			TaskListCompletedStatusID: seedutil.GetTaskListCompletedStatusByName(ctx, client, taskListCompletedStatusFeed.incomplete.Name).ID,
			TaskListSortStatusID:      seedutil.GetTaskListSortStatusByName(ctx, client, taskListSortStatusFeed.none.Name).ID,
		},
		{
			ProjectID:                 seedutil.GetProjectByName(ctx, client, projectSeed.marketing.name).ID,
			TaskListCompletedStatusID: seedutil.GetTaskListCompletedStatusByName(ctx, client, taskListCompletedStatusFeed.incomplete.Name).ID,
			TaskListSortStatusID:      seedutil.GetTaskListSortStatusByName(ctx, client, taskListSortStatusFeed.none.Name).ID,
		},
		{
			ProjectID:                 seedutil.GetProjectByName(ctx, client, projectSeed.customerSuccess.name).ID,
			TaskListCompletedStatusID: seedutil.GetTaskListCompletedStatusByName(ctx, client, taskListCompletedStatusFeed.incomplete.Name).ID,
			TaskListSortStatusID:      seedutil.GetTaskListSortStatusByName(ctx, client, taskListSortStatusFeed.none.Name).ID,
		},
	}
	bulk := make([]*ent.ProjectTaskListStatusCreate, len(inputs))
	for i, t := range inputs {
		bulk[i] = client.ProjectTaskListStatus.Create().SetInput(t)
	}
	if _, err = client.ProjectTaskListStatus.CreateBulk(bulk...).Save(ctx); err != nil {
		log.Fatalf("ProjectTaskListStatus failed to seed data: %v", err)
	}
}
