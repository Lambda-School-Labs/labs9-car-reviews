import React from "react";
import "./LandingPage.css";
import { Input, Button } from "reactstrap";
import Navigation from "../Navigation/Navigation";
import Search from "../Search/Search";

const LandingPage = () => {
  return (
    <div className="splashpage" style = {{overflow: 'hidden'}}>
      <Navigation />
      <div align="center" style={{ margin: "50px 0", maxHeight: "350px" }}>
        <img
          src={require("../../Images/SongbirdLogo1.png")}
          alt="Songbird logo"
          width="75%"
        />
      </div>
      <h2 style={{ color: "white" }}>
        There are a million songs out there. <br />Let your opinions on them take flight...
      </h2>
      <div align="center">
        <a href="/login">
          <Button color="secondary" size="lg">
            Start Reading Reviews Now!
          </Button>
        </a>
      </div>
      <div>
        <Search />
        {/* <Input
          type="search"
          name="search"
          id="search"
          placeholder="Search music"
          style={{
            margin: "50px auto",
            padding: "5px",
            height: "30px",
            maxWidth: "800px",
            backgroundColor: "#495057",
            color: "#fff",
            width: "50%"
          }}
        /> */}
      </div>
  );
};

export default LandingPage;
