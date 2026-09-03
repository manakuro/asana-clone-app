package mutation_test

import (
	"asana-clone-app/ent"
	"asana-clone-app/pkg/infrastructure/router"
	"asana-clone-app/testutil"
	"asana-clone-app/testutil/e2e"
	"context"
	"net/http"
	"testing"

	"github.com/gavv/httpexpect/v2"
)

func TestTestUser_CreateTestUser(t *testing.T) {
	expect, client, teardown := e2e.Setup(t, e2e.SetupOption{
		Teardown: func(t *testing.T, client *ent.Client) {
			testutil.DropTestUser(t, client)
		},
	})
	defer teardown()

	tests := []struct {
		name    string
		arrange func(t *testing.T)
		act     func(t *testing.T) *httpexpect.Response
		assert  func(t *testing.T, got *httpexpect.Response)
		args    struct {
			ctx context.Context
		}
		teardown func(t *testing.T)
	}{
		{
			name:    "It should create test user",
			arrange: func(t *testing.T) {},
			act: func(t *testing.T) *httpexpect.Response {
				return expect.POST(router.GraphQLPath).WithJSON(map[string]string{
					"query": `
						mutation {
							createTestUser(input: {name: "Tom1", age: 20}) {
								age
								name
								id
								createdAt
								updatedAt
						}
					}`,
				}).Expect()
			},
			assert: func(t *testing.T, got *httpexpect.Response) {
				got.Status(http.StatusOK)
				data := e2e.GetData(got).Object()
				testUser := e2e.GetObject(data, "createTestUser")
				testUser.Value("age").Number().Equal(20)
				testUser.Value("name").String().Equal("Tom1")
			},
			teardown: func(t *testing.T) {
				testutil.DropTestUser(t, client)
			},
		},
		{
			name:    "It should NOT create test user when the length of the name is over",
			arrange: func(t *testing.T) {},
			act: func(t *testing.T) *httpexpect.Response {
				return expect.POST(router.GraphQLPath).WithJSON(map[string]string{
					"query": `
						mutation {  
							createTestUser(input: {name: "Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1Tom1", age: 20}) {   
								age    
								name
								id    
								createdAt    
								updatedAt  
						}
					}`,
				}).Expect()
			},
			assert: func(t *testing.T, got *httpexpect.Response) {
				got.Status(http.StatusOK)
				data := e2e.GetData(got)
				data.Null()

				errors := e2e.GetErrors(got)
				errors.Array().Length().Equal(1)
			},
			teardown: func(t *testing.T) {
				testutil.DropTestUser(t, client)
			},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			tt.arrange(t)
			got := tt.act(t)
			tt.assert(t, got)
			tt.teardown(t)
		})
	}
}
