import {
  AiFillHome,
  AiFillMedicineBox,
  AiFillPlusCircle,
  AiOutlineAppstoreAdd,
  AiOutlineMedicineBox,
} from "react-icons/ai";
import { ImNewspaper } from "react-icons/im";
import {
  MdArrowForwardIos,
  MdOutlineGroups,
  MdLogout,
  MdPrivacyTip,
} from "react-icons/md";
import { GiMedicines } from "react-icons/gi";
import { BiSupport } from "react-icons/bi";
import { BsFileCheck } from "react-icons/bs";

export const navList = [
  { name: "home", link: "/", icon: <AiFillHome /> },

  {
    name: "medicine",
    list: [
      { name: "Add", link: "/addmed", icon: <AiFillPlusCircle /> },
      { name: "inventory", link: "/inventory", icon: <AiOutlineAppstoreAdd /> },
    ],
    icon: <GiMedicines />,
    expand: <MdArrowForwardIos />,
  },
  { name: "news Feed", link: "/news", icon: <ImNewspaper /> },
  { name: "support", link: "/inventory", icon: <BiSupport /> },
  { name: "about", link: "/about", icon: <MdOutlineGroups /> },
  { name: "privacy policy", link: "/privacy", icon: <MdPrivacyTip /> },
  {
    name: "terms and condition",
    link: "/terms",
    icon: <BsFileCheck />,
  },
  { name: "sign out", link: "/inventory", icon: <MdLogout /> },
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
