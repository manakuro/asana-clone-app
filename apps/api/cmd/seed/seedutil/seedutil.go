package seedutil

import (
	"asana-clone-app/ent"
	"asana-clone-app/ent/activitytype"
	"asana-clone-app/ent/archivedtaskactivity"
	"asana-clone-app/ent/archivedworkspaceactivity"
	"asana-clone-app/ent/color"
	"asana-clone-app/ent/filetype"
	"asana-clone-app/ent/icon"
	"asana-clone-app/ent/project"
	"asana-clone-app/ent/projectbasecolor"
	"asana-clone-app/ent/projecticon"
	"asana-clone-app/ent/projectlightcolor"
	"asana-clone-app/ent/projecttasksection"
	"asana-clone-app/ent/schema/ulid"
	"asana-clone-app/ent/tag"
	"asana-clone-app/ent/task"
	"asana-clone-app/ent/taskactivity"
	"asana-clone-app/ent/taskcolumn"
	"asana-clone-app/ent/taskfeed"
	"asana-clone-app/ent/tasklistcompletedstatus"
	"asana-clone-app/ent/tasklistsortstatus"
	"asana-clone-app/ent/taskpriority"
	"asana-clone-app/ent/teammate"
	"asana-clone-app/ent/teammatetasksection"
	"asana-clone-app/ent/testuser"
	"asana-clone-app/ent/workspace"
	"asana-clone-app/ent/workspaceactivity"
	"asana-clone-app/pkg/util/datetime"
	"context"
	"encoding/json"
	"log"
	"time"
)

// GetTeammateByEmail gets teammate by email.
func GetTeammateByEmail(ctx context.Context, client *ent.Client, email string) *ent.Teammate {
	res, err := client.Teammate.Query().Where(teammate.EmailEQ(email)).Only(ctx)
	if err != nil {
		log.Fatalf("getTeammateByEmail: failed get teammate: %v", err)
	}

	return res
}

// GetProjectByName gets project by name.
func GetProjectByName(ctx context.Context, client *ent.Client, name string) *ent.Project {
	res, err := client.Project.Query().Where(project.NameEQ(name)).Only(ctx)
	if err != nil {
		log.Fatalf("GetProjectByName: failed get project: %v", err)
	}

	return res
}

// GetColor gets color by name.
func GetColor(ctx context.Context, client *ent.Client, val string) *ent.Color {
	res, err := client.Color.Query().Where(color.ColorEQ(val)).Only(ctx)
	if err != nil {
		log.Fatalf("GetColor: failed to get color: %v", err)
	}

	return res
}

// GetIcon gets icon by name.
func GetIcon(ctx context.Context, client *ent.Client, val string) *ent.Icon {
	res, err := client.Icon.Query().Where(icon.IconEQ(val)).Only(ctx)
	if err != nil {
		log.Fatalf("GetIcon: failed to get icon: %v", err)
	}

	return res
}

// GetWorkspace gets workspace.
func GetWorkspace(ctx context.Context, client *ent.Client) *ent.Workspace {
	res, err := client.Workspace.Query().Where(workspace.NameEQ("My Workspace")).Only(ctx)
	if err != nil {
		log.Fatalf("GetWorkspace: failed get workspace: %v", err)
	}

	return res
}

// GetTestUserByName gets test user.
func GetTestUserByName(ctx context.Context, client *ent.Client, name string) *ent.TestUser {
	res, err := client.TestUser.Query().Where(testuser.NameEQ(name)).Only(ctx)
	if err != nil {
		log.Fatalf("GetTestUser: failed get test user: %v", err)
	}

	return res
}

// GetProjectBaseColorByColor gets project base color data.
func GetProjectBaseColorByColor(ctx context.Context, client *ent.Client, val string) *ent.ProjectBaseColor {
	c := GetColor(ctx, client, val)

	res, err := client.ProjectBaseColor.Query().Where(projectbasecolor.ColorID(c.ID)).Only(ctx)
	if err != nil {
		log.Fatalf("GetProjectBaseColorByColor: failed get project base color: %v", err)
	}

	return res
}

