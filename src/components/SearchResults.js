import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import "typeface-roboto";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 500
  },
  paper: {
    padding: theme.spacing.unit,
    textAlign: "center",
    color: theme.palette.text.secondary,
    whiteSpace: "nowrap",
    marginBottom: theme.spacing.unit,
    width: "90%"
  },
  searchInput: {
    padding: "20px"
  }
});

class SearchResults extends Component {
  render() {
    const searchArrMap = this.props.searchResults.map((e, i) => {
      return (
        <Paper key={i} elevation={4} className={this.props.paper}>
          <Grid container wrap="wrap" spacing={16}>
            <Grid item xs={3} zeroMinWidth>
              <Typography variant="display1" gutterBottom>
                {e.issued_to}
              </Typography>{" "}
            </Grid>
            <Grid item xs={2} zeroMinWidth>
              <Typography variant="body2">Badged Date:</Typography>{" "}
              {e.issued_at_date}
            </Grid>
            <Grid item xs={2} zeroMinWidth>
              <Typography variant="body2">Program:</Typography>
              {e.badge_template.vanity_slug}{" "}
            </Grid>
            {e.evidence.map((val, id) => {
              if (val.name === "Personal Portfolio") {
                // console.log("val.name", val.name);
                return (
                  <Grid item xs={3} zeroMinWidth key={id}>
                    <Typography variant="body2">{val.name}</Typography>
                    <Link color="inherit" variant="body1" href={val.value}>
                      {val.value}
                    </Link>
                  </Grid>
                );
              }
            })}
          </Grid>
        </Paper>
      );
    });
    return <div>{searchArrMap}</div>;
  }
}

SearchResults.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SearchResults);
