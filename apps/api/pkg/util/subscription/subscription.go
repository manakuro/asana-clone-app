package subscription

import (
	"asana-clone-app/ent"
	"asana-clone-app/pkg/entity/model"

	"github.com/thanhpk/randstr"
)

// TestUserUpdated is a channel for subscription.
type TestUserUpdated struct {
	ID model.ID
	Ch chan *ent.TestUser
}

// TeammateUpdated is a channel for subscription.
type TeammateUpdated struct {
	ID        model.ID
	RequestID string
	Ch        chan *ent.Teammate
}

// WorkspaceUpdated is a channel for subscription.
type WorkspaceUpdated struct {
	ID        model.ID
	RequestID string
	Ch        chan *ent.Workspace
}

// ColorUpdated is a channel for subscription.
type ColorUpdated struct {
	ID        model.ID
	RequestID string
	Ch        chan *ent.Color
}

// IconUpdated is a channel for subscription.
type IconUpdated struct {
	ID        model.ID
	RequestID string
	Ch        chan *ent.Icon
}

// ProjectUpdated is a channel for subscription.
type ProjectUpdated struct {
	WorkspaceID model.ID
	RequestID   string
	Ch          chan *ent.Project
}

// ProjectTeammateUpdated is a channel for subscription.
type ProjectTeammateUpdated struct {
	ID        model.ID
	RequestID string
	Ch        chan *ent.ProjectTeammate
}

// ProjectBaseColorUpdated is a channel for subscription.
type ProjectBaseColorUpdated struct {
	ID        model.ID
	RequestID string
	Ch        chan *ent.ProjectBaseColor
}

// ProjectLightColorUpdated is a channel for subscription.
type ProjectLightColorUpdated struct {
	ID        model.ID
	RequestID string
	Ch        chan *ent.ProjectLightColor
}

// ProjectIconUpdated is a channel for subscription.
type ProjectIconUpdated struct {
	ID        model.ID
	RequestID string
	Ch        chan *ent.ProjectIcon
}

// MeUpdated is a channel for subscription.
type MeUpdated struct {
	ID        model.ID
	RequestID string
	Ch        chan *model.Me
}

// WorkspaceTeammateUpdated is a channel for subscription.
type WorkspaceTeammateUpdated struct {
	ID        model.ID
	RequestID string
	Ch        chan *model.WorkspaceTeammate
}

// FavoriteProjectCreated is a channel for subscription.
type FavoriteProjectCreated struct {
	TeammateID model.ID
	RequestID  string
	Ch         chan *model.FavoriteProject
}

// FavoriteProjectIDsUpdated is a channel for subscription.
type FavoriteProjectIDsUpdated struct {
	TeammateID model.ID
	RequestID  string
	Ch         chan []model.ID
}

// FavoriteWorkspaceIDsUpdated is a channel for subscription.
type FavoriteWorkspaceIDsUpdated struct {
	TeammateID model.ID
	RequestID  string
	Ch         chan []model.ID
}

// TeammateTaskTabStatusUpdated is a channel for subscription.
type TeammateTaskTabStatusUpdated struct {
	ID        model.ID
	RequestID string
	Ch        chan *model.TeammateTaskTabStatus
}

// TaskColumnUpdated is a channel for subscription.
type TaskColumnUpdated struct {
	ID        model.ID
	RequestID string
	Ch        chan *model.TaskColumn
}

// TeammateTaskColumnUpdated is a channel for subscription.
type TeammateTaskColumnUpdated struct {
	ID        model.ID
	RequestID string
	Ch        chan *model.TeammateTaskColumn
}

// ProjectTaskColumnUpdated is a channel for subscription.
type ProjectTaskColumnUpdated struct {
	ID        model.ID
	RequestID string
	Ch        chan *model.ProjectTaskColumn
}

// TaskSectionUpdated is a channel for subscription.
type TaskSectionUpdated struct {
	ID        model.ID
	RequestID string
	Ch        chan *model.TaskSection
}

