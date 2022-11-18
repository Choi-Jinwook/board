import axios from "axios";
import { useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../App";
import Button from "../../components/Button";
import buttonStyles from "../../css/Button.module.css";
import inputStyles from "../../css/Input.module.css";

export default function MakePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { loginInfo } = useContext(MyContext);
  const authorNickname = loginInfo.nickname;
  const authorId = loginInfo.id;
  const navigate = useNavigate();

  const onClick = e => {
    e.preventDefault();
    title && content
      ? axios
          .post("http://localhost:8080/articles", {
            title,
            content,
            authorNickname,
            authorId,
          })
          .then(() => navigate(-1))
      : alert("제목과 내용을 모두 입력해 주세요");
  };

  const onContent = useCallback(e => {
    let content = e.target.value;
    content = content.replaceAll("<br>", "\r\n");
    setContent(content);
  }, []);

  return (
    <div className={inputStyles.container}>
      <form>
        <h2>글 작성</h2>
        <p>
          <input
            className={inputStyles.inputTitle}
            type="text"
            placeholder="title"
            onChange={e => {
              setTitle(e.target.value);
            }}
          ></input>
        </p>
        <p>
          <textarea
            className={inputStyles.inputContent}
            placeholder="content"
            onChange={onContent}
          ></textarea>
        </p>
        <div className={buttonStyles.buttonDiv}>
          <Button value="등록" onClick={onClick}></Button>
        </div>
      </form>
    </div>
  );
}
