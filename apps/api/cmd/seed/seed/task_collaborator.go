package seed

import (
	"asana-clone-app/cmd/seed/seedutil"
	"asana-clone-app/ent"
	"context"
	"log"
)

// TaskCollaborator generates task collaborator data.
func TaskCollaborator(ctx context.Context, client *ent.Client) {
	_, err := client.TaskCollaborator.Delete().Exec(ctx)
	if err != nil {
		log.Fatalf("TaskCollaborator failed to delete data: %v", err)
	}
	manatoID := seedutil.GetTeammateByEmail(ctx, client, teammateSeed.manato.Email).ID
	danID := seedutil.GetTeammateByEmail(ctx, client, teammateSeed.dan.Email).ID
	kentID := seedutil.GetTeammateByEmail(ctx, client, teammateSeed.kent.Email).ID

	inputs := []ent.CreateTaskCollaboratorInput{
		{
			TeammateID: manatoID,
			TaskID:     seedutil.GetTaskByName(ctx, client, taskAssignedFeed.task1.Name).ID,
		},
		{
			TeammateID: danID,
			TaskID:     seedutil.GetTaskByName(ctx, client, taskAssignedFeed.task1.Name).ID,
		},
		{
			TeammateID: kentID,
			TaskID:     seedutil.GetTaskByName(ctx, client, taskAssignedFeed.task1.Name).ID,
		},
		{
			TeammateID: manatoID,
			TaskID:     seedutil.GetTaskByName(ctx, client, taskAssignedFeed.task2.Name).ID,
		},
		{
			TeammateID: danID,
			TaskID:     seedutil.GetTaskByName(ctx, client, taskAssignedFeed.task2.Name).ID,
		},
	}
	bulk := make([]*ent.TaskCollaboratorCreate, len(inputs))
	for i, t := range inputs {
		bulk[i] = client.TaskCollaborator.Create().SetInput(t)
	}
	if _, err = client.TaskCollaborator.CreateBulk(bulk...).Save(ctx); err != nil {
		log.Fatalf("TaskCollaborator failed to seed data: %v", err)
	}
}
