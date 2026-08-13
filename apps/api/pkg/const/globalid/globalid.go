package globalid

import (
	"fmt"
	"log"
	"project-management-demo-backend/ent/activitytype"
	"project-management-demo-backend/ent/archivedtaskactivity"
	"project-management-demo-backend/ent/archivedtaskactivitytask"
	"project-management-demo-backend/ent/archivedworkspaceactivity"
	"project-management-demo-backend/ent/archivedworkspaceactivitytask"
	"project-management-demo-backend/ent/color"
	"project-management-demo-backend/ent/deletedprojecttask"
	"project-management-demo-backend/ent/deletedtask"
	"project-management-demo-backend/ent/deletedtaskactivitytask"
	"project-management-demo-backend/ent/deletedteammatetask"
	"project-management-demo-backend/ent/deletedworkspaceactivitytask"
	"project-management-demo-backend/ent/favoriteproject"
	"project-management-demo-backend/ent/favoriteworkspace"
	"project-management-demo-backend/ent/filetype"
	"project-management-demo-backend/ent/icon"
	"project-management-demo-backend/ent/project"
	"project-management-demo-backend/ent/projectbasecolor"
	"project-management-demo-backend/ent/projecticon"
	"project-management-demo-backend/ent/projectlightcolor"
	"project-management-demo-backend/ent/projecttask"
	"project-management-demo-backend/ent/projecttaskcolumn"
	"project-management-demo-backend/ent/projecttaskliststatus"
	"project-management-demo-backend/ent/projecttasksection"
	"project-management-demo-backend/ent/projectteammate"
	"project-management-demo-backend/ent/tag"
	"project-management-demo-backend/ent/task"
	"project-management-demo-backend/ent/taskactivity"
	"project-management-demo-backend/ent/taskactivitytask"
	"project-management-demo-backend/ent/taskcollaborator"
	"project-management-demo-backend/ent/taskcolumn"
	"project-management-demo-backend/ent/taskfeed"
	"project-management-demo-backend/ent/taskfeedlike"
	"project-management-demo-backend/ent/taskfile"
	"project-management-demo-backend/ent/tasklike"
	"project-management-demo-backend/ent/tasklistcompletedstatus"
	"project-management-demo-backend/ent/tasklistsortstatus"
	"project-management-demo-backend/ent/taskpriority"
	"project-management-demo-backend/ent/tasksection"
	"project-management-demo-backend/ent/tasktag"
	"project-management-demo-backend/ent/teammate"
	"project-management-demo-backend/ent/teammatetask"
	"project-management-demo-backend/ent/teammatetaskcolumn"
	"project-management-demo-backend/ent/teammatetaskliststatus"
	"project-management-demo-backend/ent/teammatetasksection"
	"project-management-demo-backend/ent/teammatetasktabstatus"
	"project-management-demo-backend/ent/testtodo"
	"project-management-demo-backend/ent/testuser"
	"project-management-demo-backend/ent/workspace"
	"project-management-demo-backend/ent/workspaceactivity"
	"project-management-demo-backend/ent/workspaceactivitytask"
	"project-management-demo-backend/ent/workspaceteammate"
	"reflect"
)

type field struct {
	Prefix string
	Table  string
}

// GlobalIDs maps unique string to tables names.
type GlobalIDs struct {
	Color                         field
	FavoriteProject               field
	FavoriteWorkspace             field
	Icon                          field
	Project                       field
	ProjectBaseColor              field
	ProjectIcon                   field
	ProjectLightColor             field
	ProjectTeammate               field
	Teammate                      field
	TestTodo                      field
	TestUser                      field
	Workspace                     field
	WorkspaceTeammate             field
	TeammateTaskTabStatus         field
	TaskColumn                    field
	TeammateTaskColumn            field
	ProjectTaskColumn             field
	TaskSection                   field
	TaskListCompletedStatus       field
	TaskListSortStatus            field
	TeammateTaskListStatus        field
	ProjectTaskListStatus         field
	TeammateTaskSection           field
	ProjectTaskSection            field
	TaskPriority                  field
	Task                          field
	TeammateTask                  field
	ProjectTask                   field
	TaskLike                      field
	Tag                           field
	TaskTag                       field
	TaskCollaborator              field
	TaskFeed                      field
	TaskFeedLike                  field
	FileType                      field
	TaskFile                      field
	DeletedTask                   field
	ActivityType                  field
	TaskActivity                  field
	TaskActivityTask              field
	WorkspaceActivity             field
	WorkspaceActivityTask         field
	ArchivedTaskActivity          field
	ArchivedTaskActivityTask      field
	ArchivedWorkspaceActivity     field
	ArchivedWorkspaceActivityTask field
	DeletedTeammateTask           field
	DeletedProjectTask            field
	DeletedTaskActivityTask       field
	DeletedWorkspaceActivityTask  field
}

