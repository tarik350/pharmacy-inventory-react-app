import { createContext, useState } from "react";
import { useAsyncError } from "react-router-dom";
// import { RiContactsBookLine } from "react-icons/ri";

const ShowModalContext = createContext({
  deletedMedicineIds: [],
  user: {},
  addList: (value) => {},
  removeList: (value) => {},
  clearList: () => {},
  addUser: (value) => {},
  clearUser: () => {},
});

export function ShowModalProvider(props) {
  const [deletedMedicineIds, setDeletedMedicineIds] = useState([]);
  const [user, setUser] = useState({});
  // let deletedMedicineIds = [];

  const addList = (value) => {
    // deletedMedicineIds.push(value);
    setDeletedMedicineIds((current) => [...current, value]);
  };

  const removeList = (value) => {
    setDeletedMedicineIds((current) => {
      return current.filter((e) => e !== value);
    });
    // deletedMedicineIds = deletedM edicineIds.filter((e) => e !== value);
  };
  const addUser = (value) => {
    setUser(value);
    console.log(user);
  };

  const clearUser = () => {
    console.log("clearing");
  };

  const clearList = () => {
    // setDeletedMedicineIds([]);
    console.log("clearing ");
  };

  const context = {
    deletedMedicineIds: deletedMedicineIds,
    user: user,
    addUser: addUser,
    clearUser: clearUser,
    addList: addList,
    removeList: removeList,
    clearList: clearList,
  };

  return (
    <ShowModalContext.Provider value={context}>
      {props.children}
    </ShowModalContext.Provider>
  );
}

export default ShowModalContext;
