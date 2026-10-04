import { listLoader, listUnLoader } from './init.js'

export function getCommentsApi() {
    listLoader()
    return fetch('https://wedev-api.sky.pro/api/v1/murad-goysultanov/comments')
        .then((response) => response.json())
        .finally(() => {
            listUnLoader()
        })
}

export function postCommentsApi(newComment) {
    listLoader()
    return fetch(
        'https://wedev-api.sky.pro/api/v1/murad-goysultanov/comments',
        {
            method: 'POST',
            body: JSON.stringify(newComment),
        },
    )
        .then((response) => {
            if (response.status === 201) {
                return response.json()
            }
            if (response.status === 400) {
                throw new Error('Имя и текст доджны составлять более 3-х букв')
            }
            if (response.status === 500) {
                throw new Error('проблема на стороне сервера')
            }
        })
        .then(() => {
            return fetch(
                'https://wedev-api.sky.pro/api/v1/murad-goysultanov/comments',
            )
        })
        .catch((error) => {
            alert(error)
        })
        .then((response) => response.json())
        .finally(() => {
            listUnLoader()
        })
}
