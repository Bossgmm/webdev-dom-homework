import { updateComments } from './comments.js'
import { renderComments } from './render.js'
import { formatDate } from '../index.js'

export function getCommentsApi() {
    fetch('https://wedev-api.sky.pro/api/v1/murad-goysultanov/comments')
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            const formattedComments = data.comments.map((comment) => {
                return {
                    ...comment,
                    date: formatDate(comment.date),
                }
            })

            updateComments(formattedComments)
            renderComments()
        })
}

export function postCommentsApi(newComments) {
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
            const formattedComments = data.comments.map((comment) => {
                return {
                    ...comment,
                    date: formatDate(comment.date),
                }
            })
            updateComments(formattedComments)
            renderComments()
        })
}
