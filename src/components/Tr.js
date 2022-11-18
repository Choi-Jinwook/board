import { Link } from "react-router-dom";
import tableStyles from "../css/Table.module.css";

function Tr({ id, title, comments, authorNickname, likes, isDeleted }) {
  return isDeleted ? null : (
    <tr className={tableStyles.fontsize}>
      <td className={tableStyles.id}>{id}</td>
      <td className={tableStyles.title}>
        <Link to={`/articles/${id}`}>{title}</Link>
      </td>
      <td className={tableStyles.comments}>{comments}</td>
      <td className={tableStyles.authorNickname}>{authorNickname}</td>
      <td className={tableStyles.likes}>{likes}</td>
    </tr>
  );
}

export { Tr };
