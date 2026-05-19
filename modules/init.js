import { renderComments } from './render.js'
import { comments } from './comments.js'

export const inputComment = document.getElementById('comment')

export const initClickLikes = () => {
    const commentsLikes = document.querySelectorAll('.like-button')

    for (const commentsLike of commentsLikes) {
        commentsLike.addEventListener('click', (event) => {
            const index = commentsLike.dataset.index

            event.stopPropagation()
            comments[index].condition = !comments[index].condition

            if (comments[index].condition) {
                comments[index].like++
            } else {
                comments[index].like--
            }

            renderComments()
        })
    }
}

export const initClickComments = () => {
    const commentsElements = document.querySelectorAll('.comment')

    for (const commentElement of commentsElements) {
        commentElement.addEventListener('click', () => {
            const name = commentElement.dataset.name
            const text = commentElement.dataset.text

            inputComment.value = `> ${name}: ${text}\n`
            inputComment.focus()
        })
    }
}