// GetProjectLightColorByColor gets project light color data.
func GetProjectLightColorByColor(ctx context.Context, client *ent.Client, val string) *ent.ProjectLightColor {
	c := GetColor(ctx, client, val)

	res, err := client.ProjectLightColor.Query().Where(projectlightcolor.ColorID(c.ID)).Only(ctx)
	if err != nil {
		log.Fatalf("GetProjectLightColorByColor: failed get project light color: %v", err)
	}

	return res
}

// GetProjectIconByIcon gets project icon data.
func GetProjectIconByIcon(ctx context.Context, client *ent.Client, val string) *ent.ProjectIcon {
	i := GetIcon(ctx, client, val)

	res, err := client.ProjectIcon.Query().Where(projecticon.IconID(i.ID)).Only(ctx)
	if err != nil {
		log.Fatalf("GetProjectIconByIcon: failed get project icon: %v", err)
	}

	return res
}

// GetTaskColumnByName gets task column data.
func GetTaskColumnByName(ctx context.Context, client *ent.Client, val string) *ent.TaskColumn {
	res, err := client.TaskColumn.Query().Where(taskcolumn.NameEQ(val)).Only(ctx)
	if err != nil {
		log.Fatalf("GetTaskColumnByName: failed get data: %v", err)
	}

	return res
}

// GetTaskListCompletedStatusByName gets task list completed status data.
func GetTaskListCompletedStatusByName(ctx context.Context, client *ent.Client, val string) *ent.TaskListCompletedStatus {
	res, err := client.TaskListCompletedStatus.Query().Where(tasklistcompletedstatus.NameEQ(val)).Only(ctx)
	if err != nil {
		log.Fatalf("GetTaskListCompletedStatusByName: failed get data: %v", err)
	}

	return res
}

// GetTaskListSortStatusByName gets task list sort status data.
func GetTaskListSortStatusByName(ctx context.Context, client *ent.Client, val string) *ent.TaskListSortStatus {
	res, err := client.TaskListSortStatus.Query().Where(tasklistsortstatus.NameEQ(val)).Only(ctx)
	if err != nil {
		log.Fatalf("GetTaskListSortStatusByName: failed get data: %v", err)
	}

	return res
}

// GetTaskPriorityByName gets task priority data.
func GetTaskPriorityByName(ctx context.Context, client *ent.Client, val string) *ent.TaskPriority {
	res, err := client.TaskPriority.Query().Where(taskpriority.NameEQ(val)).Only(ctx)
	if err != nil {
		log.Fatalf("GetTaskListSortStatusByName: failed get data: %v", err)
	}

	return res
}

// GetTaskByName gets task data.
func GetTaskByName(ctx context.Context, client *ent.Client, val string) *ent.Task {
	res, err := client.Task.Query().Where(task.NameEQ(val)).Only(ctx)
	if err != nil {
		log.Fatalf("GetTaskByName: failed get data: %v", err)
	}

	return res
}

// GetTeammateTaskSectionByName gets teammate task section data.
func GetTeammateTaskSectionByName(ctx context.Context, client *ent.Client, name string, teammateID ulid.ID) *ent.TeammateTaskSection {
	res, err := client.TeammateTaskSection.
		Query().
		Where(
			teammatetasksection.NameEQ(name),
			teammatetasksection.TeammateID(teammateID),
		).
		Only(ctx)
	if err != nil {
		log.Fatalf("GetTeammateTaskSectionByName: failed get data: %v", err)
	}

	return res
}

// GetProjectTaskSectionByName gets teammate task section data.
func GetProjectTaskSectionByName(ctx context.Context, client *ent.Client, projectID ulid.ID, val string) *ent.ProjectTaskSection {
	res, err := client.
		ProjectTaskSection.
		Query().
		Where(projecttasksection.NameEQ(val), projecttasksection.ProjectID(projectID)).
		Only(ctx)

	if err != nil {
		log.Fatalf("GetProjectTaskSectionByName: failed get data: %v", err)
	}

	return res
}

