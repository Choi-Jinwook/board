import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button";
import inputStyles from "../../css/Input.module.css";
import buttonStyles from "../../css/Button.module.css";
import { MyContext } from "../../App";

const ErrorAlert = () => {
  const navigate = useNavigate();
  alert("접근할 수 없습니다.");
  navigate(-1);
};

export default function InsertPost() {
  const { loginInfo } = useContext(MyContext);
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8080/articles/${id}`).then(res => {
      setTitle(res.data.title);
      setContent(res.data.content);
      setUserId(res.data.authorId);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return;
  }

  return userId === loginInfo.id ? (
    <div className={inputStyles.container}>
      <form>
        <h2>글 수정</h2>
        <p>
          <input
            className={inputStyles.inputTitle}
            type="text"
            value={title}
            onChange={e => {
              e.preventDefault();
              setTitle(e.target.value);
            }}
          ></input>
        </p>
        <p>
          <textarea
            className={inputStyles.inputContent}
            value={content}
            onChange={e => {
              e.preventDefault();
              setContent(e.target.value);
            }}
          ></textarea>
        </p>
        <div className={buttonStyles.buttonDiv}>
          <Button
            onClick={e => {
              e.preventDefault();
              navigate(-1);
            }}
            value="취소"
          ></Button>
          <Button
            onClick={e => {
              e.preventDefault();
              axios
                .patch(`http://localhost:8080/articles/${id}`, {
                  title,
                  content,
                })
                .then(() => navigate(-1));
            }}
            value="수정"
          ></Button>
        </div>
      </form>
    </div>
  ) : (
    <div>
      <ErrorAlert></ErrorAlert>
    </div>
  );
}