// TeammateTaskListStatusUpdated is a channel for subscription.
type TeammateTaskListStatusUpdated struct {
	ID        model.ID
	RequestID string
	Ch        chan *model.TeammateTaskListStatus
}

// ProjectTaskListStatusUpdated is a channel for subscription.
type ProjectTaskListStatusUpdated struct {
	ID        model.ID
	RequestID string
	Ch        chan *model.ProjectTaskListStatus
}

// TeammateTaskSectionUpdated is a channel for subscription.
type TeammateTaskSectionUpdated struct {
	TeammateID  model.ID
	WorkspaceID model.ID
	RequestID   string
	Ch          chan *model.TeammateTaskSection
}

// TeammateTaskSectionCreated is a channel for subscription.
type TeammateTaskSectionCreated struct {
	TeammateID  model.ID
	WorkspaceID model.ID
	RequestID   string
	Ch          chan *model.TeammateTaskSection
}

// TeammateTaskSectionDeleted is a channel for subscription.
type TeammateTaskSectionDeleted struct {
	TeammateID  model.ID
	WorkspaceID model.ID
	RequestID   string
	Ch          chan *model.TeammateTaskSection
}

// TeammateTaskSectionDeletedAndKeepTasks is a channel for subscription.
type TeammateTaskSectionDeletedAndKeepTasks struct {
	TeammateID  model.ID
	WorkspaceID model.ID
	RequestID   string
	Ch          chan *model.DeleteTeammateTaskSectionAndKeepTasksPayload
}

// TeammateTaskSectionDeletedAndDeleteTasks is a channel for subscription.
type TeammateTaskSectionDeletedAndDeleteTasks struct {
	TeammateID  model.ID
	WorkspaceID model.ID
	RequestID   string
	Ch          chan *model.DeleteTeammateTaskSectionAndDeleteTasksPayload
}

// TeammateTaskSectionUndeletedAndKeepTasks is a channel for subscription.
type TeammateTaskSectionUndeletedAndKeepTasks struct {
	TeammateID  model.ID
	WorkspaceID model.ID
	RequestID   string
	Ch          chan *model.UndeleteTeammateTaskSectionAndKeepTasksPayload
}

// TeammateTaskSectionUndeletedAndDeleteTasks is a channel for subscription.
type TeammateTaskSectionUndeletedAndDeleteTasks struct {
	TeammateID  model.ID
	WorkspaceID model.ID
	RequestID   string
	Ch          chan *model.UndeleteTeammateTaskSectionAndDeleteTasksPayload
}

// ProjectTaskSectionUpdated is a channel for subscription.
type ProjectTaskSectionUpdated struct {
	WorkspaceID model.ID
	RequestID   string
	Ch          chan *model.ProjectTaskSection
}

// ProjectTaskSectionCreated is a channel for subscription.
type ProjectTaskSectionCreated struct {
	WorkspaceID model.ID
	RequestID   string
	Ch          chan *model.ProjectTaskSection
}

// ProjectTaskSectionDeleted is a channel for subscription.
type ProjectTaskSectionDeleted struct {
	WorkspaceID model.ID
	RequestID   string
	Ch          chan *model.ProjectTaskSection
}

// ProjectTaskSectionDeletedAndKeepTasks is a channel for subscription.
type ProjectTaskSectionDeletedAndKeepTasks struct {
	WorkspaceID model.ID
	RequestID   string
	Ch          chan *model.DeleteProjectTaskSectionAndKeepTasksPayload
}

// ProjectTaskSectionDeletedAndDeleteTasks is a channel for subscription.
type ProjectTaskSectionDeletedAndDeleteTasks struct {
	WorkspaceID model.ID
	RequestID   string
	Ch          chan *model.DeleteProjectTaskSectionAndDeleteTasksPayload
}

