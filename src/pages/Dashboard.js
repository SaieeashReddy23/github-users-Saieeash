import React from "react";
import { Info, Repos, User, Search, Navbar } from "../components";
import loadingImage from "../images/preloader.gif";
import { GithubContext, useGlobalContext } from "../context/context";

const Dashboard = () => {
  const { loading } = useGlobalContext();
  return (
    <main>
      <Navbar />
      <Search />
      {loading ? (
        <div>
          <img className="loading-img" src={loadingImage} alt="loading" />
        </div>
      ) : (
        <div>
          <Info />
          <User />
          <Repos />
        </div>
      )}
    </main>
  );
};

export default Dashboard;
