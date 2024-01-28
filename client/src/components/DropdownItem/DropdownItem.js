import { Link } from "react-router-dom";
import "./DropdownItem.scss";

const DropdownItem = (props) => {
  return (
    <>
      <Link className="link" to={props.path}>
        <li className="link-item">{props.text}</li>
      </Link>
    </>
  );
};

export default DropdownItem;
