package model

import (
	"asana-clone-app/ent"
	"asana-clone-app/ent/schema/testuserprofile"
)

// TestUser is the model entity for the TestUser schema.
type TestUser = ent.TestUser

// TestUserProfile of profile.
type TestUserProfile = testuserprofile.TestUserProfile

// TestUserProfileBody of profile.
type TestUserProfileBody = testuserprofile.TestUserProfileBody

// TestUserProfileBodyComment of profile.
type TestUserProfileBodyComment = testuserprofile.TestUserProfileBodyComment

// TestUserProfileInput of input
type TestUserProfileInput = testuserprofile.TestUserProfile

// TestUserProfileBodyInput of input
type TestUserProfileBodyInput = testuserprofile.TestUserProfileBody

// TestUserProfileBodyCommentInput of input
type TestUserProfileBodyCommentInput = testuserprofile.TestUserProfileBodyComment

// TestUserConnection is the connection containing edges to TestUser.
type TestUserConnection = ent.TestUserConnection

// TestUserWhereInput represents a where input for filtering TestUser queries.
type TestUserWhereInput = ent.TestUserWhereInput

// CreateTestUserInput represents a mutation input for creating test users.
type CreateTestUserInput = ent.CreateTestUserInput

// UpdateTestUserInput represents a mutation input for updating test users.
type UpdateTestUserInput = ent.UpdateTestUserInput
