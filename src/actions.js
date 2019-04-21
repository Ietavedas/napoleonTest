export function getList(data) {
    return {
        type: 'LIST',
        payload: data
    }
}
export function searchAction(query) {
    return {
        type: 'SEARCH',
        payload: query
    }
}
