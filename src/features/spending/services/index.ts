export const searchName = (word: string, search: string): string | string[] => {
    let component: any = word
    let index = word.toLowerCase().indexOf(search.toLowerCase())
    if (index !== -1) {
        const start = word.slice(0, index)
        const middle = word.slice(index, index + search.length)
        const end = word.slice(index + search.length)
        component = [start, middle, end]
    }
    return component
}
