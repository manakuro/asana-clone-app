package seed

import (
	"asana-clone-app/ent"
	"context"
	"log"
)

// DeletedTaskActivityTask generates activity data.
func DeletedTaskActivityTask(ctx context.Context, client *ent.Client) {
	_, err := client.DeletedTaskActivityTask.Delete().Exec(ctx)
	if err != nil {
		log.Fatalf("DeletedTaskActivityTask failed to delete data: %v", err)
	}
}
