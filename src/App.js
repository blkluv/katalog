import React, { useState } from "react";
import "./style.css";

const initialPerson = [
  {
    id: 1,
    category: "Photographer",
    name: "Emmy Park",
    email: "Emmy@emmypark.com",
    phone: "111-222-3333",
    portfolio: "http://www.google.com",
    relevantWork: "http://www.google.com",
    country: "United States",
    state: "New York",
    city: "New York",
    upVote: 1,
    downVote: 0,
  },
  {
    id: 2,
    category: "Video",
    name: "Person Two",
    email: "Person@emmypark.com",
    phone: "111-444-3333",
    portfolio: "http://www.google.com",
    relevantWork: "http://www.google.com",
    country: "England",
    state: "",
    city: "London",
    upVote: 10,
    downVote: 0,
  },

  {
    id: 3,
    category: "Stylist",
    name: "Person Three",
    email: "Person@park.com",
    phone: "111-444-3333",
    portfolio: "http://www.google.com",
    relevantWork: "http://www.google.com",
    country: "England",
    state: "",
    city: "London",
    upVote: 0,
    downVote: 0,
  },
  {
    id: 4,
    category: "Stylist",
    name: "Person Four",
    email: "Person@park.com",
    phone: "111-444-3333",
    portfolio: "http://www.google.com",
    relevantWork: "http://www.google.com",
    country: "United States",
    state: "New York",
    city: "Brooklyn",
    upVote: 0,
    downVote: 0,
  },
];

function App() {
  return (
    <>
      {/* HEADER */}
      <nav className="navbar navbar-expand justify-content-between w-100">
        <div className="container-fluid">
          <h2 className="logoName ps-2">KATALOG</h2>
          <div className="d-flex flex-row">
            <button
              className="button d-flex align-items-center fs-6 px-2"
              id="login"
            >
              LOGIN
            </button>
            <button className="button d-flex align-items-center px-2">|</button>

            <button
              className="button d-flex align-items-center fs-6 px-2"
              id="sign-up"
            >
              SIGN UP
            </button>
            <button className="button d-flex align-items-center px-2">
              <img
                src="/assets/toggle.svg"
                className="add"
                height="35"
                alt="add"
                id="toggle"
              />
            </button>
            <a
              href="https://github.com/JesacaLin/katalog"
              target="_blank"
              rel="noreferrer"
              className="text-reset text-decoration-none d-flex align-items-center px-2 me-2"
            >
              <img
                src="https://raw.githubusercontent.com/JesacaLin/dev-kitty/9b9c8e0d370ed7f93549104a1d86771704043b87/public/img/Github.svg"
                className="add"
                height="30"
                alt="github link"
              />
            </a>
          </div>
        </div>
      </nav>
      <main className="main container-fluid px-4 text-center">
        <div className="row mt-5">
          <aside className="sidenav col-lg-3 mt-5">
            <LocationNav />
          </aside>
          <div className="col-lg-1 gap"></div>
          <section className="addSearchModalCards col-lg-8 mt-3">
            <aside className="row mt-5">
              <SearchBar />
              <Modal />
            </aside>
            <CardContainer />
          </section>
        </div>
      </main>
    </>
  );
}

const LocationButton = ({ location }) => (
  <button className="button mt-4" id="states">
    {location}
  </button>
);

//TODO-->filters out duplicates, empty values, undefined
function LocationNav() {
  const uniqueStates = [
    ...new Set(
      initialPerson
        .filter((person) => person.state && person.state.length > 0)
        .map((person) => person.state)
    ),
  ];
  const uniqueCountries = [
    ...new Set(
      initialPerson
        .filter(
          (person) =>
            person.country &&
            person.country.length > 0 &&
            person.country.toLowerCase() !== "united states"
        )
        .map((person) => person.country)
    ),
  ];
  return (
    <ul className="container-for-buttons mt-5">
      <h6 className="location">UNITED STATES</h6>
      {uniqueStates.map((state, index) => (
        <LocationButton key={index} location={state} />
      ))}
      <h6 className="location mt-5">INTERNATIONAL</h6>
      {uniqueCountries.map((country, index) => (
        <LocationButton key={index} location={country} />
      ))}
    </ul>
  );
}

