import { formatDate, initAddComment } from './modules/init.js'
import { getCommentsApi } from './modules/api.js'
import { updateComments } from './modules/comments.js'
import { renderComments } from './modules/render.js'

function loadComments() {
    getCommentsApi().then((data) => {
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

loadComments()
initAddComment()
