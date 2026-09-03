package seed

import (
	"asana-clone-app/cmd/seed/seedutil"
	"asana-clone-app/ent"
	"context"
	"log"
)

// ProjectTask generates project task data.
func ProjectTask(ctx context.Context, client *ent.Client) {
	_, err := client.ProjectTask.Delete().Exec(ctx)
	if err != nil {
		log.Fatalf("ProjectTask failed to delete data: %v", err)
	}

	appDevelopmentID := seedutil.GetProjectByName(ctx, client, projectSeed.appDevelopment.name).ID
	marketingID := seedutil.GetProjectByName(ctx, client, projectSeed.marketing.name).ID
	inputs := []ent.CreateProjectTaskInput{
		// App Development
		{
			ProjectID:            appDevelopmentID,
			TaskID:               seedutil.GetTaskByName(ctx, client, taskAssignedFeed.task1.Name).ID,
			ProjectTaskSectionID: seedutil.GetProjectTaskSectionByName(ctx, client, appDevelopmentID, projectTaskSectionFeedAppDevelopment.backlog.Name).ID,
		},
		{
			ProjectID:            appDevelopmentID,
			TaskID:               seedutil.GetTaskByName(ctx, client, taskAssignedFeed.task2.Name).ID,
			ProjectTaskSectionID: seedutil.GetProjectTaskSectionByName(ctx, client, appDevelopmentID, projectTaskSectionFeedAppDevelopment.backlog.Name).ID,
		},
		{
			ProjectID:            appDevelopmentID,
			TaskID:               seedutil.GetTaskByName(ctx, client, taskAssignedFeed.task3.Name).ID,
			ProjectTaskSectionID: seedutil.GetProjectTaskSectionByName(ctx, client, appDevelopmentID, projectTaskSectionFeedAppDevelopment.backlog.Name).ID,
		},
		{
			ProjectID:            appDevelopmentID,
			TaskID:               seedutil.GetTaskByName(ctx, client, taskAssignedFeed.task4.Name).ID,
			ProjectTaskSectionID: seedutil.GetProjectTaskSectionByName(ctx, client, appDevelopmentID, projectTaskSectionFeedAppDevelopment.ready.Name).ID,
		},
		{
			ProjectID:            appDevelopmentID,
			TaskID:               seedutil.GetTaskByName(ctx, client, taskAssignedFeed.task5.Name).ID,
			ProjectTaskSectionID: seedutil.GetProjectTaskSectionByName(ctx, client, appDevelopmentID, projectTaskSectionFeedAppDevelopment.ready.Name).ID,
		},
		{
			ProjectID:            appDevelopmentID,
			TaskID:               seedutil.GetTaskByName(ctx, client, taskAssignedFeed.task6.Name).ID,
			ProjectTaskSectionID: seedutil.GetProjectTaskSectionByName(ctx, client, appDevelopmentID, projectTaskSectionFeedAppDevelopment.ready.Name).ID,
		},
		{
			ProjectID:            appDevelopmentID,
			TaskID:               seedutil.GetTaskByName(ctx, client, taskAssignedFeed.task7.Name).ID,
			ProjectTaskSectionID: seedutil.GetProjectTaskSectionByName(ctx, client, appDevelopmentID, projectTaskSectionFeedAppDevelopment.inProgress.Name).ID,
		},
		{
			ProjectID:            appDevelopmentID,
			TaskID:               seedutil.GetTaskByName(ctx, client, taskAssignedFeed.task8.Name).ID,
			ProjectTaskSectionID: seedutil.GetProjectTaskSectionByName(ctx, client, appDevelopmentID, projectTaskSectionFeedAppDevelopment.inProgress.Name).ID,
		},
		{
			ProjectID:            appDevelopmentID,
			TaskID:               seedutil.GetTaskByName(ctx, client, taskAssignedFeed.task9.Name).ID,
			ProjectTaskSectionID: seedutil.GetProjectTaskSectionByName(ctx, client, appDevelopmentID, projectTaskSectionFeedAppDevelopment.inProgress.Name).ID,
		},
		{
			ProjectID:            appDevelopmentID,
			TaskID:               seedutil.GetTaskByName(ctx, client, taskAssignedFeed.task10.Name).ID,
			ProjectTaskSectionID: seedutil.GetProjectTaskSectionByName(ctx, client, appDevelopmentID, projectTaskSectionFeedAppDevelopment.inProgress.Name).ID,
		},
		{
			ProjectID:            appDevelopmentID,
			TaskID:               seedutil.GetTaskByName(ctx, client, taskAssignedFeed.task2Subtask1.Name).ID,
			ProjectTaskSectionID: seedutil.GetProjectTaskSectionByName(ctx, client, appDevelopmentID, projectTaskSectionFeedAppDevelopment.inProgress.Name).ID,
		},
		{
			ProjectID:            appDevelopmentID,
			TaskID:               seedutil.GetTaskByName(ctx, client, taskAssignedFeed.task2Subtask2.Name).ID,
			ProjectTaskSectionID: seedutil.GetProjectTaskSectionByName(ctx, client, appDevelopmentID, projectTaskSectionFeedAppDevelopment.done.Name).ID,
		},
		{
			ProjectID:            appDevelopmentID,
			TaskID:               seedutil.GetTaskByName(ctx, client, taskAssignedFeed.task2Subtask3.Name).ID,
			ProjectTaskSectionID: seedutil.GetProjectTaskSectionByName(ctx, client, appDevelopmentID, projectTaskSectionFeedAppDevelopment.done.Name).ID,
		},

		// Marketing - Planning
		{
			ProjectID:            marketingID,
			TaskID:               seedutil.GetTaskByName(ctx, client, taskNoAssignedFeed.mTask1.Name).ID,
			ProjectTaskSectionID: seedutil.GetProjectTaskSectionByName(ctx, client, marketingID, projectTaskSectionFeedMarketing.planning.Name).ID,
		},
		{
			ProjectID:            marketingID,
			TaskID:               seedutil.GetTaskByName(ctx, client, taskNoAssignedFeed.mTask2.Name).ID,
			ProjectTaskSectionID: seedutil.GetProjectTaskSectionByName(ctx, client, marketingID, projectTaskSectionFeedMarketing.planning.Name).ID,
		},
		{
			ProjectID:            marketingID,
			TaskID:               seedutil.GetTaskByName(ctx, client, taskNoAssignedFeed.mTask3.Name).ID,
			ProjectTaskSectionID: seedutil.GetProjectTaskSectionByName(ctx, client, marketingID, projectTaskSectionFeedMarketing.planning.Name).ID,
		},
		{
			ProjectID:            marketingID,
			TaskID:               seedutil.GetTaskByName(ctx, client, taskNoAssignedFeed.mTask4.Name).ID,
			ProjectTaskSectionID: seedutil.GetProjectTaskSectionByName(ctx, client, marketingID, projectTaskSectionFeedMarketing.planning.Name).ID,
		},
		// Marketing - Upcoming
		{
			ProjectID:            marketingID,
			TaskID:               seedutil.GetTaskByName(ctx, client, taskNoAssignedFeed.mTask5.Name).ID,
			ProjectTaskSectionID: seedutil.GetProjectTaskSectionByName(ctx, client, marketingID, projectTaskSectionFeedMarketing.upcoming.Name).ID,
		},
		{
			ProjectID:            marketingID,
			TaskID:               seedutil.GetTaskByName(ctx, client, taskNoAssignedFeed.mTask6.Name).ID,
			ProjectTaskSectionID: seedutil.GetProjectTaskSectionByName(ctx, client, marketingID, projectTaskSectionFeedMarketing.upcoming.Name).ID,
		},
		{
			ProjectID:            marketingID,
			TaskID:               seedutil.GetTaskByName(ctx, client, taskNoAssignedFeed.mTask7.Name).ID,
			ProjectTaskSectionID: seedutil.GetProjectTaskSectionByName(ctx, client, marketingID, projectTaskSectionFeedMarketing.upcoming.Name).ID,
		},
		{
			ProjectID:            marketingID,
			TaskID:               seedutil.GetTaskByName(ctx, client, taskNoAssignedFeed.mTask8.Name).ID,
			ProjectTaskSectionID: seedutil.GetProjectTaskSectionByName(ctx, client, marketingID, projectTaskSectionFeedMarketing.upcoming.Name).ID,
		},

		// Marketing - Content Development
		{
			ProjectID:            marketingID,
			TaskID:               seedutil.GetTaskByName(ctx, client, taskNoAssignedFeed.mTask9.Name).ID,
			ProjectTaskSectionID: seedutil.GetProjectTaskSectionByName(ctx, client, marketingID, projectTaskSectionFeedMarketing.contentDevelopment.Name).ID,
		},
		{
			ProjectID:            marketingID,
			TaskID:               seedutil.GetTaskByName(ctx, client, taskNoAssignedFeed.mTask10.Name).ID,
			ProjectTaskSectionID: seedutil.GetProjectTaskSectionByName(ctx, client, marketingID, projectTaskSectionFeedMarketing.contentDevelopment.Name).ID,
		},
		{
			ProjectID:            marketingID,
			TaskID:               seedutil.GetTaskByName(ctx, client, taskNoAssignedFeed.mTask11.Name).ID,
			ProjectTaskSectionID: seedutil.GetProjectTaskSectionByName(ctx, client, marketingID, projectTaskSectionFeedMarketing.contentDevelopment.Name).ID,
		},

		// Marketing - Campaign Promotion
		{
			ProjectID:            marketingID,
			TaskID:               seedutil.GetTaskByName(ctx, client, taskNoAssignedFeed.mTask12.Name).ID,
			ProjectTaskSectionID: seedutil.GetProjectTaskSectionByName(ctx, client, marketingID, projectTaskSectionFeedMarketing.campaign.Name).ID,
		},
		{
			ProjectID:            marketingID,
			TaskID:               seedutil.GetTaskByName(ctx, client, taskNoAssignedFeed.mTask13.Name).ID,
			ProjectTaskSectionID: seedutil.GetProjectTaskSectionByName(ctx, client, marketingID, projectTaskSectionFeedMarketing.campaign.Name).ID,
		},
		{
			ProjectID:            marketingID,
			TaskID:               seedutil.GetTaskByName(ctx, client, taskNoAssignedFeed.mTask14.Name).ID,
			ProjectTaskSectionID: seedutil.GetProjectTaskSectionByName(ctx, client, marketingID, projectTaskSectionFeedMarketing.campaign.Name).ID,
		},
	}
	bulk := make([]*ent.ProjectTaskCreate, len(inputs))
	for i, t := range inputs {
		bulk[i] = client.ProjectTask.Create().SetInput(t)
	}
	if _, err = client.ProjectTask.CreateBulk(bulk...).Save(ctx); err != nil {
		log.Fatalf("ProjectTask failed to seed data: %v", err)
	}
}
