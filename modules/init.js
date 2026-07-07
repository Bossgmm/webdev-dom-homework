import { renderComments } from './render.js'
import { comments } from './comments.js'
import { getCommentsApi, postCommentsApi } from './api.js'
import { updateComments } from './comments.js'

export const inputComment = document.getElementById('comment')
const button = document.getElementById('add')
const inputName = document.getElementById('name')
const container = document.getElementById('container')
const list = document.getElementById('list')
const newParagraph = document.createElement('p')
newParagraph.textContent = 'Происходит загрузка. Пожалуйста подождите...'

export function formatDate(date) {
    const d = new Date(date)

    const day = String(d.getDate()).padStart(2, '0')
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const year = String(d.getFullYear()).slice(-2)
    const hours = String(d.getHours()).padStart(2, '0')
    const minutes = String(d.getMinutes()).padStart(2, '0')

    return `${day}.${month}.${year} ${hours}:${minutes}`
}

export const initClickLikes = () => {
    const commentsLikes = document.querySelectorAll('.like-button')

    for (const commentsLike of commentsLikes) {
        commentsLike.addEventListener('click', (event) => {
            const index = commentsLike.dataset.index

            event.stopPropagation()
            comments[index].isLiked = !comments[index].isLiked

            if (comments[index].isLiked) {
                comments[index].likes++
            } else {
                comments[index].likes--
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

export function initAddComment() {
    button.addEventListener('click', () => {
        inputName.classList.remove('error')
        inputComment.classList.remove('error')

        if (inputName.value === '' || inputComment.value === '') {
            inputName.classList.add('error')
            inputComment.classList.add('error')
            return
        }

        const newComment = {
            name: inputName.value
                .replaceAll('<', '&lt;')
                .replaceAll('>', '&gt;'),
            text: inputComment.value
                .replaceAll('<', '&lt;')
                .replaceAll('>', '&gt;'),
        }

        button.disabled = true
        button.textContent = 'Создание задачи'

        postCommentsApi(newComment)
            .then(() => getCommentsApi())
            .then((data) => {
                button.disabled = false
                button.textContent = 'Написать'

                const formattedComments = data.comments.map((comment) => {
                    return {
                        ...comment,
                        date: formatDate(comment.date),
                    }
                })

                updateComments(formattedComments)
                renderComments()

                inputName.value = ''
                inputComment.value = ''
            })
    })
}
export function listLoader() {
    list.style.display = 'none'
    container.prepend(newParagraph)
    button.disabled = true
    button.textContent = 'Подождите'
}
