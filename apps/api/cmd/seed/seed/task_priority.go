package seed

import (
	"asana-clone-app/cmd/seed/seedutil"
	"asana-clone-app/ent"
	"asana-clone-app/ent/taskpriority"
	"context"
	"log"
)

var taskPriorityFeed = struct {
	low    ent.CreateTaskPriorityInput
	medium ent.CreateTaskPriorityInput
	high   ent.CreateTaskPriorityInput
}{
	low: ent.CreateTaskPriorityInput{
		Name:         "Low",
		PriorityType: taskpriority.PriorityTypeLow,
	},
	medium: ent.CreateTaskPriorityInput{
		Name:         "Medium",
		PriorityType: taskpriority.PriorityTypeMedium,
	},
	high: ent.CreateTaskPriorityInput{
		Name:         "High",
		PriorityType: taskpriority.PriorityTypeHigh,
	},
}

// TaskPriority generates project priority data.
func TaskPriority(ctx context.Context, client *ent.Client) {
	_, err := client.TaskPriority.Delete().Exec(ctx)
	if err != nil {
		log.Fatalf("TaskPriority failed to delete data: %v", err)
	}

	inputs := []ent.CreateTaskPriorityInput{
		{
			Name:         taskPriorityFeed.low.Name,
			PriorityType: taskPriorityFeed.low.PriorityType,
			ColorID:      seedutil.GetColor(ctx, client, colorSeed.green400.Color).ID,
		},
		{
			Name:         taskPriorityFeed.medium.Name,
			PriorityType: taskPriorityFeed.medium.PriorityType,
			ColorID:      seedutil.GetColor(ctx, client, colorSeed.orange400.Color).ID,
		},
		{
			Name:         taskPriorityFeed.high.Name,
			PriorityType: taskPriorityFeed.high.PriorityType,
			ColorID:      seedutil.GetColor(ctx, client, colorSeed.red400.Color).ID,
		},
	}
	bulk := make([]*ent.TaskPriorityCreate, len(inputs))
	for i, t := range inputs {
		bulk[i] = client.TaskPriority.Create().SetInput(t)
	}
	if _, err = client.TaskPriority.CreateBulk(bulk...).Save(ctx); err != nil {
		log.Fatalf("TaskPriority failed to seed data: %v", err)
	}
}
