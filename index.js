const colors = document.querySelector("div.colors");
const changeColorBrush = document.querySelector("div.info i:nth-of-type(1)");
const questionMark = document.querySelector("div.info i:nth-of-type(2)");
const modal = document.querySelector("div.modal");
const colorsArr = [...colors.children].slice(0, 3);
const changeColorsItems = [...document.querySelectorAll(".colorChange")];
const playBtn = document.querySelector("button.playBtn");
const pouseBtn = document.querySelector("button.pouseBtn");
const stopBtn = document.querySelector("button.stopBtn");
const closeBtn = document.querySelector("button.closeBtn");
const archiveBtn = document.querySelector("button.archery");
const res = document.querySelector("div.container p#finalRes");
const showData = document.querySelector("div.showData");

const singleColorChange = (e) => {
  if (e.target.classList.contains("one")) {
    for (let item of changeColorsItems) {
      if (
        item.classList.contains("active-blue") ||
        item.classList.contains("active-green")
      ) {
        item.classList.remove("active-blue");
        item.classList.remove("active-green");
      }
      item.classList.add("active-orange");
    }
  } else if (e.target.classList.contains("two")) {
    for (let item of changeColorsItems) {
      if (
        item.classList.contains("active-green") ||
        item.classList.contains("active-orange")
      ) {
        item.classList.remove("active-orange");
        item.classList.remove("active-green");
      }
      item.classList.add("active-blue");
    }
  } else if (e.target.classList.contains("three")) {
    for (let item of changeColorsItems) {
      if (
        item.classList.contains("active-blue") ||
        item.classList.contains("active-orange")
      ) {
        item.classList.remove("active-orange");
        item.classList.remove("active-blue");
      }

      item.classList.add("active-green");
    }
  }
};
const changeColorFunc = () => {
  colorsArr.forEach((color) => {
    color.addEventListener("click", singleColorChange);
  });
  colors.style.transform = "translateX(0)";
  setTimeout(() => {
    colors.style.transform = "translateX(50px)";
  }, 5000);
};
changeColorBrush.addEventListener("click", changeColorFunc);

closeModalFunc = () => {
  modal.style.display = "none";
};
const showInfoFunc = () => {
  modal.style.display = "flex";

  const close = document.querySelector("div.modal button#close");
  close.addEventListener("click", closeModalFunc);
};
questionMark.addEventListener("click", showInfoFunc);

class PlayApp {
  constructor(play, pouse, stopp, exitModal, archiveBtn, res) {
    this.play = play;
    this.pouse = pouse;
    this.stopp = stopp;
    this.exitModal = exitModal;
    this.archive = archiveBtn;
    this.finalRes = res;
    this.time = 0;
    this.count = 0;
    this.timeHistory = [];
    this.play.addEventListener("click", this.playFunc);
    this.pouse.addEventListener("click", this.pouseFunc);
    this.stopp.addEventListener("click", this.stoppFunc);
    this.exitModal.addEventListener("click", this.exitModalFunc);
    this.archive.addEventListener("click", this.showArchive);
  }

  playFunc = () => {
    this.intervalId = setInterval(() => {
      this.time += 0.1;
      this.finalRes.textContent = this.time.toFixed(2);
    }, 100);
    this.play.removeEventListener("click", this.playFunc);
  };
  pouseFunc = () => {
    clearInterval(this.intervalId);
    this.play.addEventListener("click", this.playFunc);
  };
  stoppFunc = () => {
    this.pouseFunc();

    this.timeHistory.push({
      hisTime: this.time.toFixed(2),
      title: `Measurement ${(this.count += 1)}`,
    });
    this.time = 0;
    this.finalRes.textContent = "0:00";
    this.play.addEventListener("click", this.playFunc);
  };
  exitModalFunc = () => {
    this.timeHistory.length = 0;
    showData.textContent = "";
    showData.style.display = "none";
    this.count = 0;
  };
  showArchive = () => {
    if (this.timeHistory.length !== 0) {
      showData.style.display = "block";
      showData.textContent = "";
      setTimeout(() => {
        showData.removeAttribute("style");
      }, 5000);
      this.timeHistory.forEach((itm) => {
        const newP = document.createElement("p");
        newP.innerHTML = `${itm.title}<span class="colorChange">${itm.hisTime}</span>`;
        showData.appendChild(newP);
      });
    }
  };
}

const start = new PlayApp(
  playBtn,
  pouseBtn,
  stopBtn,
  closeBtn,
  archiveBtn,
  res
);
