export const navList = [
  { name: "home", link: "/" },
  { name: "Add", link: "/addmed" },
  { name: "inventory", link: "/inventory" },
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