// ProjectTaskSectionUndeletedAndKeepTasks is a channel for subscription.
type ProjectTaskSectionUndeletedAndKeepTasks struct {
	WorkspaceID model.ID
	RequestID   string
	Ch          chan *model.UndeleteProjectTaskSectionAndKeepTasksPayload
}

// ProjectTaskSectionUndeletedAndDeleteTasks is a channel for subscription.
type ProjectTaskSectionUndeletedAndDeleteTasks struct {
	WorkspaceID model.ID
	RequestID   string
	Ch          chan *model.UndeleteProjectTaskSectionAndDeleteTasksPayload
}

// TaskUpdated is a channel for subscription.
type TaskUpdated struct {
	WorkspaceID model.ID
	RequestID   string
	Ch          chan *model.Task
}

// TaskDeleted is a channel for subscription.
type TaskDeleted struct {
	WorkspaceID model.ID
	RequestID   string
	Ch          chan *model.DeleteTaskPayload
}

// TaskUndeleted is a channel for subscription.
type TaskUndeleted struct {
	WorkspaceID model.ID
	RequestID   string
	Ch          chan *model.UndeleteTaskPayload
}

// TaskAssigned is a channel for subscription.
type TaskAssigned struct {
	WorkspaceID model.ID
	RequestID   string
	Ch          chan *model.AssignTaskPayload
}

// TaskUnassigned is a channel for subscription.
type TaskUnassigned struct {
	WorkspaceID model.ID
	RequestID   string
	Ch          chan *model.UnassignTaskPayload
}

// TeammateTaskUpdated is a channel for subscription.
type TeammateTaskUpdated struct {
	TeammateID  model.ID
	WorkspaceID model.ID
	RequestID   string
	Ch          chan *model.TeammateTask
}

// TeammateTaskCreated is a channel for subscription.
type TeammateTaskCreated struct {
	TeammateID  model.ID
	WorkspaceID model.ID
	RequestID   string
	Ch          chan *model.TeammateTask
}

// TeammateTaskDeleted is a channel for subscription.
type TeammateTaskDeleted struct {
	TeammateID  model.ID
	WorkspaceID model.ID
	RequestID   string
	Ch          chan *model.TeammateTask
}

// ProjectTaskUpdated is a channel for subscription.
type ProjectTaskUpdated struct {
	WorkspaceID model.ID
	RequestID   string
	Ch          chan *model.ProjectTask
}

// ProjectTaskCreated is a channel for subscription.
type ProjectTaskCreated struct {
	WorkspaceID model.ID
	RequestID   string
	Ch          chan *model.ProjectTask
}

// ProjectTaskDeleted is a channel for subscription.
type ProjectTaskDeleted struct {
	WorkspaceID model.ID
	RequestID   string
	Ch          chan *model.ProjectTask
}

// ProjectTaskCreatedByTaskID is a channel for subscription.
type ProjectTaskCreatedByTaskID struct {
	WorkspaceID model.ID
	RequestID   string
	Ch          chan *model.ProjectTask
}

// TaskLikesCreated is a channel for subscription.
type TaskLikesCreated struct {
	WorkspaceID model.ID
	RequestID   string
	Ch          chan *model.TaskLike
}

// TaskLikesDeleted is a channel for subscription.
type TaskLikesDeleted struct {
	WorkspaceID model.ID
	RequestID   string
	Ch          chan *model.TaskLike
}

// TagUpdated is a channel for subscription.
type TagUpdated struct {
	ID        model.ID
	RequestID string
	Ch        chan *model.Tag
}

// TaskTagUpdated is a channel for subscription.
type TaskTagUpdated struct {
	TaskID    model.ID
	RequestID string
	Ch        chan []*model.TaskTag
}

// TaskTagCreated is a channel for subscription.
type TaskTagCreated struct {
	WorkspaceID model.ID
	RequestID   string
	Ch          chan *model.TaskTag
}

// TaskTagDeleted is a channel for subscription.
type TaskTagDeleted struct {
	WorkspaceID model.ID
	RequestID   string
	Ch          chan *model.TaskTag
}

