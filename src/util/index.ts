import _ from 'lodash'

export const sum = (arr: number[]) => {
    return _.isEmpty(arr) ? 0 : arr.reduce((a, b) => a + b, 0)
}

export const hashCode = (s: string) => {
    let h = 0
    for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0
    return h
}

export const getColorPrize = (variable: any) => {
    return [{ 'text-green-500': variable > 0 }, { 'text-red-500': variable < 0 }, { 'text-gray-500': variable === 0 }]
}
