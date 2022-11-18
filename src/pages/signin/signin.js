import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../../App";
import Button from "../../components/Button";
import { Input } from "../signup/signup";
import buttonStyles from "../../css/Button.module.css";
import inputStyles from "../../css/Input.module.css";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setLoginInfo } = useContext(MyContext);
  const navigate = useNavigate();

  function onClick(e) {
    e.preventDefault();
    axios
      .post("http://localhost:8080/users/sign_in", { email, password })
      .then(res => {
        if (!res.data) {
          alert("이메일 혹은 비밀번호가 틀렸습니다.");
        } else {
          localStorage.setItem("userInfo", JSON.stringify(res.data));
          setLoginInfo(res.data);
          navigate(-1);
        }
      });
  }

  return (
    <div className={inputStyles.login}>
      <form>
        <h3>로그인</h3>
        <div>
          <Input
            placeholder="Email"
            onChange={e => setEmail(e.target.value)}
            value={email}
          ></Input>
          <Input
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
            value={password}
          ></Input>
        </div>
        <div className={buttonStyles.buttonFlex}>
          <Button value="로그인" onClick={onClick}></Button>
          <Link to="/signup">
            <Button value="회원가입"></Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
