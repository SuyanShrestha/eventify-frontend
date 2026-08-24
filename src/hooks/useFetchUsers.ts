import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { usersData } from "../constants/data";
import { setUsers } from "../store/usersSlice";

const useFetchUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadUsers = async () => {
      //   const usersData = await fetchUsersFromAPI();
      dispatch(setUsers(usersData));
    };

    loadUsers();
  }, [dispatch]);
};

export default useFetchUsers;
