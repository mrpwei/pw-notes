import * as React from "react";
import { Link } from "gatsby";

const TreeNode = ({ url, title, items, label, ...rest }) => {
  const hasChildren = items.length !== 0;

  return (
    <>
      <li>
        {url ? <Link to={url}>{title}</Link> : <p>{label}</p>}

        {hasChildren ? (
          <ul>
            {items.map((item, index) => (
              <TreeNode key={item.url + index.toString()} {...item} />
            ))}
          </ul>
        ) : null}
      </li>
    </>
  );
};

export default TreeNode;
