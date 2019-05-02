import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import SearchResults from "./SearchResults";
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
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    paddingBottom: "20px"
  },
  buttonStyle: {
    marginTop: "20px"
  }
});

class SearchBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchArr: [],
      name: "",
      badgedDate: "",
      searchResults: [],
      fetchingData: false
    };
  }

  handleNameChange = e => {
    this.setState({
      name: e.target.value
    });
  };

  handleQuery = () => {
    this.setState({
      fetchingData: true
    });
    axios.post("/api/acclaim", { name: `${this.state.name}` }).then(results => {
      this.setState({
        searchResults: results.data.data,
        fetchingData: false
      });
    });
  };

  renderContent = () => {
    switch (this.state.fetchingData) {
      case true:
        return <CircularProgress />;
      case false:
        return <SearchResults searchResults={this.state.searchResults} />;
      default:
        return <SearchResults searchResults={this.state.searchResults} />;
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Typography variant="h3" gutterBottom>
          DevMountain Badged Grad Search
        </Typography>
        {/* <div style={{ paddingBottom: "20px" }}> */}
        <form>
          <TextField
            label="Grad Name"
            className={classes.textField}
            value={this.state.name}
            onChange={this.handleNameChange}
            margin="normal"
            // variant="outlined"
          />
          <Button
            onClick={this.handleQuery}
            size="large"
            className={classes.buttonStyle}
            variant="outlined"
          >
            Search
          </Button>
        </form>
        {/* </div> */}
        {this.renderContent()}
      </div>
    );
  }
}

SearchBox.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SearchBox);
