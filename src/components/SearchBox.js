import React, { Component } from "react";
import dataObj from "../all_badged_students.json";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import "typeface-roboto";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 500
  }
});

class SearchBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchArr: [],
      name: "",
      badgedDate: ""
    };
  }

  handleNameChange = e => {
    this.setState({
      name: e.target.value
    });
  };

  render() {
    let searchFilter = dataObj.filter((e, i, arr) =>
      e.issued_to.toLowerCase().includes(this.state.name.toLowerCase())
    );

    const searchArrMap = searchFilter.map((e, i) => {
      return (
        <Paper key={i} elevation={1} className={this.props.paper}>
          <Typography variant="display1" gutterBottom>
            {e.issued_to}
          </Typography>{" "}
          <Typography variant="body1">
            Badged Date: {e.issued_at_date} Program:{" "}
            {e.badge_template.vanity_slug}
          </Typography>{" "}
          {e.evidence.map((val, id) => {
            return (
              <div key={id}>
                {" "}
                {val.name} {val.value}{" "}
              </div>
            );
          })}
        </Paper>
      );
    });
    return (
      <div>
        Name:
        <input value={this.state.name} onChange={this.handleNameChange} />
        {searchArrMap}
      </div>
    );
  }
}

SearchBox.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SearchBox);
