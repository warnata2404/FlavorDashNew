import Colors from "./colors";
import Spacing from "./spacing";
import Typography from "./typography";

const Theme = {
  colors: Colors,

  spacing: Spacing,

  typography: Typography,

  borderRadius: Spacing.borderRadius,

  screenPadding: Spacing.screenPadding,

  cardShadow: {
    shadowColor: Colors.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 3,
  },
};

export default Theme;
