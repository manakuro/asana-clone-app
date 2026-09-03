package seed

import (
	"asana-clone-app/ent"
	"context"
	"log"
)

// DeletedTeammateTask generates activity data.
func DeletedTeammateTask(ctx context.Context, client *ent.Client) {
	_, err := client.DeletedTeammateTask.Delete().Exec(ctx)
	if err != nil {
		log.Fatalf("DeletedTeammateTask failed to delete data: %v", err)
	}
}
