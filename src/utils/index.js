import { proxy } from "valtio";

const state = proxy({
  activeIndex: 2,
});

export default state;
