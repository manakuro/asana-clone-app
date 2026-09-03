package seed

import (
	"asana-clone-app/ent"
	"context"
	"log"
)

type taskSectionSeedField struct {
	name string
}

var taskSectionSeed = struct {
	backlog    taskSectionSeedField
	ready      taskSectionSeedField
	inProgress taskSectionSeedField
	done       taskSectionSeedField
}{
	backlog:    taskSectionSeedField{name: "Backlog"},
	ready:      taskSectionSeedField{name: "Ready"},
	inProgress: taskSectionSeedField{name: "In Progress"},
	done:       taskSectionSeedField{name: "Done"},
}

// TaskSection generates task sections data.
func TaskSection(ctx context.Context, client *ent.Client) {
	_, err := client.TaskSection.Delete().Exec(ctx)
	if err != nil {
		log.Fatalf("TaskSection failed to delete data: %v", err)
	}

	inputs := []ent.CreateTaskSectionInput{
		{
			Name: taskSectionSeed.backlog.name,
		},
		{
			Name: taskSectionSeed.ready.name,
		},
		{
			Name: taskSectionSeed.inProgress.name,
		},
		{
			Name: taskSectionSeed.done.name,
		},
	}
	bulk := make([]*ent.TaskSectionCreate, len(inputs))
	for i, t := range inputs {
		bulk[i] = client.TaskSection.Create().SetInput(t)
	}
	if _, err = client.TaskSection.CreateBulk(bulk...).Save(ctx); err != nil {
		log.Fatalf("TaskSection failed to seed data: %v", err)
	}
}
