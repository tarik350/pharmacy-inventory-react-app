import {
  AiFillHome,
  AiFillPlusCircle,
  AiOutlineAppstoreAdd,
} from "react-icons/ai";

export const navList = [
  { name: "home", link: "/", icon: <AiFillHome /> },
  { name: "Add", link: "/addmed", icon: <AiFillPlusCircle /> },
  { name: "inventory", link: "/inventory", icon: <AiOutlineAppstoreAdd /> },
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
