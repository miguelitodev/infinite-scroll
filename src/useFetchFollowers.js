import { useCallback, useState } from "react";
import axios from "axios";

const useFetchFollowers = () => {
  const [followers, setFollowers] = useState([]);
  const [followersError, setFollowersError] = useState("");
  const [followersLoading, setFollowersLoading] = useState(false);

  const getFollowers = useCallback(async (currentPage) => {
    setFollowersLoading(true);

    axios({
      url: "https://api.github.com/users/miguelrisquelme/followers",
      method: "GET",
      params: {
        per_page: 10,
        page: currentPage,
        order: "DESC",
      },
    })
      .then((newFollowers) => {
        setFollowers((prevFollowers) => [
          ...prevFollowers,
          ...newFollowers.data,
        ]);
      })
      .then((e) => setFollowersError(e));

    setFollowersLoading(false);
  }, []);

  return { followers, followersError, followersLoading, getFollowers };
};

export default useFetchFollowers;
