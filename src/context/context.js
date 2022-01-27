import React, { useState, useEffect, Children } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";
import { useContext } from "react";

const rootUrl = "https://api.github.com";

const limitUrl = "https://api.github.com/rate_limit";

const userUrl = "https://api.github.com/users/";

const reposUrl = "https://api.github.com/users/john-smilga/repos?per_page=100";

const followersUrl = "https://api.github.com/users/john-smilga/followers";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(mockUser);
  const [followers, setFollowers] = useState(mockFollowers);
  const [repos, setRepos] = useState(mockRepos);
  const [searchInput, setSearchInput] = useState("");
  const [limit, setLimit] = useState(60);

  const getLimit = async () => {
    try {
      const res = await fetch(limitUrl);
      const response = await res.json();
      setLimit(response.rate.remaining);
    } catch (error) {
      console.log("some error occured while fetching limit");
    }
  };

  const getUser = async (use) => {
    try {
      const res = await fetch(userUrl + use);
      const response = await res.json();
      setUser(response);
    } catch (error) {
      console.log("some error occured while fetching User");
    }
  };

  const getRepo = async (use) => {
    try {
      const res = await fetch(`${userUrl}${use}/repos?per_page=100`);
      const response = await res.json();
      setRepos(response);
    } catch (error) {
      console.log("some error occured while fetching Repos");
    }
  };

  const getFollowers = async (use) => {
    try {
      const res = await fetch(`${userUrl}${use}/followers`);
      const response = await res.json();
      setFollowers(response);
    } catch (error) {
      console.log("some error occured while fetching followers");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(searchInput + " is called");
    getUser(searchInput);
    getFollowers(searchInput);
    getRepo(searchInput);

    setSearchInput("");
  };

  useEffect(() => {
    getLimit();
    console.log(user);
    console.log("useEffect called");
  }, [user]);

  return (
    <AppContext.Provider
      value={{
        user,
        followers,
        repos,
        searchInput,
        limit,
        setSearchInput,
        handleSearch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
