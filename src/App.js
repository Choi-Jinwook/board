import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Articles from "./pages/articles";
import MakePost from "./pages/articles/make";
import SeePost from "./pages/articles/see";
import Signin from "./pages/signin/signin";
import SignUp from "./pages/signup/signup";
import { createContext, useState } from "react";
import InsertPost from "./pages/articles/insert";
export const MyContext = createContext();

function App() {
  const [loginInfo, setLoginInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );

  return (
    <MyContext.Provider value={{ loginInfo, setLoginInfo }}>
      <Router>
        <Routes>
          <Route path="/" element={<Link to="/articles">go articles</Link>} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/make" element={<MakePost />}></Route>
          <Route path="/articles/:id" element={<SeePost />}></Route>
          <Route path="/articles/:id/insert" element={<InsertPost />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
        </Routes>
      </Router>
    </MyContext.Provider>
  );
}

export default App;
