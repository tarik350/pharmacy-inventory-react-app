import {
  AiFillHome,
  AiFillMedicineBox,
  AiFillPlusCircle,
  AiOutlineAppstoreAdd,
  AiOutlineMedicineBox,
} from "react-icons/ai";
import { MdArrowForwardIos } from "react-icons/md";
import { GiMedicines } from "react-icons/gi";

export const navList = [
  { name: "home", link: "/", icon: <AiFillHome /> },

  {
    name: "medicine",
    list: [
      { name: "Add", link: "/addmed", icon: <AiFillPlusCircle /> },
      { name: "inventory", link: "/inventory", icon: <AiOutlineAppstoreAdd /> },
    ],
    // link: "/inventory",
    icon: <GiMedicines />,
    expand: <MdArrowForwardIos />,
  },

  { name: "suport", link: "/inventory", icon: <AiOutlineAppstoreAdd /> },
  { name: "about", link: "/inventory", icon: <AiOutlineAppstoreAdd /> },
  { name: "sign out", link: "/inventory", icon: <AiOutlineAppstoreAdd /> },
];

export const countryCode = [
  { name: "nigeria", code: "ng" },
  { name: "india", code: "in" },
  { name: "USA", code: "us" },
];

export const inventoryFields = [
  {
    firstRow: [
      { lable: "medicine Name" },
      { lable: "Generic name" },
      { lable: "SKU" },
      { lable: "Weight" },
    ],
  },
  {
    secondRow: [
      { lable: "Catagory" },
      { lable: "Manufacturer" },
      { lable: "Price" },
      { lable: "Stock(Box)" },
    ],
  },
  { thirdRow: [{ lable: "Expire Date" }, { lable: "Status" }] },
];
