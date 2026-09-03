package seed

import (
	"asana-clone-app/ent"
	"asana-clone-app/ent/tasklistsortstatus"
	"context"
	"log"
)

var taskListSortStatusFeed = struct {
	none         ent.CreateTaskListSortStatusInput
	dueDate      ent.CreateTaskListSortStatusInput
	likes        ent.CreateTaskListSortStatusInput
	alphabetical ent.CreateTaskListSortStatusInput
	project      ent.CreateTaskListSortStatusInput
	assignee     ent.CreateTaskListSortStatusInput
	creationTime ent.CreateTaskListSortStatusInput
	priority     ent.CreateTaskListSortStatusInput
}{
	none:         ent.CreateTaskListSortStatusInput{Name: "None", StatusCode: tasklistsortstatus.StatusCodeNone},
	dueDate:      ent.CreateTaskListSortStatusInput{Name: "DueDate", StatusCode: tasklistsortstatus.StatusCodeDueDate},
	likes:        ent.CreateTaskListSortStatusInput{Name: "Likes", StatusCode: tasklistsortstatus.StatusCodeLikes},
	alphabetical: ent.CreateTaskListSortStatusInput{Name: "Alphabetical", StatusCode: tasklistsortstatus.StatusCodeAlphabetical},
	project:      ent.CreateTaskListSortStatusInput{Name: "Project", StatusCode: tasklistsortstatus.StatusCodeProject},
	assignee:     ent.CreateTaskListSortStatusInput{Name: "Assignee", StatusCode: tasklistsortstatus.StatusCodeAssignee},
	creationTime: ent.CreateTaskListSortStatusInput{Name: "CreationTime", StatusCode: tasklistsortstatus.StatusCodeCreationTime},
	priority:     ent.CreateTaskListSortStatusInput{Name: "Priority", StatusCode: tasklistsortstatus.StatusCodePriority},
}

// TaskListSortStatus generates task list sort status data.
func TaskListSortStatus(ctx context.Context, client *ent.Client) {
	_, err := client.TaskListSortStatus.Delete().Exec(ctx)
	if err != nil {
		log.Fatalf("TaskListSortStatus failed to delete data: %v", err)
	}

	inputs := []ent.CreateTaskListSortStatusInput{
		taskListSortStatusFeed.none,
		taskListSortStatusFeed.dueDate,
		taskListSortStatusFeed.likes,
		taskListSortStatusFeed.alphabetical,
		taskListSortStatusFeed.project,
		taskListSortStatusFeed.assignee,
		taskListSortStatusFeed.creationTime,
		taskListSortStatusFeed.priority,
	}
	bulk := make([]*ent.TaskListSortStatusCreate, len(inputs))
	for i, t := range inputs {
		bulk[i] = client.TaskListSortStatus.Create().SetInput(t)
	}
	if _, err = client.TaskListSortStatus.CreateBulk(bulk...).Save(ctx); err != nil {
		log.Fatalf("TaskListSortStatus failed to seed data: %v", err)
	}
}
