import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
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
  searchInput: {
    padding: "20px"
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
    return (
      <div>
        <h1> DevMountain Badged Grad Search</h1>
        <div style={{ paddingBottom: "20px" }}>
          Name:
          <input value={this.state.name} onChange={this.handleNameChange} />
          <button onClick={this.handleQuery}>Search</button>
        </div>
        {this.renderContent()}
      </div>
    );
  }
}

SearchBox.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SearchBox);
