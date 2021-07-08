import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Visibility";
// http://localhost/applicationMTD/api/displayClient.php?id=6

export default function Index({ setInput }) {
  const [clients, setClients] = useState([]);
  const [nombreTotalElement, setNombreTotalElement] = useState(0);
  const [myCurrentPage, setMyCurrentPage] = useState(1);
  const [resetFirstPage, setResetFirstPage] = useState(false);
  const [nbrEltperPage, setNbrEltperPage] = useState(5);
  const [pending, setPending] = useState(true);

  const createColumn = (name, selector, sortable, center) => {
    return { name, selector, sortable, center };
  };
  const columns = [
    createColumn("Name", "name", true, true),
    createColumn("Telephone", "telephone", true, true),
    createColumn("Email", "email", true, true),
    createColumn("Ville", "ville", true, true),
    createColumn("Type", "type", true, true),
    createColumn("Handicap", "handicap", true, true),
    createColumn("consulter", "action", false, true)
  ];
  const fetchData = (limit, page, filter) => {
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
          Object.keys(row).forEach((key) => {
            if (!row[key]) {
              row[key] = <b style={{ color: "red" }}>no data</b>;
            }
          });
        });
        return [rows, nbElement];
      })
      .catch((error) => alert(error));
  };

  useEffect(() => {
    setPending(true);
    fetchData(nbrEltperPage, 1, setInput).then((fetchResult) => {
      const rows = fetchResult[0];
      const total = fetchResult[1];
      setClients(rows);
      setResetFirstPage(true);
      setNombreTotalElement(total);
      setPending(false);
    });
    console.log(setInput);
  }, [setInput]);

  const newElement = (page, totalRows) => {
    setPending(true);
    fetchData(nbrEltperPage, page, setInput).then((fetchResult) => {
      const rows = fetchResult[0];
      const total = fetchResult[1];
      setClients(rows);
      setMyCurrentPage(page);
      setNombreTotalElement(total);
      setPending(false);
    });
  };

  const perPage = (currentRowsPerPage, currentPage) => {
    setPending(true);
    fetchData(currentRowsPerPage, myCurrentPage, setInput).then(
      (fetchResult) => {
        const rows = fetchResult[0];
        const total = fetchResult[1];
        setClients(rows);
        setNbrEltperPage(currentRowsPerPage);
        setNombreTotalElement(total);
        setPending(false);
      }
    );
  };

  const finalData = clients.map((row, index) => {
    const action = (
      <div key={index}>
        <Link to={`/display/${row["id"]}`}>
          <button className="btn btn-primary m-r-1em"><VisibilityIcon/></button>
        </Link>
        {/* <button
        onClick={() => {
          let answer = window.confirm("Are you sure to delete this?");
          if (answer) this.handleDelete(row["userId"]);
        }}
        className="btn btn-danger"
      >
        Delete
      </button> */}
      </div>
    );
    return { ...row, action };
  });

  return (
    <div className="container-fluid">
      {/* Page Heading */}
      <h1 className="h3 mb-0 text-gray-800">All Clients</h1>
      <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
        <DataTable
          columns={columns}
          data={finalData}
          highlightOnHover={true}
          pagination={true}
          paginationServer={true}
          onChangePage={(page, totalRows) => newElement(page, totalRows)}
          paginationTotalRows={nombreTotalElement}
          paginationPerPage={nbrEltperPage}
          paginationRowsPerPageOptions={[5, 10, 15, 20, 25]}
          onChangeRowsPerPage={(currentRowsPerPage, currentPage) =>
            perPage(currentRowsPerPage, currentPage)
          }
          paginationResetDefaultPage={resetFirstPage}
          paginationComponentOptions={{
            rowsPerPageText: "Elements par page:",
            rangeSeparatorText: "de",
            noRowsPerPage: false,
          }}
          progressPending={pending}
          noHeader={true}
        />
      </div>
    </div>
  );
}
