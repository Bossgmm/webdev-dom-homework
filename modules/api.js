import { listLoader } from './init.js'

export function getCommentsApi() {
    return fetch(
        'https://wedev-api.sky.pro/api/v1/murad-goysultanov/comments',
    ).then((response) => response.json())
    // .then(() => {
    //     listLoader()
    // })
}

export function postCommentsApi(newComment) {
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
}
