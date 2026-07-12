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
        .then(() => {
            return fetch(
                'https://wedev-api.sky.pro/api/v1/murad-goysultanov/comments',
            )
        })
        .then((response) => response.json())
        .finally(() => {
            listUnLoader()
        })
}
