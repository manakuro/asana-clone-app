package repositoryutil

import (
	"project-management-demo-backend/ent"
)

// WithTaskAll eager-loads associations with task entity.
func WithTaskAll(query *ent.TaskQuery) {
	query.WithTaskFeeds()
	query.WithTaskFiles(func(tfq *ent.TaskFileQuery) {
		WithTaskFiles(tfq)
	})
	query.WithTaskFeedLikes()
	query.WithTaskPriority(func(tpq *ent.TaskPriorityQuery) {
		WithTaskPriority(tpq)
	})
	query.WithSubTasks(func(subTaskQuery *ent.TaskQuery) {
		WithSubTask(subTaskQuery)
	})
	query.WithProjectTasks(func(ptq *ent.ProjectTaskQuery) {
		ptq.WithProject(func(pq *ent.ProjectQuery) {
			WithProject(pq)
		})
	})
	query.WithTaskTags(func(ttq *ent.TaskTagQuery) {
		WithTaskTag(ttq)
	})
	query.WithTaskLikes()
	query.WithTaskCollaborators(func(tcq *ent.TaskCollaboratorQuery) {
		WithTaskCollaborator(tcq)
	})
	query.WithParentTask(func(parentTaskQuery *ent.TaskQuery) {
		WithParentTask(parentTaskQuery)
	})
}

// WithTask eager-loads associations with task entity.
func WithTask(query *ent.TaskQuery) {
	query.WithTaskFeeds()
	query.WithTaskFiles(func(tfq *ent.TaskFileQuery) {
		WithTaskFiles(tfq)
	})
	query.WithTaskFeedLikes()
	query.WithTaskPriority(func(tpq *ent.TaskPriorityQuery) {
		WithTaskPriority(tpq)
	})
	query.WithProjectTasks(func(ptq *ent.ProjectTaskQuery) {
		ptq.WithProject(func(pq *ent.ProjectQuery) {
			WithProject(pq)
		})
	})
	query.WithTaskTags(func(ttq *ent.TaskTagQuery) {
		WithTaskTag(ttq)
	})
	query.WithTaskLikes()
	query.WithTaskCollaborators(func(tcq *ent.TaskCollaboratorQuery) {
		WithTaskCollaborator(tcq)
	})
	query.WithSubTasks()
	query.WithParentTask()
}

// WithParentTask eager-loads associations with task parent entity.
func WithParentTask(query *ent.TaskQuery) {
	query.WithTaskFeeds()
	query.WithTaskFiles(func(tfq *ent.TaskFileQuery) {
		WithTaskFiles(tfq)
	})
	query.WithTaskFeedLikes()
	query.WithTaskPriority(func(tpq *ent.TaskPriorityQuery) {
		WithTaskPriority(tpq)
	})
	query.WithProjectTasks(func(ptq *ent.ProjectTaskQuery) {
		ptq.WithProject(func(pq *ent.ProjectQuery) {
			WithProject(pq)
		})
	})
	query.WithTaskTags(func(ttq *ent.TaskTagQuery) {
		WithTaskTag(ttq)
	})
	query.WithTaskLikes()
	query.WithTaskCollaborators(func(tcq *ent.TaskCollaboratorQuery) {
		WithTaskCollaborator(tcq)
	})
}

// WithSubTask eager-loads associations with subtask entity.
func WithSubTask(query *ent.TaskQuery) {
	query.WithTaskFeeds()
	query.WithTaskFeedLikes()
	query.WithTaskPriority(func(tpq *ent.TaskPriorityQuery) {
		WithTaskPriority(tpq)
	})
	query.WithProjectTasks(func(ptq *ent.ProjectTaskQuery) {
		ptq.WithProject(func(pq *ent.ProjectQuery) {
			WithProject(pq)
		})
	})
	query.WithTaskTags(func(ttq *ent.TaskTagQuery) {
		WithTaskTag(ttq)
	})
	query.WithTaskLikes()
}

// WithTaskFiles eager-loads association with task files collaborators.
func WithTaskFiles(query *ent.TaskFileQuery) {
	query.WithFileType()
}

// WithTaskPriority eager-loads associations with task priority entity.
func WithTaskPriority(query *ent.TaskPriorityQuery) {
	query.WithColor()
}

// WithProject eager-loads association with project.
func WithProject(query *ent.ProjectQuery) {
	query.WithProjectTeammates(func(ptq *ent.ProjectTeammateQuery) {
		ptq.WithTeammate()
	})
}

// WithTaskCollaborator eager-loads association with task collaborators.
func WithTaskCollaborator(query *ent.TaskCollaboratorQuery) {
	query.WithTeammate()
}

// WithTaskTag eager-loads associations with task tag entity.
func WithTaskTag(query *ent.TaskTagQuery) {
	query.WithTag(func(tq *ent.TagQuery) {
		WithTag(tq)
	})
}

// WithTag eager-loads associations with tag.
func WithTag(query *ent.TagQuery) {
	query.WithColor()
}

// WithProjectTask eager-loads association with project task.
func WithProjectTask(query *ent.ProjectTaskQuery) {
	query.WithTask(func(tq *ent.TaskQuery) {
		WithTask(tq)
	})
	//query.WithProject(func(pq *ent.ProjectQuery) {
	//	WithProject(pq)
	//})
}

// WithProjectTeammate eager-loads associations with project teammate entity.
func WithProjectTeammate(query *ent.ProjectTeammateQuery) {
	query.WithTeammate()
}

// WithProjectTasks eager-loads associations with project task entity.
func WithProjectTasks(query *ent.ProjectTaskQuery) {
	query.WithProject(func(pq *ent.ProjectQuery) {
		WithProject(pq)
	})
}
