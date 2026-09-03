package mentionrepository

import (
	"asana-clone-app/ent/project"
	"asana-clone-app/ent/projecttask"
	"asana-clone-app/ent/projectteammate"
	"asana-clone-app/ent/task"
	"asana-clone-app/ent/teammate"
	"asana-clone-app/ent/workspace"
	"asana-clone-app/pkg/entity/model"
	"context"
	"log"

	"entgo.io/ent/dialect/sql"
)

func (r *mentionRepository) List(ctx context.Context, where model.MentionWhereInput) ([]*model.Mention, error) {
	db := r.client.DB()

	projectTable := sql.Table(project.Table).As(project.Table)
	projectTeammateTable := sql.Table(projectteammate.Table).As(projectteammate.Table)
	teammateTable := sql.Table(teammate.Table).As(teammate.Table)
	workspaceTable := sql.Table(workspace.Table).As(workspace.Table)
	projectTaskTable := sql.Table(projecttask.Table).As(projecttask.Table)
	taskTable := sql.Table(task.Table).As(task.Table)

	teammatesSelector := sql.Select(
		sql.As(teammateTable.C(teammate.FieldID), "id"),
		sql.As(teammateTable.C(teammate.FieldName), "title"),
		sql.As(teammateTable.C(teammate.FieldName), "subtitle"),
		sql.As(teammateTable.C(teammate.FieldEmail), "text"),
		"\"\" as `href`",
		"false as `completed`",
		"1 as `type`",
		sql.As("\"\"", "projectId"),
	).From(projectTeammateTable).Join(teammateTable).On(
		projectTeammateTable.C(projectteammate.FieldTeammateID),
		teammateTable.C(teammate.FieldID),
	).Join(projectTable).On(
		projectTeammateTable.C(projectteammate.FieldProjectID),
		projectTable.C(project.FieldID),
	).Where(sql.EQ(projectTable.C(project.FieldWorkspaceID), where.WorkspaceID))

	workspaceSelector := sql.Select(
		sql.As(workspaceTable.C(workspace.FieldID), "id"),
		sql.As(workspaceTable.C(workspace.FieldName), "title"),
		sql.As("\"\"", "subtitle"),
		sql.As(workspaceTable.C(workspace.FieldName), "text"),
		"\"\" as `href`",
		"false as `completed`",
		"4 as `type`",
		sql.As("\"\"", "projectId"),
	).From(workspaceTable).Where(sql.EQ(workspaceTable.C(workspace.FieldID), where.WorkspaceID))

	projectSelector := sql.Select(
		sql.As(projectTable.C(project.FieldID), "id"),
		sql.As(projectTable.C(project.FieldName), "title"),
		sql.As("\"\"", "subtitle"),
		sql.As(projectTable.C(project.FieldName), "text"),
		"\"\" as `href`",
		"false as `completed`",
		"3 as `type`",
		sql.As(projectTable.C(project.FieldID), "projectId"),
	).From(projectTable).Where(sql.EQ(projectTable.C(project.FieldWorkspaceID), where.WorkspaceID))

	projectTaskSelector := sql.Select(
		sql.As(projectTaskTable.C(projecttask.FieldID), "id"),
		sql.As(taskTable.C(task.FieldName), "title"),
		sql.As(projectTable.C(project.FieldName), "subtitle"),
		sql.As(taskTable.C(task.FieldName), "text"),
		"\"\" as `href`",
		sql.As(taskTable.C(task.FieldCompleted), "completed"),
		"2 as `type`",
		sql.As(projectTable.C(project.FieldID), "projectId"),
	).From(projectTaskTable).Join(projectTable).On(
		projectTaskTable.C(projecttask.FieldProjectID),
		projectTable.C(project.FieldID),
	).Join(taskTable).On(
		projectTaskTable.C(projecttask.FieldTaskID),
		taskTable.C(task.FieldID),
	).Where(sql.EQ(projectTable.C(project.FieldWorkspaceID), where.WorkspaceID))

	t1 := sql.Table("t1").As("t1")
	selector := sql.Select(
		t1.C("id"),
		t1.C("title"),
		t1.C("subtitle"),
		t1.C("text"),
		t1.C("href"),
		t1.C("completed"),
		t1.C("type"),
		t1.C("projectId"),
	).
		From(
			teammatesSelector.
				Union(workspaceSelector).
				Union(projectSelector).
				Union(projectTaskSelector).As("t1"),
		).
		Where(sql.ContainsFold(t1.C("text"), where.Query)).
		Limit(10)

	limit := where.Limit
	if limit != nil {
		selector.Limit(*limit)
	}

	queryString, args := selector.Query()
	rows, err := db.Query(queryString, args...)
	if err != nil {
		return nil, model.NewDBError(err)
	}

	defer rows.Close()

	var mentions []*model.Mention
	for rows.Next() {
		var m model.Mention
		err = rows.Scan(&m.ID, &m.Title, &m.Subtitle, &m.Text, &m.Href, &m.Completed, &m.Type, &m.ProjectID)
		if err != nil {
			log.Fatal(err)
		}
		mentions = append(mentions, &m)
	}
	if rows.Err() != nil {
		return nil, model.NewDBError(err)
	}

	return mentions, nil
}
