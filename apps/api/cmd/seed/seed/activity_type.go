package seed

import (
	"asana-clone-app/ent"
	"asana-clone-app/ent/activitytype"
	"context"
	"log"
)

var activityTypeSeed = struct {
	task      ent.CreateActivityTypeInput
	workspace ent.CreateActivityTypeInput
}{
	task:      ent.CreateActivityTypeInput{Name: "Task", TypeCode: activitytype.TypeCodeTask},
	workspace: ent.CreateActivityTypeInput{Name: "Workspace", TypeCode: activitytype.TypeCodeWorkspace},
}

// ActivityType generates activity data.
func ActivityType(ctx context.Context, client *ent.Client) {
	_, err := client.ActivityType.Delete().Exec(ctx)
	if err != nil {
		log.Fatalf("ActivityType failed to delete data: %v", err)
	}

	inputs := []ent.CreateActivityTypeInput{
		activityTypeSeed.task,
		activityTypeSeed.workspace,
	}
	bulk := make([]*ent.ActivityTypeCreate, len(inputs))
	for i, t := range inputs {
		bulk[i] = client.ActivityType.Create().SetInput(t)
	}
	if _, err = client.ActivityType.CreateBulk(bulk...).Save(ctx); err != nil {
		log.Fatalf("ActivityType failed to seed data: %v", err)
	}
}
