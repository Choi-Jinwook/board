import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MyContext } from "../App";
import Button from "./Button";
import buttonStyles from "../css/Button.module.css";
import inputStyles from "../css/Input.module.css";
import outputStyles from "../css/Output.module.css";

function BigComment({
  authorId,
  parentId,
  content,
  articleId,
  setModify,
  setBigCommentBox,
  setCommentBox,
  setContent,
}) {
  function clickCancel(e) {
    e.preventDefault();
    setModify(false);
    setBigCommentBox(false);
    setCommentBox(true);
  }

  function inputBigComment() {
    axios.post("http://localhost:8080/comments", {
      content,
      authorId,
      parentId,
      articleId,
    });
    alert("댓글이 등록되었습니다.");
    window.location.replace(`/articles/${articleId}`);
  }

  return (
    <div className={inputStyles.bigCommentDiv}>
      <form>
        <p>
          <textarea
            className={inputStyles.articleComment}
            placeholder="댓글을 입력해 주세요."
            onChange={e => {
              e.preventDefault();
              setContent(e.target.value);
            }}
          ></textarea>
        </p>
        <div className={buttonStyles.buttonDiv}>
          <Button value="취소" onClick={e => clickCancel(e)}></Button>
          <Button
            value="등록"
            onClick={e => {
              e.preventDefault();
              content ? inputBigComment() : alert("내용을 입력해 주세요.");
            }}
          ></Button>
        </div>
      </form>
    </div>
  );
}

function CanModify({
  setCommentBox,
  setBigCommentBox,
  setParentId,
  setCommentId,
  parentComment,
  setModify,
  setName,
  setContent,
  id,
  articleId,
}) {
  function clickBigComment({ parentComment, e }) {
    e.preventDefault();
    setCommentBox(false);
    setBigCommentBox(true);
    setParentId(parentComment.id);
    setCommentId(parentComment.id);
  }

  return (
    <div className={buttonStyles.buttonDiv}>
      <Button
        value="답글"
        onClick={e => clickBigComment({ e, parentComment })}
      ></Button>
      <Button
        keys={parentComment.id}
        value="수정"
        onClick={e => {
          setModify(true);
          setCommentBox(false);
          setName(e.target.name);
          setContent(parentComment.content);
        }}
      ></Button>
      <Button
        value="삭제"
        onClick={() => {
          id = parentComment.id;
          axios.delete(`http://localhost:8080/comments/${id}`);
          alert("댓글이 삭제되었습니다.");
          window.location.replace(`/articles/${articleId}`);
        }}
      ></Button>
    </div>
  );
}

function CannotModify({
  setCommentBox,
  setBigCommentBox,
  setParentId,
  setCommentId,
  parentComment,
}) {
  function clickBigComment({ parentComment, e }) {
    e.preventDefault();
    setCommentBox(false);
    setBigCommentBox(true);
    setParentId(parentComment.id);
    setCommentId(parentComment.id);
  }

  return (
    <div className={buttonStyles.buttonDiv}>
      <Button
        value="답글"
        onClick={e => clickBigComment({ e, parentComment })}
      ></Button>
    </div>
  );
}

