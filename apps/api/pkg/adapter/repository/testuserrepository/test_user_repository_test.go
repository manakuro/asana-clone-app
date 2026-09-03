package testuserrepository_test

import (
	"asana-clone-app/ent"
	"asana-clone-app/pkg/adapter/repository/testuserrepository"
	"asana-clone-app/pkg/entity/model"
	"asana-clone-app/testutil"
	"context"
	"testing"

	"github.com/stretchr/testify/assert"
)

func setup(t *testing.T) (client *ent.Client, teardown func()) {
	testutil.ReadConfig()
	c := testutil.NewDBClient(t)

	return c, func() {
		testutil.DropTestUser(t, c)
		defer c.Close()
	}
}

func TestTestUserRepository_List(t *testing.T) {
	t.Helper()

	client, teardown := setup(t)
	defer teardown()

	repo := testuserrepository.New(client)

	type args struct {
		ctx context.Context
	}

	tests := []struct {
		name    string
		arrange func(t *testing.T)
		act     func(ctx context.Context, t *testing.T) (us []*model.TestUser, err error)
		assert  func(t *testing.T, us []*model.TestUser, err error)
		args    struct {
			ctx context.Context
		}
		teardown func(t *testing.T)
	}{
		{
			name: "It should get user's list",
			arrange: func(t *testing.T) {
				ctx := context.Background()
				_, err := client.TestUser.Delete().Exec(ctx)
				if err != nil {
					t.Error(err)
					t.FailNow()
				}

				users := []struct {
					name string
					age  int
				}{{name: "test", age: 10}, {name: "test2", age: 11}, {name: "test3", age: 12}}
				bulk := make([]*ent.TestUserCreate, len(users))
				for i, u := range users {
					bulk[i] = client.TestUser.Create().SetName(u.name).SetAge(u.age)
				}

				_, err = client.TestUser.
					CreateBulk(bulk...).
					Save(ctx)
				if err != nil {
					t.Error(err)
					t.FailNow()
				}
			},
			act: func(ctx context.Context, t *testing.T) (us []*model.TestUser, err error) {
				return repo.List(ctx)
			},
			assert: func(t *testing.T, got []*model.TestUser, err error) {
				assert.Nil(t, err)
				assert.Equal(t, 3, len(got))
			},
			args: args{
				ctx: context.Background(),
			},
			teardown: func(t *testing.T) {
				testutil.DropTestUser(t, client)
			},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			tt.arrange(t)
			got, err := tt.act(tt.args.ctx, t)
			tt.assert(t, got, err)
			tt.teardown(t)
		})
	}
}
