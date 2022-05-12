import React from "react";
import { Link } from "react-router-dom";
import makeStyles from "@mui/styles/makeStyles";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";

const useStyles = makeStyles({
  root: {
    maxWidth: "150px",
  },
  media: {
    height: "150px",
    width: "150px",
  },
});

function SubscriptionItem(props) {
  const classes = useStyles();

  const cardMedia = (
    <CardMedia className={classes.media} title={props.title} image={props.artwork} />
  );

  return (
    <Card className={classes.root} elevation={3}>
      {/* If `props.clickable` is true then the card should route to a given podcast via its ID */}
      {props.clickable ? (
        <CardActionArea
          component={Link}
          to={{
            pathname: `/podcast/${props.id}`,
            state: { title: props.title },
          }}
        >
          {cardMedia}
        </CardActionArea>
      ) : (
        <CardActionArea>{cardMedia}</CardActionArea>
      )}
    </Card>
  );
}

export default SubscriptionItem;
