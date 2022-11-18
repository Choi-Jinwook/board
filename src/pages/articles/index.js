import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../../App";
import Button from "../../components/Button";
import { Tr } from "../../components/Tr";
import buttonStyles from "../../css/Button.module.css";
import tableStyles from "../../css/Table.module.css";
import inputStyles from "../../css/Input.module.css";

export default function Articles() {
  const [posts, setPosts] = useState([]);
  const { setLoginInfo } = useContext(MyContext);

  useEffect(() => {
    axios
      .get("http://localhost:8080/articles/all")
      .then(res => setPosts(res.data));
  }, []);

  return (
    <>
      <div className={tableStyles.container}>
        <h2 className={inputStyles.header}>게시판</h2>
        <table className={tableStyles.tr}>
          <thead>
            <tr className={tableStyles.trHeight}>
              <th className={tableStyles.background}>번호</th>
              <th className={tableStyles.background}>제목</th>
              <th className={tableStyles.background}>댓글</th>
              <th className={tableStyles.background}>글쓴이</th>
              <th className={tableStyles.background}>추천</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => (
              <Tr key={post.id} {...post}></Tr>
            ))}
          </tbody>
        </table>
        {JSON.parse(localStorage.getItem("userInfo")) ? (
          <div className={buttonStyles.buttonDiv}>
            <Link to="/articles/make">
              <Button value="글 작성"></Button>
            </Link>
            <Button
              value="로그아웃"
              onClick={() => {
                localStorage.removeItem("userInfo");
                setLoginInfo(JSON.parse(localStorage.getItem("userInfo")));
              }}
            ></Button>
          </div>
        ) : (
          <div className={buttonStyles.buttonDiv}>
            <Button
              value="글 작성"
              onClick={() => {
                alert("로그인을 해 주세요");
              }}
            ></Button>
            <Link to="/signin">
              <Button value="로그인"></Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