// New generates a map object that is intended to be used as global identification for node interface query.
// Prefix should maintain constrained to 3 characters for encoding the entity type.
func New() GlobalIDs {
	return GlobalIDs{
		TestUser: field{
			Prefix: "0AA",
			Table:  testuser.Table,
		},
		TestTodo: field{
			Prefix: "0AB",
			Table:  testtodo.Table,
		},
		Teammate: field{
			Prefix: "0AC",
			Table:  teammate.Table,
		},
		Workspace: field{
			Prefix: "0AD",
			Table:  workspace.Table,
		},
		Color: field{
			Prefix: "0AE",
			Table:  color.Table,
		},
		Icon: field{
			Prefix: "0AF",
			Table:  icon.Table,
		},
		Project: field{
			Prefix: "0AG",
			Table:  project.Table,
		},
		ProjectTeammate: field{
			Prefix: "0AH",
			Table:  projectteammate.Table,
		},
		ProjectBaseColor: field{
			Prefix: "0AI",
			Table:  projectbasecolor.Table,
		},
		ProjectLightColor: field{
			Prefix: "0AJ",
			Table:  projectlightcolor.Table,
		},
		ProjectIcon: field{
			Prefix: "0AK",
			Table:  projecticon.Table,
		},
		WorkspaceTeammate: field{
			Prefix: "0AL",
			Table:  workspaceteammate.Table,
		},
		FavoriteProject: field{
			Prefix: "0AM",
			Table:  favoriteproject.Table,
		},
		FavoriteWorkspace: field{
			Prefix: "0AN",
			Table:  favoriteworkspace.Table,
		},
		TeammateTaskTabStatus: field{
			Prefix: "0AO",
			Table:  teammatetasktabstatus.Table,
		},
		TaskColumn: field{
			Prefix: "0AP",
			Table:  taskcolumn.Table,
		},
		TeammateTaskColumn: field{
			Prefix: "0AQ",
			Table:  teammatetaskcolumn.Table,
		},
		ProjectTaskColumn: field{
			Prefix: "0AR",
			Table:  projecttaskcolumn.Table,
		},
		TaskSection: field{
			Prefix: "0AS",
			Table:  tasksection.Table,
		},
		TaskListCompletedStatus: field{
			Prefix: "0AT",
			Table:  tasklistcompletedstatus.Table,
		},
		TaskListSortStatus: field{
			Prefix: "0AU",
			Table:  tasklistsortstatus.Table,
		},
		TeammateTaskListStatus: field{
			Prefix: "0AV",
			Table:  teammatetaskliststatus.Table,
		},
		ProjectTaskListStatus: field{
			Prefix: "0AW",
			Table:  projecttaskliststatus.Table,
		},
		TeammateTaskSection: field{
			Prefix: "0AX",
			Table:  teammatetasksection.Table,
		},
		ProjectTaskSection: field{
			Prefix: "0AY",
			Table:  projecttasksection.Table,
		},
		TaskPriority: field{
			Prefix: "0AZ",
			Table:  taskpriority.Table,
		},
		Task: field{
			Prefix: "0BA",
			Table:  task.Table,
		},
		TeammateTask: field{
			Prefix: "0BB",
			Table:  teammatetask.Table,
		},
		ProjectTask: field{
			Prefix: "0BC",
			Table:  projecttask.Table,
		},
		TaskLike: field{
			Prefix: "0BD",
			Table:  tasklike.Table,
		},
		Tag: field{
			Prefix: "0BE",
			Table:  tag.Table,
		},
		TaskTag: field{
			Prefix: "0BF",
			Table:  tasktag.Table,
		},
		TaskCollaborator: field{
			Prefix: "0BG",
			Table:  taskcollaborator.Table,
		},
		TaskFeed: field{
			Prefix: "0BH",
			Table:  taskfeed.Table,
		},
		TaskFeedLike: field{
			Prefix: "0BI",
			Table:  taskfeedlike.Table,
		},
		FileType: field{
			Prefix: "0BJ",
			Table:  filetype.Table,
		},
		TaskFile: field{
			Prefix: "0BK",
			Table:  taskfile.Table,
		},
		DeletedTask: field{
			Prefix: "0BL",
			Table:  deletedtask.Table,
		},
		ActivityType: field{
			Prefix: "0BM",
			Table:  activitytype.Table,
		},
		TaskActivity: field{
			Prefix: "0BN",
			Table:  taskactivity.Table,
		},
		TaskActivityTask: field{
			Prefix: "0BO",
			Table:  taskactivitytask.Table,
		},
		WorkspaceActivity: field{
			Prefix: "0BP",
			Table:  workspaceactivity.Table,
		},
		WorkspaceActivityTask: field{
			Prefix: "0BQ",
			Table:  workspaceactivitytask.Table,
		},
		ArchivedTaskActivity: field{
			Prefix: "0BR",
			Table:  archivedtaskactivity.Table,
		},
		ArchivedTaskActivityTask: field{
			Prefix: "0BS",
			Table:  archivedtaskactivitytask.Table,
		},
		ArchivedWorkspaceActivity: field{
			Prefix: "0BT",
			Table:  archivedworkspaceactivity.Table,
		},
		ArchivedWorkspaceActivityTask: field{
			Prefix: "0BU",
			Table:  archivedworkspaceactivitytask.Table,
		},
		DeletedTeammateTask: field{
			Prefix: "0BV",
			Table:  deletedteammatetask.Table,
		},
		DeletedProjectTask: field{
			Prefix: "0BW",
			Table:  deletedprojecttask.Table,
		},
		DeletedTaskActivityTask: field{
			Prefix: "0BX",
			Table:  deletedtaskactivitytask.Table,
		},
		DeletedWorkspaceActivityTask: field{
			Prefix: "0BY",
			Table:  deletedworkspaceactivitytask.Table,
		},
	}
}

var globalIDs = New()
var maps = structToMap(&globalIDs)

// FindTableByID returns table name by passed id.
func (GlobalIDs) FindTableByID(id string) (string, error) {
	v, ok := maps[id]
	if !ok {
		return "", fmt.Errorf("could not map '%s' to a table name", id)
	}
	return v, nil
}

func structToMap(data *GlobalIDs) map[string]string {
	elem := reflect.ValueOf(data).Elem()
	size := elem.NumField()
	result := make(map[string]string, size)

	for i := 0; i < size; i++ {
		value := elem.Field(i).Interface()
		f, ok := value.(field)
		if !ok {
			log.Fatalf("Cannot convert struct to map")
		}
		result[f.Prefix] = f.Table
	}

	return result
}
