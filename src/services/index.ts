import { cloneDeep, get, isEmpty } from 'lodash'
import moment from 'moment'
import { List, _List } from '~/@types'
import { DATA_LIST_GROUP } from '~/constant/component'

export const getDateOfMonth = (type: 'start' | 'end' = 'start', date?: moment.MomentInput) => {
    if (type === 'start') {
        return moment(date).utc(true).startOf('month').toISOString()
    }
    return moment(date).utc(true).endOf('month').toISOString()
}

export const getDate = (date: Date, type: 'start' | 'end' = 'start', of: moment.unitOfTime.StartOf = 'day') => {
    if (type === 'start') {
        return moment(date).utc(true).startOf(of).toISOString()
    }
    return moment(date).utc(true).endOf(of).toISOString()
}

export const sum = (arr: number[]) => {
    return isEmpty(arr) ? 0 : arr.reduce((a, b) => a + b, 0)
}

export const deleteObjKeys = (obj: { [x: string]: any }, keys: string[]) => {
    const clone = JSON.parse(JSON.stringify(obj))

    Object.keys(obj).forEach((key) => {
        keys.forEach((k) => {
            if (key.startsWith(k)) {
                delete clone[key]
                return
            }
        })
    })

    return clone
}

export const hashCode = (s: string) => {
    let h = 0
    for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0
    return h
}

export const getColorPrize = (variable: any) => {
    return [{ 'text-green-500': variable > 0 }, { 'text-red-500': variable < 0 }, { 'text-gray-500': variable === 0 }]
}

export const getBudgetId = (userId: string, month?: moment.MomentInput) => moment(month).format('YYYY-MM-') + userId

export const getSpacingTime = (time: string) => {
    const now = new Date()
    const date = new Date(time)
    const diff = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diff / (1000 * 3600 * 24))
    const diffHours = Math.ceil(diff / (1000 * 3600))
    const diffMinutes = Math.ceil(diff / (1000 * 60))
    if (diffDays > 1) {
        return `${diffDays} ngày trước`
    }
    if (diffHours > 1) {
        return `${diffHours} giờ trước`
    }
    if (diffMinutes > 1) {
        return `${diffMinutes} phút trước`
    }
    return 'Vừa xong'
}

export const listGroupOptions = [
    { id: DATA_LIST_GROUP.DATE, name: 'Ngày' },
    { id: DATA_LIST_GROUP.MONTH, name: 'Tháng' },
    { id: DATA_LIST_GROUP.YEAR, name: 'Năm' },
]

export const listToTree = <T extends _List>(_list: T[]) => {
    let list: Array<List<T>> = cloneDeep(_list),
        map: { [x: string]: number } = {},
        node: List<T>,
        roots: Array<List<T>> = []

    for (let i = 0; i < list.length; i += 1) {
        map[list[i]._id] = i // initialize the map
        list[i].children = [] // initialize the children
    }

    for (let i = 0; i < list.length; i += 1) {
        node = list[i]
        if (node.parentId) {
            // if you have dangling branches check that map[node.parent_id] exists
            list[map[node.parentId]]?.children?.push(node)
        } else {
            roots.push(node)
        }
    }
    return roots
}