//this code was unable to filter out duplicates
/*
function LocationNav() {
  return (
    <ul className="container-for-buttons mt-5">
      <h6 className="location">UNITED STATES</h6>
      {initialPerson
        .filter(
          (person) => person.state.length > 1 && person.state !== undefined
        )
        .map((person) => (
          <LocationButton key={person.id} location={person.state} />
        ))}
      <h6 className="location mt-5">INTERNATIONAL</h6>
      {initialPerson
        .filter(
          (person) =>
            person.country.length > 1 &&
            person.country !== undefined &&
            person.country.toLowerCase() !== "united states"
        )
        .map((person) => (
          <LocationButton key={person.id} location={person.country} />
        ))}
    </ul>
  );
}
*/

//THIS WORKS BUT IT'S MESSY
/*
function LocationState() {
  return (
    <ul className="container-for-buttons mt-5">
      <h6 className="location">UNITED STATES</h6>
      {initialPerson.map(
        (person) =>
          person.state.length > 1 && (
            <button key={person.id} className="button mt-4" id="states">
              {person.state}
            </button>
          )
      )}
      <h6 className="location mt-5">INTERNATIONAL</h6>
      {initialPerson.map(
        (person) =>
          person.country.length > 1 &&
          person.country.toLowerCase() !== "united states" && (
            <button key={person.id} className="button mt-4" id="states">
              {person.country}
            </button>
          )
      )}
    </ul>
  );
}
*/

function SearchBar() {
  return (
    <div className="addAndSearch d-flex flex-row justify-content-end">
      <button
        className="btn button btn-open"
        data-bs-toggle="modal"
        data-bs-target="#reg-modal"
      >
        <img
          src="./assets/add-dark.svg"
          className="add d-inline-block align-items-center"
          height="25"
          alt="add"
          id="add"
        />
        <span className="align-items-center fs-6 m-2 add-contributor">
          ADD A CONTRIBUTOR
        </span>
      </button>
      <form className="d-flex pe-2" role="search">
        <input
          className="form-control"
          type="search"
          placeholder="Search..."
          aria-label="Search"
          id="searchBar"
        />
        <button className="btn btn-no-outline" type="submit">
          <img
            src="./assets/search.svg"
            className="d-inline-block align-text-top px-2"
            height="25"
            alt="search"
            id="searchIcon"
          />
        </button>
      </form>
    </div>
  );
}

