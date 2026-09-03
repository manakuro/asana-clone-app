package seed

import (
	"asana-clone-app/ent"
	"asana-clone-app/ent/schema/testuserprofile"
	"context"
	"log"
)

var testUserFeed = struct {
	bob  ent.CreateTestUserInput
	ken  ent.CreateTestUserInput
	tom  ent.CreateTestUserInput
	jin  ent.CreateTestUserInput
	may  ent.CreateTestUserInput
	toy  ent.CreateTestUserInput
	nee  ent.CreateTestUserInput
	taro ent.CreateTestUserInput
	jiro ent.CreateTestUserInput
	ryu  ent.CreateTestUserInput
}{
	bob: ent.CreateTestUserInput{
		Name: "Bob",
		Age:  25,
		Profile: testuserprofile.TestUserProfile{
			Address: "address",
			Phone:   "09000000000",
			Body: testuserprofile.TestUserProfileBody{
				Weight: 60,
				Height: 180,
				Comment: testuserprofile.TestUserProfileBodyComment{
					Type: "paragraph",
					Text: "test",
				},
			}},
	},
	ken: ent.CreateTestUserInput{
		Name: "Ken",
		Age:  30,
		Profile: testuserprofile.TestUserProfile{
			Address: "address",
			Phone:   "09000000000",
			Body: testuserprofile.TestUserProfileBody{
				Weight: 60,
				Height: 180,
				Comment: testuserprofile.TestUserProfileBodyComment{
					Type: "paragraph",
					Text: "test",
				},
			}},
	},
	tom: ent.CreateTestUserInput{
		Name: "Tom",
		Age:  20,
		Profile: testuserprofile.TestUserProfile{
			Address: "address",
			Phone:   "09000000000",
			Body: testuserprofile.TestUserProfileBody{
				Weight: 60,
				Height: 180,
				Comment: testuserprofile.TestUserProfileBodyComment{
					Type: "paragraph",
					Text: "test",
				},
			}},
	},
	jin: ent.CreateTestUserInput{
		Name: "Jin",
		Age:  20,
		Profile: testuserprofile.TestUserProfile{
			Address: "address",
			Phone:   "09000000000",
			Body: testuserprofile.TestUserProfileBody{
				Weight: 60,
				Height: 180,
				Comment: testuserprofile.TestUserProfileBodyComment{
					Type: "paragraph",
					Text: "test",
				},
			}},
	},
	toy: ent.CreateTestUserInput{
		Name: "Toy",
		Age:  20,
		Profile: testuserprofile.TestUserProfile{
			Address: "address",
			Phone:   "09000000000",
			Body: testuserprofile.TestUserProfileBody{
				Weight: 60,
				Height: 180,
				Comment: testuserprofile.TestUserProfileBodyComment{
					Type: "paragraph",
					Text: "test",
				},
			}},
	},
	may: ent.CreateTestUserInput{
		Name: "May",
		Age:  20,
		Profile: testuserprofile.TestUserProfile{
			Address: "address",
			Phone:   "09000000000",
			Body: testuserprofile.TestUserProfileBody{
				Weight: 60,
				Height: 180,
				Comment: testuserprofile.TestUserProfileBodyComment{
					Type: "paragraph",
					Text: "test",
				},
			}},
	},
	nee: ent.CreateTestUserInput{
		Name: "Nee",
		Age:  20,
		Profile: testuserprofile.TestUserProfile{
			Address: "address",
			Phone:   "09000000000",
			Body: testuserprofile.TestUserProfileBody{
				Weight: 60,
				Height: 180,
				Comment: testuserprofile.TestUserProfileBodyComment{
					Type: "paragraph",
					Text: "test",
				},
			}},
	},
	taro: ent.CreateTestUserInput{
		Name: "Taro",
		Age:  20,
		Profile: testuserprofile.TestUserProfile{
			Address: "address",
			Phone:   "09000000000",
			Body: testuserprofile.TestUserProfileBody{
				Weight: 60,
				Height: 180,
				Comment: testuserprofile.TestUserProfileBodyComment{
					Type: "paragraph",
					Text: "test",
				},
			}},
	},
	jiro: ent.CreateTestUserInput{
		Name: "Jiro",
		Age:  20,
		Profile: testuserprofile.TestUserProfile{
			Address: "address",
			Phone:   "09000000000",
			Body: testuserprofile.TestUserProfileBody{
				Weight: 60,
				Height: 180,
				Comment: testuserprofile.TestUserProfileBodyComment{
					Type: "paragraph",
					Text: "test",
				},
			}},
	},
	ryu: ent.CreateTestUserInput{
		Name: "Ryu",
		Age:  20,
		Profile: testuserprofile.TestUserProfile{
			Address: "address",
			Phone:   "09000000000",
			Body: testuserprofile.TestUserProfileBody{
				Weight: 60,
				Height: 180,
				Comment: testuserprofile.TestUserProfileBodyComment{
					Type: "paragraph",
					Text: "test",
				},
			}},
	},
}

// TestUser generates test user data.
func TestUser(ctx context.Context, client *ent.Client) {
	_, err := client.TestUser.Delete().Exec(ctx)
	if err != nil {
		log.Fatalf("TestUser failed to delete data: %v", err)
	}

	inputs := []ent.CreateTestUserInput{
		testUserFeed.bob,
		testUserFeed.ken,
		testUserFeed.tom,
		testUserFeed.jin,
		testUserFeed.may,
		testUserFeed.toy,
		testUserFeed.nee,
		testUserFeed.taro,
		testUserFeed.jiro,
		testUserFeed.ryu,
	}
	bulk := make([]*ent.TestUserCreate, len(inputs))
	for i, t := range inputs {
		bulk[i] = client.TestUser.Create().SetInput(t)
	}
	if _, err = client.TestUser.CreateBulk(bulk...).Save(ctx); err != nil {
		log.Fatalf("TestUser failed to seed data: %v", err)
	}
}