// TaskCollaboratorUpdated is a channel for subscription.
type TaskCollaboratorUpdated struct {
	WorkspaceID model.ID
	RequestID   string
	Ch          chan *model.TaskCollaborator
}

// TaskCollaboratorCreated is a channel for subscription.
type TaskCollaboratorCreated struct {
	WorkspaceID model.ID
	RequestID   string
	Ch          chan *model.TaskCollaborator
}

// TaskCollaboratorDeleted is a channel for subscription.
type TaskCollaboratorDeleted struct {
	WorkspaceID model.ID
	RequestID   string
	Ch          chan *model.TaskCollaborator
}

// TaskFeedUpdated is a channel for subscription.
type TaskFeedUpdated struct {
	WorkspaceID model.ID
	RequestID   string
	Ch          chan *model.TaskFeed
}

// TaskFeedCreated is a channel for subscription.
type TaskFeedCreated struct {
	WorkspaceID model.ID
	RequestID   string
	Ch          chan *model.TaskFeed
}

// TaskFeedDeleted is a channel for subscription.
type TaskFeedDeleted struct {
	WorkspaceID model.ID
	RequestID   string
	Ch          chan *model.DeleteTaskFeedInputPayload
}

// TaskFeedLikeCreated is a channel for subscription.
type TaskFeedLikeCreated struct {
	WorkspaceID model.ID
	RequestID   string
	Ch          chan *model.TaskFeedLike
}

// TaskFeedLikeDeleted is a channel for subscription.
type TaskFeedLikeDeleted struct {
	WorkspaceID model.ID
	RequestID   string
	Ch          chan *model.TaskFeedLike
}

// TaskFileUpdated is a channel for subscription.
type TaskFileUpdated struct {
	ID        model.ID
	RequestID string
	Ch        chan *ent.TaskFile
}

// DeletedTaskUpdated is a channel for subscription.
type DeletedTaskUpdated struct {
	ID        model.ID
	RequestID string
	Ch        chan *ent.DeletedTask
}

// DeletedTaskCreated is a channel for subscription.
type DeletedTaskCreated struct {
	WorkspaceID model.ID
	RequestID   string
	Ch          chan *ent.DeletedTask
}

