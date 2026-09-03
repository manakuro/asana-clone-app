package seed

import (
	"asana-clone-app/ent"
	"context"
	"log"
)

var colorSeed = struct {
	white     ent.CreateColorInput
	black     ent.CreateColorInput
	gray50    ent.CreateColorInput
	gray100   ent.CreateColorInput
	gray200   ent.CreateColorInput
	gray300   ent.CreateColorInput
	gray400   ent.CreateColorInput
	gray500   ent.CreateColorInput
	gray600   ent.CreateColorInput
	gray700   ent.CreateColorInput
	gray800   ent.CreateColorInput
	gray900   ent.CreateColorInput
	red50     ent.CreateColorInput
	red100    ent.CreateColorInput
	red200    ent.CreateColorInput
	red300    ent.CreateColorInput
	red400    ent.CreateColorInput
	red500    ent.CreateColorInput
	red600    ent.CreateColorInput
	red700    ent.CreateColorInput
	red800    ent.CreateColorInput
	red900    ent.CreateColorInput
	orange50  ent.CreateColorInput
	orange100 ent.CreateColorInput
	orange200 ent.CreateColorInput
	orange300 ent.CreateColorInput
	orange400 ent.CreateColorInput
	orange500 ent.CreateColorInput
	orange600 ent.CreateColorInput
	orange700 ent.CreateColorInput
	orange800 ent.CreateColorInput
	orange900 ent.CreateColorInput
	yellow50  ent.CreateColorInput
	yellow100 ent.CreateColorInput
	yellow200 ent.CreateColorInput
	yellow300 ent.CreateColorInput
	yellow400 ent.CreateColorInput
	yellow500 ent.CreateColorInput
	yellow600 ent.CreateColorInput
	yellow700 ent.CreateColorInput
	yellow800 ent.CreateColorInput
	yellow900 ent.CreateColorInput
	green50   ent.CreateColorInput
	green100  ent.CreateColorInput
	green200  ent.CreateColorInput
	green300  ent.CreateColorInput
	green400  ent.CreateColorInput
	green500  ent.CreateColorInput
	green600  ent.CreateColorInput
	green700  ent.CreateColorInput
	green800  ent.CreateColorInput
	green900  ent.CreateColorInput
	teal50    ent.CreateColorInput
	teal100   ent.CreateColorInput
	teal200   ent.CreateColorInput
	teal300   ent.CreateColorInput
	teal400   ent.CreateColorInput
	teal500   ent.CreateColorInput
	teal600   ent.CreateColorInput
	teal700   ent.CreateColorInput
	teal800   ent.CreateColorInput
	teal900   ent.CreateColorInput
	blue50    ent.CreateColorInput
	blue100   ent.CreateColorInput
	blue200   ent.CreateColorInput
	blue300   ent.CreateColorInput
	blue400   ent.CreateColorInput
	blue500   ent.CreateColorInput
	blue600   ent.CreateColorInput
	blue700   ent.CreateColorInput
	blue800   ent.CreateColorInput
	blue900   ent.CreateColorInput
	cyan50    ent.CreateColorInput
	cyan100   ent.CreateColorInput
	cyan200   ent.CreateColorInput
	cyan300   ent.CreateColorInput
	cyan400   ent.CreateColorInput
	cyan500   ent.CreateColorInput
	cyan600   ent.CreateColorInput
	cyan700   ent.CreateColorInput
	cyan800   ent.CreateColorInput
	cyan900   ent.CreateColorInput
	purple50  ent.CreateColorInput
	purple100 ent.CreateColorInput
	purple200 ent.CreateColorInput
	purple300 ent.CreateColorInput
	purple400 ent.CreateColorInput
	purple500 ent.CreateColorInput
	purple600 ent.CreateColorInput
	purple700 ent.CreateColorInput
	purple800 ent.CreateColorInput
	purple900 ent.CreateColorInput
	pink50    ent.CreateColorInput
	pink100   ent.CreateColorInput
	pink200   ent.CreateColorInput
	pink300   ent.CreateColorInput
	pink400   ent.CreateColorInput
	pink500   ent.CreateColorInput
	pink600   ent.CreateColorInput
	pink700   ent.CreateColorInput
	pink800   ent.CreateColorInput
	pink900   ent.CreateColorInput
}{
	white:     ent.CreateColorInput{Name: "white", Color: "white", Hex: "#FFFFFF"},
	black:     ent.CreateColorInput{Name: "black", Color: "black", Hex: "#000000"},
	gray50:    ent.CreateColorInput{Name: "gray.50", Color: "gray.50", Hex: "#F7FAFC"},
	gray100:   ent.CreateColorInput{Name: "gray.100", Color: "gray.100", Hex: "#EDF2F7"},
	gray200:   ent.CreateColorInput{Name: "gray.200", Color: "gray.200", Hex: "#E2E8F0"},
	gray300:   ent.CreateColorInput{Name: "gray.300", Color: "gray.300", Hex: "#CBD5E0"},
	gray400:   ent.CreateColorInput{Name: "gray.400", Color: "gray.400", Hex: "#A0AEC0"},
	gray500:   ent.CreateColorInput{Name: "gray.500", Color: "gray.500", Hex: "#718096"},
	gray600:   ent.CreateColorInput{Name: "gray.600", Color: "gray.600", Hex: "#4A5568"},
	gray700:   ent.CreateColorInput{Name: "gray.700", Color: "gray.700", Hex: "#2D3748"},
	gray800:   ent.CreateColorInput{Name: "gray.800", Color: "gray.800", Hex: "#1A202C"},
	gray900:   ent.CreateColorInput{Name: "gray.900", Color: "gray.900", Hex: "#171923"},
	red50:     ent.CreateColorInput{Name: "red.50", Color: "red.50", Hex: "#FFF5F5"},
	red100:    ent.CreateColorInput{Name: "red.100", Color: "red.100", Hex: "#FED7D7"},
	red200:    ent.CreateColorInput{Name: "red.200", Color: "red.200", Hex: "#FEB2B2"},
	red300:    ent.CreateColorInput{Name: "red.300", Color: "red.300", Hex: "#FC8181"},
	red400:    ent.CreateColorInput{Name: "red.400", Color: "red.400", Hex: "#F56565"},
	red500:    ent.CreateColorInput{Name: "red.500", Color: "red.500", Hex: "#E53E3E"},
	red600:    ent.CreateColorInput{Name: "red.600", Color: "red.600", Hex: "#C53030"},
	red700:    ent.CreateColorInput{Name: "red.700", Color: "red.700", Hex: "#9B2C2C"},
	red800:    ent.CreateColorInput{Name: "red.800", Color: "red.800", Hex: "#822727"},
	red900:    ent.CreateColorInput{Name: "red.900", Color: "red.900", Hex: "#63171B"},
	orange50:  ent.CreateColorInput{Name: "orange.50", Color: "orange.50", Hex: "#FFFAF0"},
	orange100: ent.CreateColorInput{Name: "orange.100", Color: "orange.100", Hex: "#FEEBC8"},
	orange200: ent.CreateColorInput{Name: "orange.200", Color: "orange.200", Hex: "#FBD38D"},
	orange300: ent.CreateColorInput{Name: "orange.300", Color: "orange.300", Hex: "#F6AD55"},
	orange400: ent.CreateColorInput{Name: "orange.400", Color: "orange.400", Hex: "#ED8936"},
	orange500: ent.CreateColorInput{Name: "orange.500", Color: "orange.500", Hex: "#DD6B20"},
	orange600: ent.CreateColorInput{Name: "orange.600", Color: "orange.600", Hex: "#C05621"},
	orange700: ent.CreateColorInput{Name: "orange.700", Color: "orange.700", Hex: "#9C4221"},
	orange800: ent.CreateColorInput{Name: "orange.800", Color: "orange.800", Hex: "#7B341E"},
	orange900: ent.CreateColorInput{Name: "orange.900", Color: "orange.900", Hex: "#652B19"},
	yellow50:  ent.CreateColorInput{Name: "yellow.50", Color: "yellow.50", Hex: "#FFFFF0"},
	yellow100: ent.CreateColorInput{Name: "yellow.100", Color: "yellow.100", Hex: "#FEFCBF"},
	yellow200: ent.CreateColorInput{Name: "yellow.200", Color: "yellow.200", Hex: "#FAF089"},
	yellow300: ent.CreateColorInput{Name: "yellow.300", Color: "yellow.300", Hex: "#F6E05E"},
	yellow400: ent.CreateColorInput{Name: "yellow.400", Color: "yellow.400", Hex: "#ECC94B"},
	yellow500: ent.CreateColorInput{Name: "yellow.500", Color: "yellow.500", Hex: "#D69E2E"},
	yellow600: ent.CreateColorInput{Name: "yellow.600", Color: "yellow.600", Hex: "#B7791F"},
	yellow700: ent.CreateColorInput{Name: "yellow.700", Color: "yellow.700", Hex: "#975A16"},
	yellow800: ent.CreateColorInput{Name: "yellow.800", Color: "yellow.800", Hex: "#744210"},
	yellow900: ent.CreateColorInput{Name: "yellow.900", Color: "yellow.900", Hex: "#5F370E"},
	green50:   ent.CreateColorInput{Name: "green.50", Color: "green.50", Hex: "#F0FFF4"},
	green100:  ent.CreateColorInput{Name: "green.100", Color: "green.100", Hex: "#C6F6D5"},
	green200:  ent.CreateColorInput{Name: "green.200", Color: "green.200", Hex: "#9AE6B4"},
	green300:  ent.CreateColorInput{Name: "green.300", Color: "green.300", Hex: "#68D391"},
	green400:  ent.CreateColorInput{Name: "green.400", Color: "green.400", Hex: "#48BB78"},
	green500:  ent.CreateColorInput{Name: "green.500", Color: "green.500", Hex: "#38A169"},
	green600:  ent.CreateColorInput{Name: "green.600", Color: "green.600", Hex: "#2F855A"},
	green700:  ent.CreateColorInput{Name: "green.700", Color: "green.700", Hex: "#276749"},
	green800:  ent.CreateColorInput{Name: "green.800", Color: "green.800", Hex: "#22543D"},
	green900:  ent.CreateColorInput{Name: "green.900", Color: "green.900", Hex: "#1C4532"},
	teal50:    ent.CreateColorInput{Name: "teal.50", Color: "teal.50", Hex: "#E6FFFA"},
	teal100:   ent.CreateColorInput{Name: "teal.100", Color: "teal.100", Hex: "#B2F5EA"},
	teal200:   ent.CreateColorInput{Name: "teal.200", Color: "teal.200", Hex: "#81E6D9"},
	teal300:   ent.CreateColorInput{Name: "teal.300", Color: "teal.300", Hex: "#4FD1C5"},
	teal400:   ent.CreateColorInput{Name: "teal.400", Color: "teal.400", Hex: "#38B2AC"},
	teal500:   ent.CreateColorInput{Name: "teal.500", Color: "teal.500", Hex: "#319795"},
	teal600:   ent.CreateColorInput{Name: "teal.600", Color: "teal.600", Hex: "#2C7A7B"},
	teal700:   ent.CreateColorInput{Name: "teal.700", Color: "teal.700", Hex: "#285E61"},
	teal800:   ent.CreateColorInput{Name: "teal.800", Color: "teal.800", Hex: "#234E52"},
	teal900:   ent.CreateColorInput{Name: "teal.900", Color: "teal.900", Hex: "#1D4044"},
	blue50:    ent.CreateColorInput{Name: "blue.50", Color: "blue.50", Hex: "#EBF8FF"},
	blue100:   ent.CreateColorInput{Name: "blue.100", Color: "blue.100", Hex: "#BEE3F8"},
	blue200:   ent.CreateColorInput{Name: "blue.200", Color: "blue.200", Hex: "#90CDF4"},
	blue300:   ent.CreateColorInput{Name: "blue.300", Color: "blue.300", Hex: "#63B3ED"},
	blue400:   ent.CreateColorInput{Name: "blue.400", Color: "blue.400", Hex: "#4299E1"},
	blue500:   ent.CreateColorInput{Name: "blue.500", Color: "blue.500", Hex: "#3182CE"},
	blue600:   ent.CreateColorInput{Name: "blue.600", Color: "blue.600", Hex: "#2B6CB0"},
	blue700:   ent.CreateColorInput{Name: "blue.700", Color: "blue.700", Hex: "#2C5282"},
	blue800:   ent.CreateColorInput{Name: "blue.800", Color: "blue.800", Hex: "#2A4365"},
	blue900:   ent.CreateColorInput{Name: "blue.900", Color: "blue.900", Hex: "#1A365D"},
	cyan50:    ent.CreateColorInput{Name: "cyan.50", Color: "cyan.50", Hex: "#EDFDFD"},
	cyan100:   ent.CreateColorInput{Name: "cyan.100", Color: "cyan.100", Hex: "#C4F1F9"},
	cyan200:   ent.CreateColorInput{Name: "cyan.200", Color: "cyan.200", Hex: "#9DECF9"},
	cyan300:   ent.CreateColorInput{Name: "cyan.300", Color: "cyan.300", Hex: "#76E4F7"},
	cyan400:   ent.CreateColorInput{Name: "cyan.400", Color: "cyan.400", Hex: "#0BC5EA"},
	cyan500:   ent.CreateColorInput{Name: "cyan.500", Color: "cyan.500", Hex: "#00B5D8"},
	cyan600:   ent.CreateColorInput{Name: "cyan.600", Color: "cyan.600", Hex: "#00A3C4"},
	cyan700:   ent.CreateColorInput{Name: "cyan.700", Color: "cyan.700", Hex: "#0987A0"},
	cyan800:   ent.CreateColorInput{Name: "cyan.800", Color: "cyan.800", Hex: "#086F83"},
	cyan900:   ent.CreateColorInput{Name: "cyan.900", Color: "cyan.900", Hex: "#065666"},
	purple50:  ent.CreateColorInput{Name: "purple.50", Color: "purple.50", Hex: "#FAF5FF"},
	purple100: ent.CreateColorInput{Name: "purple.100", Color: "purple.100", Hex: "#E9D8FD"},
	purple200: ent.CreateColorInput{Name: "purple.200", Color: "purple.200", Hex: "#D6BCFA"},
	purple300: ent.CreateColorInput{Name: "purple.300", Color: "purple.300", Hex: "#B794F4"},
	purple400: ent.CreateColorInput{Name: "purple.400", Color: "purple.400", Hex: "#9F7AEA"},
	purple500: ent.CreateColorInput{Name: "purple.500", Color: "purple.500", Hex: "#805AD5"},
	purple600: ent.CreateColorInput{Name: "purple.600", Color: "purple.600", Hex: "#6B46C1"},
	purple700: ent.CreateColorInput{Name: "purple.700", Color: "purple.700", Hex: "#553C9A"},
	purple800: ent.CreateColorInput{Name: "purple.800", Color: "purple.800", Hex: "#44337A"},
	purple900: ent.CreateColorInput{Name: "purple.900", Color: "purple.900", Hex: "#322659"},
	pink50:    ent.CreateColorInput{Name: "pink.50", Color: "pink.50", Hex: "#FFF5F7"},
	pink100:   ent.CreateColorInput{Name: "pink.100", Color: "pink.100", Hex: "#FED7E2"},
	pink200:   ent.CreateColorInput{Name: "pink.200", Color: "pink.200", Hex: "#FBB6CE"},
	pink300:   ent.CreateColorInput{Name: "pink.300", Color: "pink.300", Hex: "#F687B3"},
	pink400:   ent.CreateColorInput{Name: "pink.400", Color: "pink.400", Hex: "#ED64A6"},
	pink500:   ent.CreateColorInput{Name: "pink.500", Color: "pink.500", Hex: "#D53F8C"},
	pink600:   ent.CreateColorInput{Name: "pink.600", Color: "pink.600", Hex: "#B83280"},
	pink700:   ent.CreateColorInput{Name: "pink.700", Color: "pink.700", Hex: "#97266D"},
	pink800:   ent.CreateColorInput{Name: "pink.800", Color: "pink.800", Hex: "#702459"},
	pink900:   ent.CreateColorInput{Name: "pink.900", Color: "pink.900", Hex: "#521B41"},
}

