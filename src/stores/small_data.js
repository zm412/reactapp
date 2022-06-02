import { makeAutoObservable, observable, action } from "mobx";

export default class smallData {
  tree = null;
  data = null;

  constructor() {
    this.get_library();
    makeAutoObservable(this, {
      data: observable,
    });
  }

  getNodes(obj) {
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

  createTree(arr) {
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
      if (item.parentId === -1) {
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

  get_data() {
    return this.data;
  }

  get_library() {
    if (this.data == null) {
      fetch("https://api.github.com/gists/e1702c1ef26cddd006da989aa47d4f62")
        .then((res) => {
          res.json().then((data) => {
            let temp = JSON.parse(data.files["view.json"].content)[
              "entityLabelPages"
            ][0];
            let temp2 = this.getNodes(temp);
            this.data = temp2;
            let temp3 = this.createTree(temp2);
            this.tree = temp3;
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  get_tree() {
    return this.tree;
  }
}
