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
        'https://wedev-api.sky.pro/api/v1/murad-goysultanov/commentss',
        {
            method: 'POST',
            body: JSON.stringify(newComment),
        },
    )
        .then((response) => {
            if (response.status === 201) {
                return response.json()
            } else {
                if (response.status === 500) {
                    throw new Error('Проблема на сервере')
                }
                if (response.status === 400) {
                    throw new Error('Имя должно содержать хотя бы 3 символа')
                }
                throw new Error('Что-то пошло не так')
            }
        })
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
