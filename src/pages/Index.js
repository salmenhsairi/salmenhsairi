import React, { Component } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Visibility";

// http://localhost/applicationMTD/api/displayClient.php?id=6

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clients: [],
      nombreTotalElement: 0,
      myCurrentPage: 1,
      resetFirstPage: false,
      nbrEltperPage: 5,
      pending: true,
      input: "",
    };
  }

  createColumn = (name, selector, sortable, center) => {
    return { name, selector, sortable, center };
  };
  columns = [
    this.createColumn("Name", (row) => row["name"], true, true),
    this.createColumn("Telephone", (row) => row["telephone"], true, true),
    this.createColumn("Email", (row) => row["email"], true, true),
    this.createColumn("Ville", (row) => row["ville"], true, true),
    this.createColumn("Type", (row) => row["type"], true, true),
    this.createColumn("Handicap", (row) => row["handicap"], true, true),
    this.createColumn("consulter", (row) => row["action"], false, true),
  ];

  fetchData(limit, page, filter) {
    return axios
      .post(
        "http://localhost/applicationMTD/api/fetchAllClients.php",
        {
          query: filter,
          limit: limit,
          page: page,
        },
        {
          validateStatus: false,
        }
      )
      .then((result) => {
        const rows = result.data.data;
        const nbElement = result.data.total;
        rows.map((row) => {
          return Object.keys(row).forEach((key) => {
            if (!row[key]) {
              row[key] = <b style={{ color: "red" }}>no data</b>;
            }
          });
        });
        return [rows, nbElement];
      })
      .catch((error) => alert(error));
  }

  componentDidMount() {
    this.setState({ pending: true });
    this.fetchData(
      this.state.nbrEltperPage,
      this.state.myCurrentPage,
      this.state.input
    ).then((fetchResult) => {
      const rows = fetchResult[0];
      const total = fetchResult[1];
      this.setState({
        clients: rows,
        resetFirstPage: true,
        nombreTotalElement: total,
        pending: false,
      });
    });
  }

  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   this.fetchData(
  //     prevState.nbrEltperPage,
  //     prevState.myCurrentPage,
  //     this.state.input
  //   ).then((fetchResult) => {
  //     const rows = fetchResult[0];
  //     const total = fetchResult[1];
  //     this.setState({
  //       clients: rows,
  //       resetFirstPage: true,
  //       nombreTotalElement: total,
  //       pending: false,
  //     });
  //   });
  // }

  newElement = (page, totalRows) => {
    this.setState({ pending: true });
    this.fetchData(this.state.nbrEltperPage, page, this.state.input).then(
      (fetchResult) => {
        const rows = fetchResult[0];
        const total = fetchResult[1];
        this.setState({
          clients: rows,
          myCurrentPage: page,
          nombreTotalElement: total,
          pending: false,
        });
      }
    );
  };

  perPage(currentRowsPerPage, currentPage) {
    this.setState({ pending: true }, () => {
      this.fetchData(
        currentRowsPerPage,
        this.state.myCurrentPage,
        this.state.setInput
      ).then((fetchResult) => {
        const rows = fetchResult[0];
        const total = fetchResult[1];
        this.setState({
          clients: rows,
          nbrEltperPage: currentRowsPerPage,
          nombreTotalElement: total,
          pending: false,
        });
      });
    });
  }

  filterSearch(e) {
    this.setState({ pending: true , input : e.target.value });
    this.fetchData(this.state.nbrEltperPage, this.state.myCurrentPage, e.target.value).then(
      (fetchResult) => {
        const rows = fetchResult[0];
        const total = fetchResult[1];
        this.setState({
          clients: rows,
          nombreTotalElement: total,
          pending: false,
        });
      }
    );
  }
  render() {
    const finalData = this.state.clients.map((row, index) => {
      const action = (
        <div key={index}>
          <Link to={`/display/${row["id"]}`}>
            <button className="btn btn-primary m-r-1em">
              <VisibilityIcon />
            </button>
          </Link>
        </div>
      );
      return { ...row, action };
    });

    return (
      <div className="container">
        <h1 className="h3 mb-0 text-gray-800" style={{marginTop:"2%"}}>All Clients</h1>
        <input
          value={this.state.input}
          onChange={(e) => {this.filterSearch(e)}}
          type="text"
          className="form-control bg-light border-0 small"
          placeholder="Search for..."
          style={{ marginTop: "2%" }}
          aria-label="Search"
          aria-describedby="basic-addon2"
        />
        <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
          <DataTable
            columns={this.columns}
            data={finalData}
            highlightOnHover={true}
            pagination={true}
            paginationServer={true}
            onChangePage={(page, totalRows) => this.newElement(page, totalRows)}
            paginationTotalRows={this.state.nombreTotalElement}
            paginationPerPage={this.state.nbrEltperPage}
            paginationRowsPerPageOptions={[5, 10, 15, 20, 25]}
            onChangeRowsPerPage={(currentRowsPerPage, currentPage) =>
              this.perPage(currentRowsPerPage, currentPage)
            }
            paginationResetDefaultPage={this.state.resetFirstPage}
            paginationComponentOptions={{
              rowsPerPageText: "Elements par page:",
              rangeSeparatorText: "de",
              noRowsPerPage: false,
            }}
            progressPending={this.state.pending}
            noHeader={true}
          />
        </div>
      </div>
    );
  }
}
export default Index;
