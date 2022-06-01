import { makeAutoObservable } from "mobx";

export default class Timer {
  obj_info = null;

  constructor() {
    this.show_info();
    makeAutoObservable(this);
  }

  show_info() {
    if (this.obj_info == null) {
      fetch("https://api.github.com/gists/e1702c1ef26cddd006da989aa47d4f62")
        .then((res) => {
          res.json().then((data) => {
            console.log(
              JSON.parse(data.files["view.json"].content)["entityLabelPages"],
              "data"
            );
            this.obj_info = JSON.parse(data.files["view.json"].content)[
              "entityLabelPages"
            ][0];
            console.log(this.obj_info, "info");
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    return this.obj_info;
  }

  increase() {
    this.secondsPassed += 1;
  }

  reset() {
    this.secondsPassed = 0;
  }
}
