import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 730,
  },
  bullet: {
    display: "inline-block",
    margin: "0 3px",
    transform: "scale(0.9)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function OutlinedCard() {
  const classes = useStyles();

  return (
    <Card
      className={classes.root}
      variant="outlined"
      style={{ marginLeft: "auto", marginRight: "auto", marginTop: "50px", marginBottom:"50px" }}
    >
      <CardContent>
        <Typography variant="h4" component="h2">
          Instructions
        </Typography>

        <Typography className={classes.pos} color="textPrimary">
          Made with <span>❤️</span> by Neha <br />
        </Typography>

        <Typography variant="h5" component="h2">
        ᐅ Writing Code
        </Typography>
        <Typography
          variant="body2"
          component="p"
          style={{ marginLeft: "30px" }}
        >
          • You should define only one recursive function.
          <br />
          • DO NOT include any 'print()' statement!
          <br />
          • NO empty return statements. You have to return something.
          <br />
          • Be sure to call the function at the end.
          <br />
          • Make sure your code is syntactically correct and follows proper indentation.
          (Python 3) <br /> <br/>
        </Typography>
        <Typography variant="h5" component="h2">
        ᐅ Running Code
        </Typography>
        <Typography
          variant="body2"
          component="p"
          style={{ marginLeft: "30px" }}
        >
          • If all goes well, you will see a nice recursive visualization of
          your function. <br />
          • Orange node == initial call || Blue node == recursive call || Red node ==
          base case. <br />
          • Turn 'Condense' off for a static graph. <br />
          • Click on any Node and view it's return value. <br/>
        </Typography>
      </CardContent>
    </Card>
  );
}