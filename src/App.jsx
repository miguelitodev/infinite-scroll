import React, { useEffect, useState } from "react";
import useFetchFollowers from "./useFetchFollowers";

import "./styles.css";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const { getFollowers, followers, followersError, followersLoading } =
    useFetchFollowers();

  useEffect(() => getFollowers(currentPage), [currentPage]);

  useEffect(() => {
    const sentinelElement = document.querySelector("#sentinel");
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setCurrentPage((prevCurrentPage) => prevCurrentPage + 1);
      }
    });

    intersectionObserver.observe(sentinelElement);
    return () => intersectionObserver.disconnect();
  }, []);

  return (
    <div className="container">
      <header className="header">
        <h1>Infinite Scroll</h1>
        <p>
          This project was made for study about Infinite Scroll, getting data
          from Github API
        </p>
        <br />
        <p>Current page: {currentPage}</p>
      </header>
      <main className="main">
        {followersLoading && <span>Loading...</span>}
        {followersError && <span>Error!!</span>}
        <ul>
          {followers.map((follower) => (
            <li key={follower.login} className="card">
              <img
                className="card__picture"
                src={`https://avatars.githubusercontent.com/u/${follower.id}`}
                alt={`${follower.login} avatar`}
              />
              <div className="info">
                <span className="info__name">{follower.login}</span>
                <a className="info__link" href={follower.html_url}>
                  Look profile
                </a>
              </div>
            </li>
          ))}
          <li id="sentinel"></li>
        </ul>
      </main>
      <footer className="footer">
        <p>
          Made by{" "}
          <a href="https://github.com/miguelrisquelme">Miguel Riquelme</a> with
          ❤
        </p>
      </footer>
    </div>
  );
}

export default App;
