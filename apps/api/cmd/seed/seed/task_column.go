package seed

import (
	"asana-clone-app/ent"
	"asana-clone-app/ent/taskcolumn"
	"context"
	"log"
)

var taskColumnFeed = struct {
	taskName ent.CreateTaskColumnInput
	assignee ent.CreateTaskColumnInput
	dueDate  ent.CreateTaskColumnInput
	project  ent.CreateTaskColumnInput
	projects ent.CreateTaskColumnInput
	priority ent.CreateTaskColumnInput
	tags     ent.CreateTaskColumnInput
	custom   ent.CreateTaskColumnInput
}{
	taskName: ent.CreateTaskColumnInput{Name: "Task Name", Type: taskcolumn.TypeTaskName},
	assignee: ent.CreateTaskColumnInput{Name: "Assignee", Type: taskcolumn.TypeAssignee},
	dueDate:  ent.CreateTaskColumnInput{Name: "Due Date", Type: taskcolumn.TypeDueDate},
	project:  ent.CreateTaskColumnInput{Name: "Project", Type: taskcolumn.TypeProject},
	projects: ent.CreateTaskColumnInput{Name: "Projects", Type: taskcolumn.TypeProjects},
	priority: ent.CreateTaskColumnInput{Name: "Priority", Type: taskcolumn.TypePriority},
	tags:     ent.CreateTaskColumnInput{Name: "Tags", Type: taskcolumn.TypeTags},
	custom:   ent.CreateTaskColumnInput{Name: "Custom", Type: taskcolumn.TypeCustom},
}

// TaskColumn generates task column data.
func TaskColumn(ctx context.Context, client *ent.Client) {
	_, err := client.TaskColumn.Delete().Exec(ctx)
	if err != nil {
		log.Fatalf("TaskColumn failed to delete data: %v", err)
	}

	inputs := []ent.CreateTaskColumnInput{
		taskColumnFeed.taskName,
		taskColumnFeed.assignee,
		taskColumnFeed.dueDate,
		taskColumnFeed.project,
		taskColumnFeed.projects,
		taskColumnFeed.priority,
		taskColumnFeed.tags,
		taskColumnFeed.custom,
	}
	bulk := make([]*ent.TaskColumnCreate, len(inputs))
	for i, t := range inputs {
		bulk[i] = client.TaskColumn.Create().SetInput(t)
	}
	if _, err = client.TaskColumn.CreateBulk(bulk...).Save(ctx); err != nil {
		log.Fatalf("TaskColumn failed to seed data: %v", err)
	}
}