// GetTagByName gets tag data.
func GetTagByName(ctx context.Context, client *ent.Client, val string) *ent.Tag {
	res, err := client.
		Tag.
		Query().
		Where(tag.NameEQ(val)).
		Only(ctx)

	if err != nil {
		log.Fatalf("GetTagByName: failed get data: %v", err)
	}

	return res
}

// GetTaskFeeds gets task seed data.
func GetTaskFeeds(ctx context.Context, client *ent.Client, taskID ulid.ID) []*ent.TaskFeed {
	res, err := client.
		TaskFeed.
		Query().
		Where(taskfeed.TaskIDEQ(taskID)).
		All(ctx)

	if err != nil {
		log.Fatalf("GetTaskFeed: failed get data: %v", err)
	}

	return res
}

// GetFileType gets file type data.
func GetFileType(ctx context.Context, client *ent.Client, val string) *ent.FileType {
	res, err := client.
		FileType.
		Query().
		Where(filetype.NameEQ(val)).
		Only(ctx)

	if err != nil {
		log.Fatalf("GetFileType: failed get data: %v", err)
	}

	return res
}

// GetActivityType gets activity type data.
func GetActivityType(ctx context.Context, client *ent.Client, val string) *ent.ActivityType {
	res, err := client.ActivityType.Query().Where(activitytype.NameEQ(val)).Only(ctx)
	if err != nil {
		log.Fatalf("GetActivityType: failed to get data %v", err)
	}

	return res
}

// AddDate adds time.
func AddDate(date int) *time.Time {
	t := datetime.Now()
	t = t.AddDate(0, 0, date)

	return &t
}

// GetTaskActivity gets activity type data.
func GetTaskActivity(ctx context.Context, client *ent.Client, id ulid.ID) *ent.TaskActivity {
	res, err := client.TaskActivity.Query().Where(taskactivity.IDEQ(id)).Only(ctx)
	if err != nil {
		log.Fatalf("GetTaskActivity: failed to get data %v", err)
	}

	return res
}

// GetArchivedTaskActivity gets archived activity type data.
func GetArchivedTaskActivity(ctx context.Context, client *ent.Client, id ulid.ID) *ent.ArchivedTaskActivity {
	res, err := client.ArchivedTaskActivity.Query().Where(archivedtaskactivity.IDEQ(id)).Only(ctx)
	if err != nil {
		log.Fatalf("GetArchivedTaskActivity: failed to get data %v", err)
	}

	return res
}

// GetWorkspaceActivity gets workspace activity data.
func GetWorkspaceActivity(ctx context.Context, client *ent.Client, id ulid.ID) *ent.WorkspaceActivity {
	res, err := client.WorkspaceActivity.Query().Where(workspaceactivity.IDEQ(id)).Only(ctx)
	if err != nil {
		log.Fatalf("GetWorkspaceActivity: failed to get data %v", err)
	}

	return res
}

// GetArchivedWorkspaceActivity gets archived workspace activity data.
func GetArchivedWorkspaceActivity(ctx context.Context, client *ent.Client, id ulid.ID) *ent.ArchivedWorkspaceActivity {
	res, err := client.ArchivedWorkspaceActivity.Query().Where(archivedworkspaceactivity.IDEQ(id)).Only(ctx)
	if err != nil {
		log.Fatalf("GetWorkspaceActivity: failed to get data %v", err)
	}

	return res
}

// ParseDescription convert json to description object.
func ParseDescription(b []byte) map[string]interface{} {
	description := make(map[string]interface{})
	if err := json.Unmarshal(b, &description); err != nil {
		log.Fatalf("ParseDescription failed to encode json")
	}

	return description
}
