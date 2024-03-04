import { atom } from "recoil";

const defaultUserThreads = localStorage.getItem("user-info") || "null";

const userAtom = atom({
  key: "userAtom",
  default: JSON.parse(defaultUserThreads),
});

export default userAtom;