// Color generates color data.
func Color(ctx context.Context, client *ent.Client) {
	_, err := client.Color.Delete().Exec(ctx)
	if err != nil {
		log.Fatalf("Color failed to delete data: %v", err)
	}

	inputs := []ent.CreateColorInput{
		colorSeed.gray50,
		colorSeed.gray100,
		colorSeed.gray200,
		colorSeed.gray300,
		colorSeed.gray400,
		colorSeed.gray500,
		colorSeed.gray600,
		colorSeed.gray700,
		colorSeed.gray800,
		colorSeed.gray900,
		colorSeed.red50,
		colorSeed.red100,
		colorSeed.red200,
		colorSeed.red300,
		colorSeed.red400,
		colorSeed.red500,
		colorSeed.red600,
		colorSeed.red700,
		colorSeed.red800,
		colorSeed.red900,
		colorSeed.orange50,
		colorSeed.orange100,
		colorSeed.orange200,
		colorSeed.orange300,
		colorSeed.orange400,
		colorSeed.orange500,
		colorSeed.orange600,
		colorSeed.orange700,
		colorSeed.orange800,
		colorSeed.orange900,
		colorSeed.yellow50,
		colorSeed.yellow100,
		colorSeed.yellow200,
		colorSeed.yellow300,
		colorSeed.yellow400,
		colorSeed.yellow500,
		colorSeed.yellow600,
		colorSeed.yellow700,
		colorSeed.yellow800,
		colorSeed.yellow900,
		colorSeed.green50,
		colorSeed.green100,
		colorSeed.green200,
		colorSeed.green300,
		colorSeed.green400,
		colorSeed.green500,
		colorSeed.green600,
		colorSeed.green700,
		colorSeed.green800,
		colorSeed.green900,
		colorSeed.teal50,
		colorSeed.teal100,
		colorSeed.teal200,
		colorSeed.teal300,
		colorSeed.teal400,
		colorSeed.teal500,
		colorSeed.teal600,
		colorSeed.teal700,
		colorSeed.teal800,
		colorSeed.teal900,
		colorSeed.blue50,
		colorSeed.blue100,
		colorSeed.blue200,
		colorSeed.blue300,
		colorSeed.blue400,
		colorSeed.blue500,
		colorSeed.blue600,
		colorSeed.blue700,
		colorSeed.blue800,
		colorSeed.blue900,
		colorSeed.cyan50,
		colorSeed.cyan100,
		colorSeed.cyan200,
		colorSeed.cyan300,
		colorSeed.cyan400,
		colorSeed.cyan500,
		colorSeed.cyan600,
		colorSeed.cyan700,
		colorSeed.cyan800,
		colorSeed.cyan900,
		colorSeed.purple50,
		colorSeed.purple100,
		colorSeed.purple200,
		colorSeed.purple300,
		colorSeed.purple400,
		colorSeed.purple500,
		colorSeed.purple600,
		colorSeed.purple700,
		colorSeed.purple800,
		colorSeed.purple900,
		colorSeed.pink50,
		colorSeed.pink100,
		colorSeed.pink200,
		colorSeed.pink300,
		colorSeed.pink400,
		colorSeed.pink500,
		colorSeed.pink600,
		colorSeed.pink700,
		colorSeed.pink800,
		colorSeed.pink900,
	}
	bulk := make([]*ent.ColorCreate, len(inputs))
	for i, t := range inputs {
		bulk[i] = client.Color.Create().SetInput(t)
	}
	if _, err = client.Color.CreateBulk(bulk...).Save(ctx); err != nil {
		log.Fatalf("Color failed to seed data: %v", err)
	}
}
