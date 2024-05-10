import { proxy } from "valtio";

const state = proxy({
  activeIndex: 1,
});

export default state;
