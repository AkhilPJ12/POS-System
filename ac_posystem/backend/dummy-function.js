var dataCheck = [
  { id: 1, c_name: "Vegetables", c_img: "category-1.png" },
  { id: 2, c_name: "FRUITS", c_img: "category-2.png" },
  { id: 3, c_name: "MEAT", c_img: "category-3.png" },
  { id: 4, c_name: "DAIRY", c_img: "category-3.png" },
  { id: 5, c_name: "SWEETS", c_img: "category-3.png" },
  { id: 6, c_name: "FROZENOOD", c_img: "category-3.png" },
];
const sub_categories = [
  { sc_id: 1, sc_name: "OKRA", sc_image: "a.png", sc_price: "$10", c_id: 1 },
  { sc_id: 2, sc_name: "TOMATO", sc_image: "a.png", sc_price: "$11", c_id: 1 },
  { sc_id: 3, sc_name: "ONION", sc_image: "a.png", sc_price: "$12", c_id: 1 },
  { sc_id: 4, sc_name: "POTATO", sc_image: "a.png", sc_price: "$13", c_id: 1 },
  { sc_id: 8, sc_name: "SPINACH", sc_image: "a.png", sc_price: "$2", c_id: 1 },
  { sc_id: 9, sc_name: "CARROT", sc_image: "a.png", sc_price: "$4", c_id: 1 },
];

export function check() {
  return true;
}
export function dataCheckVal() {
  if (dataCheck != null) {
    return true;
  } else {
    return false;
  }
}

export function value() {
  return dataCheck;
}
export function subCatvalue() {
  return sub_categories;
}
