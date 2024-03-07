import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./Pages/Auth.tsx";
// import Dashboard from "./Pages/Dashboard.tsx";
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom.ts";
import Blogs from "./Pages/Blogs.tsx";

import { Blog } from "./Pages/Blog.tsx";

function App() {
  const user = useRecoilValue(userAtom);
  console.log(JSON.stringify(user));
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Blogs /> : <Auth />} />
        <Route path="/blog" element={<Blogs />} />
        <Route path="/blog/:id" element={<Blog />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
