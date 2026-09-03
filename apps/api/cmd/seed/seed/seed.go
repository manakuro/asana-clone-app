package seed

import (
	"asana-clone-app/ent"
	"asana-clone-app/pkg/infrastructure/datastore"
	"context"
	"log"
)

// Seed truncate table and generates new data.
func Seed() {
	client := newDBClient()
	defer client.Close()

	ctx := context.Background()

	client.DisableForeignKeyChecks()
	client.DisableSQLSafeUpdates()

	Color(ctx, client)
	Icon(ctx, client)
	FileType(ctx, client)
	Teammate(ctx, client)
	Workspace(ctx, client)
	ProjectBaseColor(ctx, client)
	ProjectLightColor(ctx, client)
	ProjectIcon(ctx, client)
	Project(ctx, client)
	ProjectTeammate(ctx, client)
	WorkspaceTeammate(ctx, client)
	TaskColumn(ctx, client)
	TaskListCompletedStatus(ctx, client)
	TaskListSortStatus(ctx, client)
	TaskSection(ctx, client)
	TaskPriority(ctx, client)
	Tag(ctx, client)

	Task(ctx, client)
	TeammateTaskSection(ctx, client)
	TeammateTask(ctx, client)
	ProjectTaskSection(ctx, client)
	ProjectTask(ctx, client)

	TaskLike(ctx, client)
	TaskTag(ctx, client)
	TaskCollaborator(ctx, client)
	TaskFeed(ctx, client)
	TaskFeedLike(ctx, client)
	TaskFile(ctx, client)

	FavoriteProject(ctx, client)
	FavoriteWorkspace(ctx, client)
	TeammateTaskTabStatus(ctx, client)
	TeammateTaskColumn(ctx, client)
	TeammateTaskListStatus(ctx, client)
	ProjectTaskColumn(ctx, client)
	ProjectTaskListStatus(ctx, client)

	ActivityType(ctx, client)
	TaskActivity(ctx, client)
	TaskActivityTask(ctx, client)
	WorkspaceActivity(ctx, client)
	WorkspaceActivityTask(ctx, client)

	ArchivedTaskActivity(ctx, client)
	ArchivedTaskActivityTask(ctx, client)
	ArchivedWorkspaceActivity(ctx, client)
	ArchivedWorkspaceActivityTask(ctx, client)

	DeletedTask(ctx, client)
	DeletedTeammateTask(ctx, client)
	DeletedProjectTask(ctx, client)
	DeletedTaskActivityTask(ctx, client)
	DeletedWorkspaceActivityTask(ctx, client)

	TestUser(ctx, client)
	TestTodo(ctx, client)

	client.EnableForeignKeyChecks()
}

func newDBClient() *ent.Client {
	client, err := datastore.NewClient(datastore.NewClientOptions{})
	if err != nil {
		log.Fatalf("failed opening mysql client: %v", err)
	}

	return client
}
