import { teal, indigo, red } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export default getMuiTheme({
  palette: {
    primary: teal,
    secondary: indigo,
    error: red
    // Used by `getContrastText()` to maximize the contrast between the background and
    // the text.
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
  }
});
