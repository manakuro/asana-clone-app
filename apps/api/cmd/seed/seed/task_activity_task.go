package seed

import (
	"asana-clone-app/cmd/seed/seedutil"
	"asana-clone-app/ent"
	"context"
	"log"
)

// TaskActivityTask generates tasks data.
func TaskActivityTask(ctx context.Context, client *ent.Client) {
	_, err := client.TaskActivityTask.Delete().Exec(ctx)
	if err != nil {
		log.Fatalf("TaskActivityTask failed to delete data: %v", err)
	}

	taskActivity1ID := seedutil.GetTaskActivity(ctx, client, taskActivitySeed[0].ID).ID
	task1ID := seedutil.GetTaskByName(ctx, client, taskAssignedFeed.task1.Name).ID
	task2ID := seedutil.GetTaskByName(ctx, client, taskAssignedFeed.task2.Name).ID

	taskActivity2ID := seedutil.GetTaskActivity(ctx, client, taskActivitySeed[1].ID).ID
	task3ID := seedutil.GetTaskByName(ctx, client, taskAssignedFeed.task3.Name).ID
	task4ID := seedutil.GetTaskByName(ctx, client, taskAssignedFeed.task4.Name).ID

	taskActivity3ID := seedutil.GetTaskActivity(ctx, client, taskActivitySeed[2].ID).ID
	task5ID := seedutil.GetTaskByName(ctx, client, taskAssignedFeed.task5.Name).ID

	taskActivity4ID := seedutil.GetTaskActivity(ctx, client, taskActivitySeed[3].ID).ID
	task6ID := seedutil.GetTaskByName(ctx, client, taskAssignedFeed.task6.Name).ID
	task7ID := seedutil.GetTaskByName(ctx, client, taskAssignedFeed.task7.Name).ID
	task8ID := seedutil.GetTaskByName(ctx, client, taskAssignedFeed.task8.Name).ID
	task9ID := seedutil.GetTaskByName(ctx, client, taskAssignedFeed.task9.Name).ID

	inputs := []ent.CreateTaskActivityTaskInput{
		// taskActivity 1
		{
			TaskActivityID: taskActivity1ID,
			TaskID:         task1ID,
		},
		{
			TaskActivityID: taskActivity1ID,
			TaskID:         task2ID,
		},
		// taskActivity 2
		{
			TaskActivityID: taskActivity2ID,
			TaskID:         task3ID,
		},
		{
			TaskActivityID: taskActivity2ID,
			TaskID:         task4ID,
		},
		// taskActivity 3
		{
			TaskActivityID: taskActivity3ID,
			TaskID:         task5ID,
		},
		// taskActivity 4
		{
			TaskActivityID: taskActivity4ID,
			TaskID:         task6ID,
		},
		{
			TaskActivityID: taskActivity4ID,
			TaskID:         task7ID,
		},
		{
			TaskActivityID: taskActivity4ID,
			TaskID:         task8ID,
		},
		{
			TaskActivityID: taskActivity4ID,
			TaskID:         task9ID,
		},
	}
	bulk := make([]*ent.TaskActivityTaskCreate, len(inputs))
	for i, t := range inputs {
		bulk[i] = client.TaskActivityTask.Create().SetInput(t)
	}
	if _, err = client.TaskActivityTask.CreateBulk(bulk...).Save(ctx); err != nil {
		log.Fatalf("TaskActivityTask failed to seed data: %v", err)
	}
}
