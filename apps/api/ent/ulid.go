package ent

import (
	"asana-clone-app/ent/schema/ulid"
	"asana-clone-app/pkg/const/globalid"
	"context"
	"fmt"
)

var globalIDs = globalid.New()

// IDToType maps an ulid.ID to the underlying table.
func IDToType(ctx context.Context, id ulid.ID) (string, error) {
	if len(id) < 3 {
		return "", fmt.Errorf("IDToType: id too short")
	}
	prefix := id[:3]
	t, err := globalIDs.FindTableByID(string(prefix))
	if err != nil {
		return "", fmt.Errorf("IDToType: could not map prefix '%s' to a type", prefix)
	}
	return t, nil
}
