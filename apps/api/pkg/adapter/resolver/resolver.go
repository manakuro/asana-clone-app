package resolver

import (
	"asana-clone-app/ent"
	"asana-clone-app/graph/generated"
	"asana-clone-app/pkg/adapter/controller"
	"asana-clone-app/pkg/util/subscription"
	"sync"

	"github.com/99designs/gqlgen/graphql"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

// Resolver is a context struct.
type Resolver struct {
	client        *ent.Client
	controller    controller.Controller
	subscriptions *subscription.Subscriptions

	mutex sync.Mutex
}

// NewSchema creates NewExecutableSchema.
func NewSchema(client *ent.Client, controller controller.Controller) graphql.ExecutableSchema {
	return generated.NewExecutableSchema(generated.Config{
		Resolvers: &Resolver{
			client:     client,
			controller: controller,
			subscriptions: &subscription.Subscriptions{
				ColorUpdated:                               map[string]subscription.ColorUpdated{},
				DeletedTaskCreated:                         map[string]subscription.DeletedTaskCreated{},
				DeletedTaskUpdated:                         map[string]subscription.DeletedTaskUpdated{},
				FavoriteProjectCreated:                     map[string]subscription.FavoriteProjectCreated{},
				FavoriteProjectIDsUpdated:                  map[string]subscription.FavoriteProjectIDsUpdated{},
				FavoriteWorkspaceIDsUpdated:                map[string]subscription.FavoriteWorkspaceIDsUpdated{},
				IconUpdated:                                map[string]subscription.IconUpdated{},
				MeUpdated:                                  map[string]subscription.MeUpdated{},
				ProjectBaseColorUpdated:                    map[string]subscription.ProjectBaseColorUpdated{},
				ProjectIconUpdated:                         map[string]subscription.ProjectIconUpdated{},
				ProjectLightColorUpdated:                   map[string]subscription.ProjectLightColorUpdated{},
				ProjectTaskColumnUpdated:                   map[string]subscription.ProjectTaskColumnUpdated{},
				ProjectTaskCreated:                         map[string]subscription.ProjectTaskCreated{},
				ProjectTaskCreatedByTaskID:                 map[string]subscription.ProjectTaskCreatedByTaskID{},
				ProjectTaskDeleted:                         map[string]subscription.ProjectTaskDeleted{},
				ProjectTaskListStatusUpdated:               map[string]subscription.ProjectTaskListStatusUpdated{},
				ProjectTaskSectionCreated:                  map[string]subscription.ProjectTaskSectionCreated{},
				ProjectTaskSectionDeleted:                  map[string]subscription.ProjectTaskSectionDeleted{},
				ProjectTaskSectionDeletedAndDeleteTasks:    map[string]subscription.ProjectTaskSectionDeletedAndDeleteTasks{},
				ProjectTaskSectionDeletedAndKeepTasks:      map[string]subscription.ProjectTaskSectionDeletedAndKeepTasks{},
				ProjectTaskSectionUndeletedAndDeleteTasks:  map[string]subscription.ProjectTaskSectionUndeletedAndDeleteTasks{},
				ProjectTaskSectionUndeletedAndKeepTasks:    map[string]subscription.ProjectTaskSectionUndeletedAndKeepTasks{},
				ProjectTaskSectionUpdated:                  map[string]subscription.ProjectTaskSectionUpdated{},
				ProjectTaskUpdated:                         map[string]subscription.ProjectTaskUpdated{},
				ProjectTeammateUpdated:                     map[string]subscription.ProjectTeammateUpdated{},
				ProjectUpdated:                             map[string]subscription.ProjectUpdated{},
				TagUpdated:                                 map[string]subscription.TagUpdated{},
				TaskAssigned:                               map[string]subscription.TaskAssigned{},
				TaskCollaboratorCreated:                    map[string]subscription.TaskCollaboratorCreated{},
				TaskCollaboratorDeleted:                    map[string]subscription.TaskCollaboratorDeleted{},
				TaskCollaboratorUpdated:                    map[string]subscription.TaskCollaboratorUpdated{},
				TaskColumnUpdated:                          map[string]subscription.TaskColumnUpdated{},
				TaskDeleted:                                map[string]subscription.TaskDeleted{},
				TaskFeedCreated:                            map[string]subscription.TaskFeedCreated{},
				TaskFeedDeleted:                            map[string]subscription.TaskFeedDeleted{},
				TaskFeedLikeCreated:                        map[string]subscription.TaskFeedLikeCreated{},
				TaskFeedLikeDeleted:                        map[string]subscription.TaskFeedLikeDeleted{},
				TaskFeedUpdated:                            map[string]subscription.TaskFeedUpdated{},
				TaskFileUpdated:                            map[string]subscription.TaskFileUpdated{},
				TaskLikesCreated:                           map[string]subscription.TaskLikesCreated{},
				TaskLikesDeleted:                           map[string]subscription.TaskLikesDeleted{},
				TaskSectionUpdated:                         map[string]subscription.TaskSectionUpdated{},
				TaskTagCreated:                             map[string]subscription.TaskTagCreated{},
				TaskTagDeleted:                             map[string]subscription.TaskTagDeleted{},
				TaskTagUpdated:                             map[string]subscription.TaskTagUpdated{},
				TaskUnassigned:                             map[string]subscription.TaskUnassigned{},
				TaskUndeleted:                              map[string]subscription.TaskUndeleted{},
				TaskUpdated:                                map[string]subscription.TaskUpdated{},
				TeammateTaskColumnUpdated:                  map[string]subscription.TeammateTaskColumnUpdated{},
				TeammateTaskCreated:                        map[string]subscription.TeammateTaskCreated{},
				TeammateTaskDeleted:                        map[string]subscription.TeammateTaskDeleted{},
				TeammateTaskListStatusUpdated:              map[string]subscription.TeammateTaskListStatusUpdated{},
				TeammateTaskSectionCreated:                 map[string]subscription.TeammateTaskSectionCreated{},
				TeammateTaskSectionDeleted:                 map[string]subscription.TeammateTaskSectionDeleted{},
				TeammateTaskSectionDeletedAndDeleteTasks:   map[string]subscription.TeammateTaskSectionDeletedAndDeleteTasks{},
				TeammateTaskSectionDeletedAndKeepTasks:     map[string]subscription.TeammateTaskSectionDeletedAndKeepTasks{},
				TeammateTaskSectionUndeletedAndDeleteTasks: map[string]subscription.TeammateTaskSectionUndeletedAndDeleteTasks{},
				TeammateTaskSectionUndeletedAndKeepTasks:   map[string]subscription.TeammateTaskSectionUndeletedAndKeepTasks{},
				TeammateTaskSectionUpdated:                 map[string]subscription.TeammateTaskSectionUpdated{},
				TeammateTaskTabStatusUpdated:               map[string]subscription.TeammateTaskTabStatusUpdated{},
				TeammateTaskUpdated:                        map[string]subscription.TeammateTaskUpdated{},
				TeammateUpdated:                            map[string]subscription.TeammateUpdated{},
				TestUserUpdated:                            map[string]subscription.TestUserUpdated{},
				WorkspaceTeammateUpdated:                   map[string]subscription.WorkspaceTeammateUpdated{},
				WorkspaceUpdated:                           map[string]subscription.WorkspaceUpdated{},
			},
			mutex: sync.Mutex{},
		},
	})
}
