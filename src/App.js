//import logo from "./logo.svg";
import "./App.css";
import Timer from "./stores/data_store.js";
import Card from "./components/card.js";
import { observer } from "mobx-react";
import { useState, useEffect } from "react";

let new_obj = {};
function getTree(obj) {
  let temp = [];
  for (let i = 0; i < obj.labels.length; i++) {
    temp.push({
      label: obj.labels[i],
      id: obj.entityLongIds[i],
      parentId: obj.parentEntityLongIds[i],
    });
  }
  return temp;
}

function createTree(arr) {
  if (!arr || !arr.length) {
    return [];
  }
  let tree = [],
    map = new Map();
  for (let i = 0, len = arr.length; i < len; ++i) {
    let item = arr[i];
    let mapItem = map.get(item.id);
    if (!mapItem || Array.isArray(mapItem)) {
      if (mapItem) {
        item.children = mapItem;
      }
      map.set(item.id, item);
    }
    if (item.parentId == -1) {
      tree.push(item);
    } else {
      let parentItem = map.get(item.parentId);
      if (!parentItem) {
        map.set(item.parentId, [item]);
      } else {
        let children = Array.isArray(parentItem)
          ? parentItem
          : (parentItem.children = parentItem.children || []);
        children.push(item);
      }
    }
  }
  return tree;
}

function createList(arr) {
  console.log(arr, "arr");
  let result = arr.map((node, i) => {
    if (!node.children) {
      return <li key={i}>{node.label}</li>;
    } else {
      return (
        <li key={i}>
          {node.label}
          <ol>{createList(node.children)}</ol>
        </li>
      );
    }
  });

  console.log(result, "result");
  return result;
}

function App() {
  const myTimer = new Timer();

  const TimerView = observer(({ timer }) => {
    let obj = timer.obj_info ? timer.obj_info.labels : [];
    console.log(obj, "obj");
    if (obj.length > 0) {
      let newArr = getTree(timer.obj_info);
      let newTree = createTree(newArr);
      console.log(newTree, "newTree");
      let elem = <ol>{createList(newTree)}</ol>;
      console.log(elem, "elem");
      return elem;
    }
  });

  setTimeout(() => {
    console.log(myTimer.obj_info, "objinfo");
  }, 1000);

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <div className="main_block row">
            <div className="col sub1">
              <TimerView timer={myTimer} />
            </div>
            <div className="col sub1">Col2</div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
