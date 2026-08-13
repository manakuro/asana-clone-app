package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"project-management-demo-backend/ent"
	"project-management-demo-backend/ent/schema/ulid"
	"project-management-demo-backend/graph/generated"
	"project-management-demo-backend/pkg/adapter/handler"
	"project-management-demo-backend/pkg/entity/model"
	"project-management-demo-backend/pkg/util/datetime"
	"project-management-demo-backend/pkg/util/subscription"
)

func (r *favoriteWorkspaceResolver) CreatedAt(ctx context.Context, obj *ent.FavoriteWorkspace) (string, error) {
	return datetime.FormatDate(obj.CreatedAt), nil
}

func (r *favoriteWorkspaceResolver) UpdatedAt(ctx context.Context, obj *ent.FavoriteWorkspace) (string, error) {
	return datetime.FormatDate(obj.UpdatedAt), nil
}

func (r *mutationResolver) CreateFavoriteWorkspace(ctx context.Context, input ent.CreateFavoriteWorkspaceInput) (*ent.FavoriteWorkspace, error) {
	f, err := r.controller.FavoriteWorkspace.Create(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	go func(detachedCtx context.Context) {
		ids, _ := r.controller.FavoriteWorkspace.FavoriteWorkspaceIDs(detachedCtx, input.TeammateID, &input.WorkspaceID)
		for _, u := range r.subscriptions.FavoriteWorkspaceIDsUpdated {
			if u.TeammateID == input.TeammateID && u.RequestID != input.RequestID {
				u.Ch <- ids
			}
		}
	}(context.WithoutCancel(ctx))

	return f, nil
}

func (r *mutationResolver) DeleteFavoriteWorkspace(ctx context.Context, input model.DeleteFavoriteWorkspaceInput) (*ent.FavoriteWorkspace, error) {
	f, err := r.controller.FavoriteWorkspace.Delete(ctx, input)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	go func(detachedCtx context.Context) {
		ids, _ := r.controller.FavoriteWorkspace.FavoriteWorkspaceIDs(detachedCtx, input.TeammateID, &input.WorkspaceID)
		for _, u := range r.subscriptions.FavoriteWorkspaceIDsUpdated {
			if u.TeammateID == input.TeammateID && u.RequestID != input.RequestID {
				u.Ch <- ids
			}
		}
	}(context.WithoutCancel(ctx))

	return f, nil
}

func (r *queryResolver) FavoriteWorkspace(ctx context.Context, where *ent.FavoriteWorkspaceWhereInput) (*ent.FavoriteWorkspace, error) {
	f, err := r.controller.FavoriteWorkspace.Get(ctx, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}
	return f, nil
}

func (r *queryResolver) FavoriteWorkspaces(ctx context.Context, after *ent.Cursor, first *int, before *ent.Cursor, last *int, where *ent.FavoriteWorkspaceWhereInput) (*ent.FavoriteWorkspaceConnection, error) {
	fs, err := r.controller.FavoriteWorkspace.ListWithPagination(ctx, after, first, before, last, where)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}
	return fs, nil
}

func (r *queryResolver) FavoriteWorkspaceIds(ctx context.Context, teammateID ulid.ID, workspaceID *ulid.ID) ([]ulid.ID, error) {
	ids, err := r.controller.FavoriteWorkspace.FavoriteWorkspaceIDs(ctx, teammateID, workspaceID)
	if err != nil {
		return nil, handler.HandleGraphQLError(ctx, err)
	}

	return ids, nil
}

func (r *subscriptionResolver) FavoriteWorkspaceIdsUpdated(ctx context.Context, teammateID ulid.ID, requestID string) (<-chan []ulid.ID, error) {
	key := subscription.NewKey()
	ch := make(chan []ulid.ID, 1)

	r.mutex.Lock()
	r.subscriptions.FavoriteWorkspaceIDsUpdated[key] = subscription.FavoriteWorkspaceIDsUpdated{
		TeammateID: teammateID,
		RequestID:  requestID,
		Ch:         ch,
	}
	r.mutex.Unlock()

	go func() {
		<-ctx.Done()
		r.mutex.Lock()
		delete(r.subscriptions.FavoriteWorkspaceIDsUpdated, key)
		r.mutex.Unlock()
	}()

	return ch, nil
}

// FavoriteWorkspace returns generated.FavoriteWorkspaceResolver implementation.
func (r *Resolver) FavoriteWorkspace() generated.FavoriteWorkspaceResolver {
	return &favoriteWorkspaceResolver{r}
}

type favoriteWorkspaceResolver struct{ *Resolver }