function Modal() {
  return (
    <section
      className="modal fade"
      id="reg-modal"
      //changing from tabindex to tabIndex
      tabIndex="-1"
      aria-labelledby="modal-title"
      aria-hidden="true"
      data-backdrop="static"
      data-keyboard="false"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg m-auto">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="container-fluid">
              <div>
                <h6 className="m-2 modal-title" id="modal-title">
                  ADD A CONTRIBUTOR
                </h6>
                <span>* indicate mandatory field</span>
              </div>
              <div className="row justify-content-center my-5">
                <form>
                  <div className="col-lg-12">
                    <div className="col-lg-4 mx-auto">
                      <label htmlFor="category" className="form-label">
                        Select a talent category*
                      </label>
                      <div className="mb-4 input-group">
                        <span className="input-group-text">
                          <i className="bi bi-tag-fill"></i>
                        </span>
                        <select className="form-select mx-auto" id="category">
                          <option value="photo" selected>
                            Photo
                          </option>
                          <option value="video">Video</option>
                          <option value="stylist">Stylist</option>
                          <option value="makeup">Makeup</option>
                          <option value="hair">Hair Stylist</option>
                          <option value="assistant">Assistant</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="row justify-content-center my-5">
                      <div className="col-lg-4">
                        <label htmlFor="name" className="form-label float-left">
                          Name*
                        </label>
                        <div className="mb-4 input-group">
                          <span className="input-group-text">
                            <i className="bi bi-person-fill"></i>
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="Bob Bobster"
                          />
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <label htmlFor="email" className="form-label">
                          Email*
                        </label>
                        <div className="mb-4 input-group">
                          <span className="input-group-text">
                            <i className="bi bi-envelope-fill"></i>
                          </span>
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="bob@bobster.com"
                          />
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <label htmlFor="phone" className="form-label">
                          Phone Number*
                        </label>
                        <div className="mb-4 input-group">
                          <span className="input-group-text">
                            <i className="bi bi-telephone-fill"></i>
                          </span>
                          <input
                            type="tel"
                            className="form-control"
                            id="phone"
                            placeholder="xxx-xxx-xxxx"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row justify-content-center my-5">
                      <div className="col-lg-6">
                        <label htmlFor="portfolio" className="form-label">
                          Portfolio
                        </label>
                        <div className="mb-4 input-group">
                          <span className="input-group-text">
                            <i className="bi bi-star-fill"></i>
                          </span>
                          <input
                            type="url"
                            className="form-control"
                            id="portfolio"
                            placeholder="http://"
                            pattern="https?://.+"
                            required
                          />
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <label htmlFor="relevantWork" className="form-label">
                          Relevant Work
                        </label>
                        <div className="mb-4 input-group">
                          <span className="input-group-text">
                            <i className="bi bi-stars"></i>
                          </span>
                          <input
                            type="url"
                            className="form-control"
                            id="relevantWork"
                            placeholder="http://"
                            pattern="https?://.+"
                            required
                          />
                        </div>
                      </div>
                      <div className="row justify-content-center my-5">
                        <div className="col-lg-4">
                          <label htmlFor="country" className="form-label">
                            Country*
                          </label>
                          <div className="mb-4 input-group">
                            <span className="input-group-text">
                              <i className="bi bi-geo-alt-fill"></i>
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              id="country"
                              value="United States"
                            />
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <label htmlFor="state" className="form-label">
                            State*
                          </label>
                          <div className="mb-4 input-group">
                            <span className="input-group-text">
                              <i className="bi bi-geo-alt-fill"></i>
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              id="state"
                              placeholder="If applicable..."
                            />
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <label htmlFor="city" className="form-label">
                            City*
                          </label>
                          <div className="input-group">
                            <span className="input-group-text">
                              <i className="bi bi-geo-alt-fill"></i>
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              id="city"
                              placeholder="Austin"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn modalBTN btn-outline-dark">
              Cancel
            </button>
            <button
              type="submit"
              className="btn modalBTN btn-outline-dark ms-3"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function CardContainer() {
  const talent = initialPerson;

  return (
    <section className="cardContainer mt-5 px-4">
      <table className="table table-borderless table-responsive-xxl talentList">
        {talent.map((fact) => (
          <tbody className="mb-5" key={fact.id}>
            <Card fact={fact} />
          </tbody>
        ))}
      </table>
    </section>
  );
}

function Card({ fact }) {
  return (
    <>
      <tr className="cardTop">
        <th scope="row" className="tableName pt-4 ps-4">
          <h5 className="name">{fact.name}</h5>
        </th>
        <td className="pt-4">{fact.category}</td>
        <td></td>
        <td></td>
        <td></td>
        <td className="pt-4">{fact.country}</td>
        <td className="pt-4">{fact.state}</td>
        <td className="pt-4">{fact.city}</td>
      </tr>
      <tr>
        <td className="pb-4 ps-4 pt-3">{fact.phone}</td>
        <td className="pt-3">{fact.email}</td>
        <td></td>
        <td></td>
        <td className="pt-3">
          <button className="btn linkButtons">
            <a href={fact.portfolio}>Portfolio</a>
          </button>
        </td>
        <td className="pt-3">
          <button className="btn linkButtons">
            <a href={fact.pastWork}>Past Work</a>
          </button>
        </td>
        <td className="">
          <button className="btn voteButton" id="upVote">
            👍 {fact.upVote}
          </button>
        </td>
        <td className="">
          <button className="btn voteButton" id="downVote">
            👎 {fact.downVote}
          </button>
        </td>
      </tr>
    </>
  );
}

export default App;
