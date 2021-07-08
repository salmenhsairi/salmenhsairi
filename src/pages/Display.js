import React,{Component} from "react";
import axios from "axios";

//http://localhost/applicationMTD/api/fetchAllClients.php
//function Display({ toggleDisplay })
class Display extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      telephone: "",
      email: "",
      id: "",
      handicap: "",
      ville: "",
      lieu: "",
      type: "",
    };
  }

  fetchData = () => {
    return axios
      .get(
        `http://localhost/applicationMTD/api/displayClient.php?id=${this.props.match.params.id}`,
        {
          validateStatus: false,
        }
      )
      .then((result) => {
        const row = result.data;
        Object.keys(row).forEach((key) => {
          if (!row[key]) {
            row[key] = "no data";
          }
        });
        return row;
      })
      .catch((error) => alert(error));
  };

  componentDidMount() {
    this.fetchData().then((data) => {
      this.setState(data);
    });
    //  this.props.toggleDisplay();
  }

  componentWillUnmount() {
    //  this.props.toggleDisplay();
  }
  render() {
    return (
      <div className="container" style={{ marginTop: "10%" }}>
        <div className="row gutters">
          <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
            <div className="card h-100">
              <div className="card-body">
                <div className="account-settings">
                  <div className="user-profile">
                    <div className="user-avatar">
                      <img
                        src="https://uctlanguagecentre.com/wp-content/uploads/2020/05/avatar.png"
                        alt="Maxwell Admin"
                        style={{
                          objectFit: "contain",
                          width: "100%",
                          marginBottom: "10px",
                        }}
                      />
                    </div>
                    <h5 className="user-name">{this.state.name}</h5>
                    <h6 className="user-email">{this.state.email}</h6>
                  </div>
                  <div className="about">
                    <h5>About</h5>
                    <p>
                      I'm Yuki. Full Stack Designer I enjoy creating
                      user-centric, delightful and human experiences.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
            <div className="card h-100">
              <div className="card-body">
                <div className="row gutters">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h6 className="mb-2 text-primary">Personal Details</h6>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="fullName">Full Name</label>
                      <input
                        disabled
                        type="text"
                        className="form-control"
                        id="fullName"
                        value={this.state.name}
                        placeholder="Enter full name"
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="eMail">Email</label>
                      <input
                        disabled
                        type="email"
                        className="form-control"
                        id="eMail"
                        value={this.state.email}
                        placeholder="Enter email ID"
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="phone">Phone</label>
                      <input
                        disabled
                        type="text"
                        className="form-control"
                        value={this.state.telephone}
                        id="phone"
                        placeholder="Enter phone number"
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="id">Client Id</label>
                      <input
                        disabled
                        type="url"
                        className="form-control"
                        id="id"
                        value={this.state.id}
                        placeholder="Website url"
                      />
                    </div>
                  </div>
                </div>
                <div className="row gutters">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h6 className="mt-3 mb-2 text-primary">Other Info</h6>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="type">Type</label>
                      <input
                        disabled
                        type="name"
                        className="form-control"
                        id="type"
                        value={this.state.type}
                        placeholder="Enter Street"
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="ciTy">City</label>
                      <input
                        disabled
                        type="name"
                        className="form-control"
                        id="ciTy"
                        value={this.state.ville}
                        placeholder="Enter City"
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="handicap">Handicap</label>
                      <input
                        disabled
                        type="text"
                        className="form-control"
                        id="handicap"
                        value={this.state.handicap}
                        placeholder="Enter State"
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="lieu">Lieu</label>
                      <input
                        disabled
                        type="text"
                        className="form-control"
                        id="lieu"
                        value={this.state.lieu}
                        placeholder="Zip Code"
                      />
                    </div>
                  </div>
                </div>
                <div className="row gutters">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="text-right">
                      <a href="/">
                        <button
                          type="button"
                          id="submit"
                          name="submit"
                          className="btn btn-secondary"
                        >
                          Cancel
                        </button>
                      </a>
                      <button
                        type="button"
                        id="submit"
                        name="submit"
                        className="btn btn-primary"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Display;
