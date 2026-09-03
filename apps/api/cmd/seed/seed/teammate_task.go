package seed

import (
	"asana-clone-app/cmd/seed/seedutil"
	"asana-clone-app/ent"
	"context"
	"log"
)

// TeammateTask generates teammate task data.
func TeammateTask(ctx context.Context, client *ent.Client) {
	_, err := client.TeammateTask.Delete().Exec(ctx)
	if err != nil {
		log.Fatalf("TeammateTask failed to delete data: %v", err)
	}
	teammate := seedutil.GetTeammateByEmail(ctx, client, teammateSeed.manato.Email)
	workspace := seedutil.GetWorkspace(ctx, client)

	inputs := []ent.CreateTeammateTaskInput{
		{
			TeammateID:            teammate.ID,
			TaskID:                seedutil.GetTaskByName(ctx, client, taskAssignedFeed.task1.Name).ID,
			TeammateTaskSectionID: seedutil.GetTeammateTaskSectionByName(ctx, client, teammateTaskSectionSeed.recentlyAssigned.Name, teammate.ID).ID,
			WorkspaceID:           workspace.ID,
		},
		{
			TeammateID:            teammate.ID,
			TaskID:                seedutil.GetTaskByName(ctx, client, taskAssignedFeed.task2.Name).ID,
			TeammateTaskSectionID: seedutil.GetTeammateTaskSectionByName(ctx, client, teammateTaskSectionSeed.recentlyAssigned.Name, teammate.ID).ID,
			WorkspaceID:           workspace.ID,
		},
		{
			TeammateID:            teammate.ID,
			TaskID:                seedutil.GetTaskByName(ctx, client, taskAssignedFeed.task3.Name).ID,
			TeammateTaskSectionID: seedutil.GetTeammateTaskSectionByName(ctx, client, teammateTaskSectionSeed.recentlyAssigned.Name, teammate.ID).ID,
			WorkspaceID:           workspace.ID,
		},
		{
			TeammateID:            teammate.ID,
			TaskID:                seedutil.GetTaskByName(ctx, client, taskAssignedFeed.task4.Name).ID,
			TeammateTaskSectionID: seedutil.GetTeammateTaskSectionByName(ctx, client, teammateTaskSectionSeed.recentlyAssigned.Name, teammate.ID).ID,
			WorkspaceID:           workspace.ID,
		},
		{
			TeammateID:            teammate.ID,
			TaskID:                seedutil.GetTaskByName(ctx, client, taskAssignedFeed.task5.Name).ID,
			TeammateTaskSectionID: seedutil.GetTeammateTaskSectionByName(ctx, client, teammateTaskSectionSeed.recentlyAssigned.Name, teammate.ID).ID,
			WorkspaceID:           workspace.ID,
		},
		{
			TeammateID:            teammate.ID,
			TaskID:                seedutil.GetTaskByName(ctx, client, taskAssignedFeed.task6.Name).ID,
			TeammateTaskSectionID: seedutil.GetTeammateTaskSectionByName(ctx, client, teammateTaskSectionSeed.recentlyAssigned.Name, teammate.ID).ID,
			WorkspaceID:           workspace.ID,
		},
		{
			TeammateID:            teammate.ID,
			TaskID:                seedutil.GetTaskByName(ctx, client, taskAssignedFeed.task7.Name).ID,
			TeammateTaskSectionID: seedutil.GetTeammateTaskSectionByName(ctx, client, teammateTaskSectionSeed.recentlyAssigned.Name, teammate.ID).ID,
			WorkspaceID:           workspace.ID,
		},
		{
			TeammateID:            teammate.ID,
			TaskID:                seedutil.GetTaskByName(ctx, client, taskAssignedFeed.task8.Name).ID,
			TeammateTaskSectionID: seedutil.GetTeammateTaskSectionByName(ctx, client, teammateTaskSectionSeed.recentlyAssigned.Name, teammate.ID).ID,
			WorkspaceID:           workspace.ID,
		},
		{
			TeammateID:            teammate.ID,
			TaskID:                seedutil.GetTaskByName(ctx, client, taskAssignedFeed.task9.Name).ID,
			TeammateTaskSectionID: seedutil.GetTeammateTaskSectionByName(ctx, client, teammateTaskSectionSeed.recentlyAssigned.Name, teammate.ID).ID,
			WorkspaceID:           workspace.ID,
		},
		{
			TeammateID:            teammate.ID,
			TaskID:                seedutil.GetTaskByName(ctx, client, taskAssignedFeed.task10.Name).ID,
			TeammateTaskSectionID: seedutil.GetTeammateTaskSectionByName(ctx, client, teammateTaskSectionSeed.today.Name, teammate.ID).ID,
			WorkspaceID:           workspace.ID,
		},
		{
			TeammateID:            teammate.ID,
			TaskID:                seedutil.GetTaskByName(ctx, client, taskAssignedFeed.task2Subtask1.Name).ID,
			TeammateTaskSectionID: seedutil.GetTeammateTaskSectionByName(ctx, client, teammateTaskSectionSeed.today.Name, teammate.ID).ID,
			WorkspaceID:           workspace.ID,
		},
		{
			TeammateID:            teammate.ID,
			TaskID:                seedutil.GetTaskByName(ctx, client, taskAssignedFeed.task2Subtask2.Name).ID,
			TeammateTaskSectionID: seedutil.GetTeammateTaskSectionByName(ctx, client, teammateTaskSectionSeed.today.Name, teammate.ID).ID,
			WorkspaceID:           workspace.ID,
		},
		{
			TeammateID:            teammate.ID,
			TaskID:                seedutil.GetTaskByName(ctx, client, taskAssignedFeed.task2Subtask3.Name).ID,
			TeammateTaskSectionID: seedutil.GetTeammateTaskSectionByName(ctx, client, teammateTaskSectionSeed.today.Name, teammate.ID).ID,
			WorkspaceID:           workspace.ID,
		},
	}
	bulk := make([]*ent.TeammateTaskCreate, len(inputs))
	for i, t := range inputs {
		bulk[i] = client.TeammateTask.Create().SetInput(t)
	}
	if _, err = client.TeammateTask.CreateBulk(bulk...).Save(ctx); err != nil {
		log.Fatalf("TeammateTask failed to seed data: %v", err)
	}
}
