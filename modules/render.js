import {comments} from "./comments.js";
import {initClickLikes, initClickComments} from "./init.js";

const list = document.getElementById("list");

export const renderComments = () => {
  const commentsHtml = comments
    .map((comment, index) => {
      return `<li class="comment" data-name="${comment.name}" data-text="${comment.text}">
            <div class="comment-header">
              <div>${comment.name}</div>
              <div>${comment.date}</div>
            </div>
            <div class="comment-body">
              <div class="comment-text">
                ${comment.text}
              </div>
            </div>
            <div class="comment-footer">
              <div class="likes">
                <span class="likes-counter">${comment.like}</span>
                <button class="like-button ${comment.condition ? "active-like" : ""}" data-index="${index}"></button>
              </div>
            </div>
          </li>`;
    })
    .join("");

  list.innerHTML = commentsHtml;

  initClickLikes();
  initClickComments();
};