// Subscriptions hold an id and a channel of subscription.
type Subscriptions struct {
	ColorUpdated                               map[string]ColorUpdated
	DeletedTaskCreated                         map[string]DeletedTaskCreated
	DeletedTaskUpdated                         map[string]DeletedTaskUpdated
	FavoriteProjectCreated                     map[string]FavoriteProjectCreated
	FavoriteProjectIDsUpdated                  map[string]FavoriteProjectIDsUpdated
	FavoriteWorkspaceIDsUpdated                map[string]FavoriteWorkspaceIDsUpdated
	IconUpdated                                map[string]IconUpdated
	MeUpdated                                  map[string]MeUpdated
	ProjectBaseColorUpdated                    map[string]ProjectBaseColorUpdated
	ProjectIconUpdated                         map[string]ProjectIconUpdated
	ProjectLightColorUpdated                   map[string]ProjectLightColorUpdated
	ProjectTaskColumnUpdated                   map[string]ProjectTaskColumnUpdated
	ProjectTaskCreated                         map[string]ProjectTaskCreated
	ProjectTaskCreatedByTaskID                 map[string]ProjectTaskCreatedByTaskID
	ProjectTaskDeleted                         map[string]ProjectTaskDeleted
	ProjectTaskListStatusUpdated               map[string]ProjectTaskListStatusUpdated
	ProjectTaskSectionCreated                  map[string]ProjectTaskSectionCreated
	ProjectTaskSectionDeleted                  map[string]ProjectTaskSectionDeleted
	ProjectTaskSectionDeletedAndDeleteTasks    map[string]ProjectTaskSectionDeletedAndDeleteTasks
	ProjectTaskSectionDeletedAndKeepTasks      map[string]ProjectTaskSectionDeletedAndKeepTasks
	ProjectTaskSectionUndeletedAndDeleteTasks  map[string]ProjectTaskSectionUndeletedAndDeleteTasks
	ProjectTaskSectionUndeletedAndKeepTasks    map[string]ProjectTaskSectionUndeletedAndKeepTasks
	ProjectTaskSectionUpdated                  map[string]ProjectTaskSectionUpdated
	ProjectTaskUpdated                         map[string]ProjectTaskUpdated
	ProjectTeammateUpdated                     map[string]ProjectTeammateUpdated
	ProjectUpdated                             map[string]ProjectUpdated
	TagUpdated                                 map[string]TagUpdated
	TaskAssigned                               map[string]TaskAssigned
	TaskCollaboratorUpdated                    map[string]TaskCollaboratorUpdated
	TaskCollaboratorCreated                    map[string]TaskCollaboratorCreated
	TaskCollaboratorDeleted                    map[string]TaskCollaboratorDeleted
	TaskColumnUpdated                          map[string]TaskColumnUpdated
	TaskDeleted                                map[string]TaskDeleted
	TaskFeedCreated                            map[string]TaskFeedCreated
	TaskFeedDeleted                            map[string]TaskFeedDeleted
	TaskFeedLikeCreated                        map[string]TaskFeedLikeCreated
	TaskFeedLikeDeleted                        map[string]TaskFeedLikeDeleted
	TaskFeedUpdated                            map[string]TaskFeedUpdated
	TaskFileUpdated                            map[string]TaskFileUpdated
	TaskLikesCreated                           map[string]TaskLikesCreated
	TaskLikesDeleted                           map[string]TaskLikesDeleted
	TaskSectionUpdated                         map[string]TaskSectionUpdated
	TaskTagCreated                             map[string]TaskTagCreated
	TaskTagDeleted                             map[string]TaskTagDeleted
	TaskTagUpdated                             map[string]TaskTagUpdated
	TaskUnassigned                             map[string]TaskUnassigned
	TaskUndeleted                              map[string]TaskUndeleted
	TaskUpdated                                map[string]TaskUpdated
	TeammateTaskColumnUpdated                  map[string]TeammateTaskColumnUpdated
	TeammateTaskCreated                        map[string]TeammateTaskCreated
	TeammateTaskDeleted                        map[string]TeammateTaskDeleted
	TeammateTaskListStatusUpdated              map[string]TeammateTaskListStatusUpdated
	TeammateTaskSectionCreated                 map[string]TeammateTaskSectionCreated
	TeammateTaskSectionDeleted                 map[string]TeammateTaskSectionDeleted
	TeammateTaskSectionDeletedAndDeleteTasks   map[string]TeammateTaskSectionDeletedAndDeleteTasks
	TeammateTaskSectionDeletedAndKeepTasks     map[string]TeammateTaskSectionDeletedAndKeepTasks
	TeammateTaskSectionUndeletedAndDeleteTasks map[string]TeammateTaskSectionUndeletedAndDeleteTasks
	TeammateTaskSectionUndeletedAndKeepTasks   map[string]TeammateTaskSectionUndeletedAndKeepTasks
	TeammateTaskSectionUpdated                 map[string]TeammateTaskSectionUpdated
	TeammateTaskTabStatusUpdated               map[string]TeammateTaskTabStatusUpdated
	TeammateTaskUpdated                        map[string]TeammateTaskUpdated
	TeammateUpdated                            map[string]TeammateUpdated
	TestUserUpdated                            map[string]TestUserUpdated
	WorkspaceTeammateUpdated                   map[string]WorkspaceTeammateUpdated
	WorkspaceUpdated                           map[string]WorkspaceUpdated
}

// NewKey generates a random hex string with length of 16.
func NewKey() string {
	return randstr.Hex(16)
}
