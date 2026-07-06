export function getCommentsApi() {
    return fetch(
        'https://wedev-api.sky.pro/api/v1/murad-goysultanov/comments',
    ).then((response) => response.json())
}

export function postCommentsApi(newComment) {
    return fetch(
        'https://wedev-api.sky.pro/api/v1/murad-goysultanov/comments',
        {
            method: 'POST',
            body: JSON.stringify(newComment),
        },
    ).then((response) => response.json())
}
