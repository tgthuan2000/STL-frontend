import { isEmpty } from 'lodash'
import moment from 'moment'

export const getDateOfMonth = (type: 'start' | 'end' = 'start') => {
    if (type === 'start') {
        return moment().utc(true).startOf('month').toISOString()
    }
    return moment().utc(true).endOf('month').toISOString()
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

export const hashCode = (s: string) => {
    let h = 0
    for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0
    return h
}

export const getColorPrize = (variable: any) => {
    return [{ 'text-green-500': variable > 0 }, { 'text-red-500': variable < 0 }, { 'text-gray-500': variable === 0 }]
}
