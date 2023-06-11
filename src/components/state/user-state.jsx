import { createContext, useState } from "react";
import { useAsyncError } from "react-router-dom";
// import { RiContactsBookLine } from "react-icons/ri";

const userContext = createContext({
  user: {},
  addUser: (user) => {},
  clearUser: () => {},
});

export function UserProvider(props) {
  const [deletedMedicineIds, setDeletedMedicineIds] = useState([]);
  const [user, setUser] = useState({});

  // let deletedMedicineIds = [];

  const addUser = (user) => {
    // deletedMedicineIds.push(value);
    console.log("user add to state");

    setUser(user);
  };

  //   const removeUser = (value) => {
  //     setDeletedMedicineIds((current) => {
  //       return current.filter((e) => e !== value);
  //     });
  //     // deletedMedicineIds = deletedM edicineIds.filter((e) => e !== value);
  //   };

  const clearUser = () => {
    setUser({});
  };

  const context = {
    user: user,
    addUser: removeList,
    clearUser: clearList,
  };

  return (
    <userContext.Provider value={context}>
      {props.children}
    </userContext.Provider>
  );
}

export default userContext;
