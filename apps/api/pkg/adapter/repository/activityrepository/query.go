package activityrepository

import (
	"asana-clone-app/ent/activitytype"
	"asana-clone-app/ent/taskactivity"
	"asana-clone-app/ent/taskactivitytask"
	"asana-clone-app/ent/workspaceactivity"
	"asana-clone-app/ent/workspaceactivitytask"
	"asana-clone-app/pkg/entity/model"
	"context"
	"log"

	"entgo.io/ent/dialect/sql"
)

func (r *activityRepository) List(ctx context.Context, where model.ActivityWhereInput) ([]*model.Activity, error) {
	db := r.client.DB()

	taskActivityTable := sql.Table(taskactivity.Table).As(taskactivity.Table)
	taskActivityTaskTable := sql.Table(taskactivitytask.Table).As(taskactivitytask.Table)
	workspaceActivityTable := sql.Table(workspaceactivity.Table).As(workspaceactivity.Table)
	workspaceActivityTaskTable := sql.Table(workspaceactivitytask.Table).As(workspaceactivitytask.Table)
	activityTypeTable := sql.Table(activitytype.Table).As(activitytype.Table)

	taskActivityTaskSelector := sql.Select().
		From(taskActivityTaskTable).
		Where(
			sql.ColumnsEQ(taskActivityTaskTable.C(taskactivitytask.FieldTaskActivityID), taskActivityTable.C(taskactivity.FieldID)),
		)

	taskActivitySelector := sql.Select(
		sql.As(taskActivityTable.C(taskactivity.FieldID), "id"),
		sql.As(activityTypeTable.C(activitytype.FieldTypeCode), "type"),
		sql.As(taskActivityTable.C(taskactivity.FieldUpdatedAt), "updated_at"),
	).
		From(taskActivityTable).
		LeftJoin(activityTypeTable).
		On(
			taskActivityTable.C(taskactivity.FieldActivityTypeID),
			activityTypeTable.C(activitytype.FieldID),
		).
		Where(
			sql.And(
				sql.EQ(taskActivityTable.C(taskactivity.FieldWorkspaceID), where.WorkspaceID),
				sql.Exists(taskActivityTaskSelector),
			),
		)

	workspaceActivityTaskSelector := sql.Select().
		From(workspaceActivityTaskTable).
		Where(
			sql.ColumnsEQ(workspaceActivityTaskTable.C(workspaceactivitytask.FieldWorkspaceActivityID), workspaceActivityTable.C(workspaceactivity.FieldID)),
		)

	workspaceActivitySelector := sql.Select(
		sql.As(workspaceActivityTable.C(workspaceactivity.FieldID), "id"),
		sql.As(activityTypeTable.C(activitytype.FieldTypeCode), "type"),
		sql.As(workspaceActivityTable.C(workspaceactivity.FieldUpdatedAt), "updated_at"),
	).
		From(workspaceActivityTable).
		LeftJoin(activityTypeTable).
		On(
			workspaceActivityTable.C(workspaceactivity.FieldActivityTypeID),
			activityTypeTable.C(activitytype.FieldID),
		).
		Where(
			sql.And(
				sql.EQ(workspaceActivityTable.C(workspaceactivity.FieldWorkspaceID), where.WorkspaceID),
				sql.Exists(workspaceActivityTaskSelector),
			),
		)

	t1 := sql.Table("t1").As("t1")
	selector := sql.Select(
		t1.C("id"),
		t1.C("type"),
		t1.C("updated_at"),
	).From(
		taskActivitySelector.Union(workspaceActivitySelector).As("t1"),
	).OrderBy(t1.C("updated_at"))

	queryString, args := selector.Query()
	rows, err := db.Query(queryString, args...)
	if err != nil {
		return nil, model.NewDBError(err)
	}

	defer rows.Close()

	var activities []*model.Activity
	for rows.Next() {
		var m model.Activity
		err = rows.Scan(&m.ID, &m.Type, &m.UpdatedAt)
		if err != nil {
			log.Fatal(err)
		}
		activities = append(activities, &m)
	}
	if rows.Err() != nil {
		return nil, model.NewDBError(err)
	}

	return activities, nil
}
