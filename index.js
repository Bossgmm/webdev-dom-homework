import {renderComments} from "./modules/render.js";
import {comments} from "./modules/comments.js";
import {inputComment} from "./modules/init.js"


renderComments();

const button = document.getElementById("add");
const inputName = document.getElementById("name");


let likesCounter = 0;

function formatDate(date) {
  const d = new Date(date);

  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = String(d.getFullYear()).slice(-2);

  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");

  return `${day}.${month}.${year} ${hours}:${minutes}`;
}

button.addEventListener("click", () => {
  inputName.classList.remove("error");
  inputComment.classList.remove("error");
  if (inputName.value === "" || inputComment.value === "") {
    inputName.classList.add("error");
    inputComment.classList.add("error");

    return;
  }

  comments.push({
    name: inputName.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
    date: formatDate(new Date()),
    text: inputComment.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
    like: likesCounter,
    condition: false,
  });

  renderComments();
  inputName.value = "";
  inputComment.value = "";
});