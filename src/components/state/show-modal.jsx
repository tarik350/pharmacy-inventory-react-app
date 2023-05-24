import { createContext, useState } from "react";
import { useAsyncError } from "react-router-dom";
// import { RiContactsBookLine } from "react-icons/ri";

const ShowModalContext = createContext({
  deletedMedicineIds: [],
  addList: (value) => {},
  removeList: (value) => {},
  clearList: () => {},
});

export function ShowModalProvider(props) {
  const [deletedMedicineIds, setDeletedMedicineIds] = useState([]);
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

  const clearList = () => {
    setDeletedMedicineIds([]);
  };

  const context = {
    deletedMedicineIds: deletedMedicineIds,
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
