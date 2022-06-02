import { observer } from "mobx-react";
import { useState, useEffect } from "react";

const LibraryView = observer(({ lib, getDetalesFunc, detales }) => {
  const [nodeInfo, setNodeInfo] = useState(null);
  console.log(lib, "lib3");

  let tree = lib.tree ? lib.tree : [];
  let data = lib.data ? lib.data : [];

  const clickNode = (e) => {
    let temp = data.find((n) => {
      return n.id == e.target.dataset.key;
    });
    getDetalesFunc(temp);
    setNodeInfo(temp);
  };

  const createList = (arr) => {
    let result = arr.map((node, i) => {
      let none_displ_class = node.parentId != -1 ? "display_none" : "";
      if (!node.children) {
        return (
          <li
            key={i}
            onClick={clickNode}
            className={"def-mark"}
            data-key={node.id}
          >
            {node.label}
          </li>
        );
      } else {
        return (
          <li
            data-key={node.id}
            className={"def-mark "}
            onClick={clickNode}
            key={i}
          >
            {node.label}
            <ol>{createList(node.children)}</ol>
          </li>
        );
      }
    });
    return result;
  };

  if (tree.length > 0) {
    let elem = <ol>{createList(tree)}</ol>;
    return elem;
  }
});

export default LibraryView;
