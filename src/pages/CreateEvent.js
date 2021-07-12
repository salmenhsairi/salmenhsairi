import React, { Component } from "react";
import "./CreateEvent.css";
import Select from "react-select";
import AudiotrackIcon from "@material-ui/icons/Audiotrack";
import VideocamIcon from "@material-ui/icons/Videocam";
import ImageIcon from "@material-ui/icons/Image";
import axios from "axios";


class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      check: false,
      titreFrancais: "",
      titraArabe: "",
      descFrancais: "",
      descArabe: "",
      adresse: "",
      client: "",
      lieu: "",
      categorie: "",
      type: "",
      ticket: "",
      image: { name: null, content: null },
      audio: { name: null, content: null },
      video: { name: null, content: null },
      selectClient: [],
      selectCategorieEvent: [],
      selectLieu: [],
      valide: true,
    };
  }

  fetchSelect(tableId) {
    return axios.get(
      `http://localhost/applicationMTD/api/select.php?table=${tableId}`
    );
  }

  saveFile(name, content) {
    // const fd = new FormData();
    // fd.append("file", content);
    return axios.post(
      `http://localhost/applicationMTD/api/saveFile.php?file=${name}`,
      JSON.stringify({ file: content })
    );
  }

  componentDidMount() {
    this.fetchSelect(1).then((res1) => {
      this.setState({ selectClient: res1.data });
    });
    this.fetchSelect(2).then((res2) => {
      this.setState({ selectCategorieEvent: res2.data });
    });
    this.fetchSelect(3).then((res3) => {
      this.setState({ selectLieu: res3.data });
    });
  }

  validate = (target) => {
    target.checkValidity()
      ? target.classList.add("is-valid")
      : target.classList.add("is-invalid");
  };

  handleChange = (e) => {
    e.target.classList.remove("is-valid");
    e.target.classList.remove("is-invalid");
    this.setState((state) => {
      state[`${e.target.name}`] = e.target.value;
      state.check = true;
      return state;
    });
    this.validate(e.target);
  };

  handleInput = (e) => {
    this.setState((state) => {
      state[`${e.target.id}`].name = e.target.files[0].name;
    });
    const file = e.target.files[0];
    e.target.classList.remove("is-valid");
    e.target.classList.add("is-invalid");
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      e.target.classList.remove("is-invalid");
      e.target.classList.add("is-valid");
      this.setState((state) => {
        state[`${e.target.id}`].content = event.target.result;
      });
    };
  };

  //before submit handler function we need to create a function which handles input files save
  submitHandler = (e) => {
    e.preventDefault();
    const fields = ['image', 'audio', 'video'];
    for (let field in fields) {
      const fieldState = this.state[`${fields[field]}`];
      if (fieldState.name) {
        this.saveFile(fieldState.name, fieldState.content);
      }
    }
    axios.post(
      "http://localhost/applicationMTD/api/createEvent.php",
      JSON.stringify({
        image: this.state.image.name,
        video: this.state.video.name,
        audio: this.state.audio.name,
        titre: this.state.titreFrancais,
        titre_ar: this.state.titraArabe,
        description: this.state.descFrancais,
        description_ar: this.state.descArabe,
        adresse: this.state.adresse,
        lieu_id: this.state.lieu.value,
        client_id: this.state.client.value,
        categorieevent_id: this.state.categorie.value,
        type: this.state.type.value,
        ticket: this.state.ticket.value,
        valide: this.state.valide ? 1 : 0,
      })
    ).then((res) => {
       window.location.reload(false);
    });
  };
  render() {
    const ticket = [
      { label: "Gratuit", value: "0" },
      { label: "Payante", value: "1" },
      { label: "Sans ticket", value: "2" },
    ];
    const type = [
      { label: "Lieu", value: "1" },
      { label: "general", value: "2" },
    ];

    return (
      <div className="page-wrapper bg-gra-03 p-t-45 p-b-50">
        <div className="wrapper wrapper--w790">
          <div className="card card-5">
            <div className="card-heading">
              <h2 className="title">Event Registration Form</h2>
            </div>
            <div className="card-body">
              <form onSubmit={this.submitHandler} noValidate>
                <div className="form-row">
                  <div className="name">
                    {this.state.check &&
                      (!this.state.titraArabe || !this.state.titreFrancais) && (
                        <span style={{ color: "red", fontSize: "18px" }}>
                          *
                        </span>
                      )}
                    Titre
                  </div>
                  <div className="value">
                    <div className="row row-space">
                      <div className="col-2">
                        <div className="input-group-desc">
                          <input
                            className="input--style-5 form-control"
                            type="text"
                            name="titreFrancais"
                            placeholder="titre francais"
                            required
                            value={this.state.titreFrancais}
                            onChange={(e) => this.handleChange(e)}
                          />
                        </div>
                      </div>
                      <div className="col-2">
                        <div className="input-group-desc">
                          <input
                            className="input--style-5 form-control"
                            type="text"
                            name="titraArabe"
                            placeholder="titre arabe"
                            required
                            value={this.state.titraArabe}
                            onChange={(e) => this.handleChange(e)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="name">
                    {this.state.check &&
                      (!this.state.descFrancais || !this.state.descArabe) && (
                        <span style={{ color: "red", fontSize: "18px" }}>
                          *
                        </span>
                      )}
                    Description
                  </div>
                  <div className="value">
                    <div className="row row-space">
                      <div className="col-2">
                        <div className="input-group-desc">
                          <input
                            className="input--style-5 form-control"
                            type="text"
                            name="descFrancais"
                            placeholder="description francai"
                            value={this.state.descFrancais}
                            onChange={(e) => this.handleChange(e)}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-2">
                        <div className="input-group-desc">
                          <input
                            className="input--style-5 form-control"
                            type="text"
                            name="descArabe"
                            placeholder="description arabe"
                            value={this.state.descArabe}
                            onChange={(e) => this.handleChange(e)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="name">
                    {this.state.check && !this.state.adresse && (
                      <span style={{ color: "red", fontSize: "18px" }}>*</span>
                    )}
                    Adresse
                  </div>
                  <div className="value">
                    <div className="input-group">
                      <input
                        className="input--style-5 form-control"
                        type="text"
                        name="adresse"
                        placeholder="adresse arabe"
                        value={this.state.adresse}
                        onChange={(e) => this.handleChange(e)}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="name">
                    {this.state.check && !this.state.client && (
                      <span style={{ color: "red", fontSize: "18px" }}>*</span>
                    )}
                    Client
                  </div>
                  <div className="value">
                    <div className="input-group">
                      <Select
                        className="select__bg"
                        options={this.state.selectClient}
                        value={this.state.client}
                        onChange={(selected) =>
                          this.setState({ client: selected })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="name" style={{ fontSize: "14px" }}>
                    {this.state.check &&
                      (!this.state.lieu || !this.state.categorie) && (
                        <span style={{ color: "red", fontSize: "18px" }}>
                          *
                        </span>
                      )}
                    Lieu et categorie
                  </div>
                  <div className="value">
                    <div className="input-group">
                      <Select
                        className="select__sm"
                        options={this.state.selectLieu}
                        onChange={(selected) =>
                          this.setState({ lieu: selected })
                        }
                        value={this.state.lieu}
                      ></Select>
                      <Select
                        className="select__sm"
                        options={this.state.selectCategorieEvent}
                        onChange={(selected) =>
                          this.setState({ categorie: selected })
                        }
                        value={this.state.categorie}
                      ></Select>
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="name">
                    {this.state.check &&
                      (!this.state.type || !this.state.ticket) && (
                        <span style={{ color: "red", fontSize: "18px" }}>
                          *
                        </span>
                      )}
                    Type et Ticket
                  </div>
                  <div className="value">
                    <div className="input-group">
                      <Select
                        className="select__sm"
                        options={type}
                        value={this.state.type}
                        onChange={(selected) =>
                          this.setState({ type: selected })
                        }
                      ></Select>
                      <Select
                        className="select__sm"
                        options={ticket}
                        value={this.state.ticket}
                        onChange={(selected) =>
                          this.setState({ ticket: selected })
                        }
                        placeholder="select ticket"
                      ></Select>
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="name">import des fichiers</div>
                  <div className="value">
                    <div className="input-group__files">
                      <div className="file-input">
                        <label htmlFor="image">
                          <ImageIcon />
                        </label>
                        <input
                          className="form-control"
                          type="file"
                          id="image"
                          onChange={this.handleInput}
                          accept="image/*"
                        />
                      </div>
                      <div className="file-input">
                        <label htmlFor="audio">
                          <AudiotrackIcon />{" "}
                        </label>
                        <input
                          className="form-control"
                          type="file"
                          id="audio"
                          onChange={this.handleInput}
                          accept="audio/*"
                        />
                      </div>
                      <div className="file-input">
                        <label htmlFor="video">
                          <VideocamIcon />{" "}
                        </label>
                        <input
                          className="form-control"
                          type="file"
                          id="video"
                          onChange={this.handleInput}
                          accept="video/*"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <label className="label label--block">Etat Valide ?</label>
                  <div className="p-t-15">
                    <label className="radio-container m-r-55">
                      Yes
                      <input
                        type="radio"
                        defaultChecked="checked"
                        name="valid"
                        onChange={() =>
                          this.setState({ valide: !this.state.valide })
                        }
                      />
                      <span className="checkmark" />
                    </label>
                    <label className="radio-container">
                      No
                      <input
                        type="radio"
                        name="valid"
                        onChange={() =>
                          this.setState({ valide: !this.state.valide })
                        }
                      />
                      <span className="checkmark" />
                    </label>
                  </div>
                </div>
                <div>
                  <button
                    className="btn btn--radius-2 btn--red"
                    type="submit"
                    disabled={
                      !this.state.titraArabe ||
                      !this.state.titreFrancais ||
                      !this.state.descArabe ||
                      !this.state.descFrancais ||
                      !this.state.adresse ||
                      !this.state.lieu ||
                      !this.state.categorie ||
                      !this.state.client ||
                      !this.state.ticket ||
                      !this.state.type
                    }
                  >
                    Create Event
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateEvent;