export default function Comment() {
  const { loginInfo } = useContext(MyContext);
  const [content, setContent] = useState("");
  const [comments, setComments] = useState([]);
  const [authorId, setAuthorId] = useState("");
  const [parentId, setParentId] = useState("");
  const [commentBox, setCommentBox] = useState(true);
  const [bigCommentBox, setBigCommentBox] = useState(false);
  const [commentId, setCommentId] = useState("");
  const [modify, setModify] = useState(false);
  const [name, setName] = useState("");
  let { id } = useParams();
  const articleId = id;
  let childComments = [];
  let parentComments = [];

  function inputComment() {
    axios.post("http://localhost:8080/comments", {
      content,
      authorId,
      articleId,
    });
    alert("댓글이 등록되었습니다.");
    window.location.replace(`/articles/${id}`);
  }

  function modifyComment() {
    axios
      .patch(`http://localhost:8080/comments/${id}`, { content })
      .then(() => {
        setModify(false);
        setCommentBox(true);
        id = articleId;
      });
    window.location.replace(`/articles/${articleId}`);
  }

  function clickCancel(e) {
    e.preventDefault();
    setModify(false);
    setBigCommentBox(false);
    setCommentBox(true);
  }

  useEffect(() => {
    axios.get(`http://localhost:8080/comments/article/${id}`).then(res => {
      setComments(res.data);
      setAuthorId(loginInfo.id);
    });
  }, [id, loginInfo.id]);

  comments.forEach(parentComment => {
    parentComment.parentId
      ? childComments.push(parentComment)
      : parentComments.push(parentComment);
  });

  return (
    <div className={inputStyles.articleContainer}>
      <div>
        {parentComments.map(parentComment =>
          parentComment.isDeleted ? null : modify &&
            parentComment.id === name ? (
            <div key={parentComment.id} className={inputStyles.commentDiv}>
              <form>
                <p>
                  <textarea
                    className={inputStyles.articleComment}
                    value={content}
                    onChange={e => {
                      e.preventDefault();
                      setContent(e.target.value);
                    }}
                  ></textarea>
                </p>
                <div className={buttonStyles.buttonDiv}>
                  <Button value="취소" onClick={e => clickCancel(e)}></Button>
                  <Button
                    value="등록"
                    onClick={e => {
                      e.preventDefault();
                      id = parentComment.id;
                      content
                        ? modifyComment()
                        : alert("내용을 입력해 주세요.");
                    }}
                  ></Button>
                </div>
              </form>
            </div>
          ) : (
            <div
              key={parentComment.id}
              className={outputStyles.commentContainer}
            >
              <h4>{parentComment.authorNickname}</h4>
              <p className={inputStyles.commentFontsize}>
                {parentComment.content}
              </p>
              {parentComment.authorId === loginInfo.id ? (
                <>
                  <CanModify
                    setCommentBox={setCommentBox}
                    setBigCommentBox={setBigCommentBox}
                    setParentId={setParentId}
                    setCommentId={setCommentId}
                    parentComment={parentComment}
                    setModify={setModify}
                    setName={setName}
                    setContent={setContent}
                    id={id}
                    articleId={articleId}
                  ></CanModify>
                  {bigCommentBox && commentId === parentComment.id ? (
                    <BigComment
                      authorId={authorId}
                      parentId={parentId}
                      content={content}
                      commentBox={commentBox}
                      bigCommentBox={bigCommentBox}
                      modify={modify}
                      articleId={articleId}
                      setModify={setModify}
                      setBigCommentBox={setBigCommentBox}
                      setCommentBox={setCommentBox}
                      setContent={setContent}
                    ></BigComment>
                  ) : null}
                </>
              ) : (
                <>
                  <CannotModify
                    setCommentBox={setCommentBox}
                    setBigCommentBox={setBigCommentBox}
                    setParentId={setParentId}
                    setCommentId={setCommentId}
                    parentComment={parentComment}
                  ></CannotModify>
                  {bigCommentBox && commentId === parentComment.id ? (
                    <BigComment
                      authorId={authorId}
                      parentId={parentId}
                      content={content}
                      commentBox={commentBox}
                      bigCommentBox={bigCommentBox}
                      modify={modify}
                      articleId={articleId}
                      setModify={setModify}
                      setBigCommentBox={setBigCommentBox}
                      setCommentBox={setCommentBox}
                      setContent={setContent}
                    ></BigComment>
                  ) : null}
                </>
              )}
              {childComments.map(childComment =>
                childComment.parentId === parentComment.id ? (
                  childComment.isDeleted ? null : modify &&
                    childComment.id === name ? (
                    <div
                      key={parentComment.id}
                      className={inputStyles.commentDiv}
                    >
                      <form>
                        <p>
                          <textarea
                            className={inputStyles.articleComment}
                            value={content}
                            onChange={e => {
                              e.preventDefault();
                              setContent(e.target.value);
                            }}
                          ></textarea>
                        </p>
                        <div className={buttonStyles.buttonDiv}>
                          <Button
                            value="취소"
                            onClick={e => clickCancel(e)}
                          ></Button>
                          <Button
                            value="등록"
                            onClick={e => {
                              e.preventDefault();
                              id = childComment.id;
                              content
                                ? modifyComment()
                                : alert("내용을 입력해 주세요.");
                            }}
                          ></Button>
                        </div>
                      </form>
                    </div>
                  ) : (
                    <div
                      key={childComment.id}
                      className={outputStyles.childCommentContainer}
                    >
                      <h4>{childComment.authorNickname}</h4>
                      <p className={inputStyles.commentFontsize}>
                        {childComment.content}
                      </p>
                      {childComment.authorId === loginInfo.id ? (
                        <>
                          <CanModify
                            setCommentBox={setCommentBox}
                            setBigCommentBox={setBigCommentBox}
                            setParentId={setParentId}
                            setCommentId={setCommentId}
                            parentComment={parentComment}
                            setModify={setModify}
                            setName={setName}
                            setContent={setContent}
                            id={id}
                            articleId={articleId}
                          ></CanModify>
                          {bigCommentBox && commentId === childComment.id ? (
                            <BigComment
                              authorId={authorId}
                              parentId={parentId}
                              content={content}
                              commentBox={commentBox}
                              bigCommentBox={bigCommentBox}
                              modify={modify}
                              articleId={articleId}
                              setModify={setModify}
                              setBigCommentBox={setBigCommentBox}
                              setCommentBox={setCommentBox}
                              setContent={setContent}
                            ></BigComment>
                          ) : null}
                        </>
                      ) : (
                        <>
                          <CannotModify
                            setCommentBox={setCommentBox}
                            setBigCommentBox={setBigCommentBox}
                            setParentId={setParentId}
                            setCommentId={setCommentId}
                            parentComment={parentComment}
                          ></CannotModify>
                          {bigCommentBox && commentId === childComment.id ? (
                            <BigComment
                              authorId={authorId}
                              parentId={parentId}
                              content={content}
                              commentBox={commentBox}
                              bigCommentBox={bigCommentBox}
                              modify={modify}
                              articleId={articleId}
                              setModify={setModify}
                              setBigCommentBox={setBigCommentBox}
                              setCommentBox={setCommentBox}
                              setContent={setContent}
                            ></BigComment>
                          ) : null}
                        </>
                      )}
                    </div>
                  )
                ) : null
              )}
              <hr />
            </div>
          )
        )}
      </div>
      {commentBox ? (
        <div className={inputStyles.commentDiv}>
          <form>
            <p>
              <textarea
                className={inputStyles.articleComment}
                placeholder="댓글을 입력해 주세요."
                onChange={e => {
                  e.preventDefault();
                  setContent(e.target.value);
                }}
              ></textarea>
            </p>
            <div className={buttonStyles.buttonDiv}>
              <Button
                value="등록"
                onClick={e => {
                  e.preventDefault();
                  content ? inputComment() : alert("내용을 입력해 주세요.");
                }}
              ></Button>
            </div>
          </form>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
