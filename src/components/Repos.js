import React from "react";
import styled from "styled-components";
import { GithubContext, useGlobalContext } from "../context/context";
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from "./Charts";
const Repos = () => {
  const { repos } = useGlobalContext();

  const getRepos = repos.reduce((total, item) => {
    const { full_name, stargazers_count, forks } = item;
    if (!full_name) {
      return total;
    }

    if (!total[full_name]) {
      total[full_name] = {
        label: full_name,
        value: stargazers_count,
        forks: forks,
      };
    } else {
      total[full_name] = {
        label: full_name,
        value: total[full_name].value + stargazers_count,
        forks: total[full_name].forks + forks,
      };
    }
    return total;
  }, {});

  const languages = repos.reduce((total, item) => {
    const { language, stargazers_count } = item;
    if (!language) {
      return total;
    }
    if (!total[language]) {
      total[language] = { label: language, value: 1, stars: stargazers_count };
    } else {
      total[language] = {
        label: language,
        value: total[language].value + 1,
        stars: total[language].stars + stargazers_count,
      };
    }
    return total;
  }, {});

  const mostUsedLanguage = Object.values(languages)
    .sort((a, b) => {
      return b.value - a.value;
    })
    .slice(0, 5);

  const mostStarsLanguage = Object.values(languages)
    .sort((a, b) => {
      return b.stars - a.stars;
    })
    .map((item) => {
      item.value = item.stars;
      return item;
    })
    .slice(0, 5);

  const mostPopularRepos = Object.values(getRepos)
    .sort((a, b) => {
      return b.value - a.value;
    })
    .slice(0, 5);

  const mostForkedRepos = Object.values(getRepos)
    .sort((a, b) => {
      return b.forks - a.forks;
    })
    .map((item) => {
      item.value = item.forks;
      return item;
    })
    .slice(0, 5);

  const chartData = [];
  return (
    <Wrapper className="section section-center">
      <Pie3D chartData={mostUsedLanguage} />
      <Column3D chartData={mostPopularRepos} />

      <Doughnut2D chartData={mostStarsLanguage} />
      <Bar3D chartData={mostForkedRepos} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
