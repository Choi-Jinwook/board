import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import inputStyles from "../../css/Input.module.css";
import buttonStyles from "../../css/Button.module.css";

export const Input = ({ placeholder, onChange, value }) => {
  return (
    <p>
      <input
        className={inputStyles.loginText}
        name={placeholder}
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      ></input>
    </p>
  );
};

export default function SignUp() {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signup = e => {
    e.preventDefault();
    if (nickname && email && password) {
      axios
        .post("http://localhost:8080/users/sign_up", {
          nickname,
          email,
          password,
        })
        .then(() => {
          alert("회원가입이 완료되었습니다");
          navigate(-2);
        });
    } else {
      alert("빈 칸이 존재합니다");
    }
  };

  return (
    <div className={inputStyles.login}>
      <form>
        <h2>회원가입</h2>
        <Input
          placeholder="Nickname"
          onChange={e => setNickname(e.target.value)}
          value={nickname}
        ></Input>
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
        <div className={buttonStyles.buttonFlex}>
          <Button value="회원가입" onClick={signup}></Button>
        </div>
      </form>
    </div>
  );
}
