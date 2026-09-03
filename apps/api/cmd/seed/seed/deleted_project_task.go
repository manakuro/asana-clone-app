package seed

import (
	"asana-clone-app/ent"
	"context"
	"log"
)

// DeletedProjectTask generates activity data.
func DeletedProjectTask(ctx context.Context, client *ent.Client) {
	_, err := client.DeletedProjectTask.Delete().Exec(ctx)
	if err != nil {
		log.Fatalf("DeletedProjectTask failed to delete data: %v", err)
	}
}
