import { observer } from "mobx-react";
import { useState, useEffect } from "react";

const LibraryView = observer(({ lib, getDetalesFunc, detales }) => {
  const [nodeInfo, setNodeInfo] = useState(null);

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
      if (!node.children) {
        return (
          <li key={i} onClick={clickNode} data-key={node.id}>
            {node.label}
          </li>
        );
      } else {
        return (
          <li data-key={node.id} onClick={clickNode} key={i}>
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
