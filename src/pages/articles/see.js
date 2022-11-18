import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Button from "../../components/Button";
import buttonStyles from "../../css/Button.module.css";
import inputStyles from "../../css/Input.module.css";
import outputStyles from "../../css/Output.module.css";
import Comment from "../../components/Comment";

export default function SeePost() {
  const [article, setArticle] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/articles/${id}`)
      .then(res => setArticle(res.data));
  }, [id]);

  return (
    <>
      <div className={outputStyles.container}>
        <h1>{article.title}</h1>
        <p className={inputStyles.lineChange}>{article.content}</p>
        <div className={buttonStyles.buttonDiv}>
          <Link to={`/articles/${id}/insert`}>
            <Button value="수정"></Button>
          </Link>
          <Link to="">
            <Button
              value="삭제"
              onClick={() => {
                axios
                  .delete(`http://localhost:8080/articles/${id}`)
                  .then(() => navigate(-1));
              }}
            ></Button>
          </Link>
        </div>
        <hr />
      </div>
      <Comment></Comment>
    </>
  );
}
