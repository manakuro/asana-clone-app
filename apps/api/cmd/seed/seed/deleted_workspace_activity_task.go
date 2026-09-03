package seed

import (
	"asana-clone-app/ent"
	"context"
	"log"
)

// DeletedWorkspaceActivityTask generates activity data.
func DeletedWorkspaceActivityTask(ctx context.Context, client *ent.Client) {
	_, err := client.DeletedWorkspaceActivityTask.Delete().Exec(ctx)
	if err != nil {
		log.Fatalf("DeletedWorkspaceActivityTask failed to delete data: %v", err)
	}
}
