import { renderComments } from './modules/render.js'
import { updateComments } from './modules/comments.js'
import { inputComment } from './modules/init.js'

fetch('https://wedev-api.sky.pro/api/v1/murad-goysultanov/comments')
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        updateComments(data.comments)
        renderComments()
    })

const button = document.getElementById('add')
const inputName = document.getElementById('name')

// let likesCounter = 0

// function formatDate(date) {
//     const d = new Date(date)

//     const day = String(d.getDate()).padStart(2, '0')
//     const month = String(d.getMonth() + 1).padStart(2, '0')
//     const year = String(d.getFullYear()).slice(-2)

//     const hours = String(d.getHours()).padStart(2, '0')

//     const minutes = String(d.getMinutes()).padStart(2, '0')

//     return `${day}.${month}.${year} ${hours}:${minutes}`
// }

button.addEventListener('click', () => {
    inputName.classList.remove('error')
    inputComment.classList.remove('error')

    if (inputName.value === '' || inputComment.value === '') {
        inputName.classList.add('error')
        inputComment.classList.add('error')
        return
    }

    const newComments = {
        name: inputName.value.replaceAll('<', '<').replaceAll('>', '>'),
        text: inputComment.value.replaceAll('<', '<').replaceAll('>', '>'),
    }

    fetch('https://wedev-api.sky.pro/api/v1/murad-goysultanov/comments', {
        method: 'POST',
        body: JSON.stringify(newComments),
    })
        .then((response) => response.json())
        .then(() => {
            return fetch(
                'https://wedev-api.sky.pro/api/v1/murad-goysultanov/comments',
            )
        })
        .then((response) => response.json())
        .then((data) => {
            updateComments(data.comments)
            renderComments()

            inputName.value = ''
            inputComment.value = ''
        })
})
