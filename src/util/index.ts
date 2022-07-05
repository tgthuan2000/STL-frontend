import _ from 'lodash'

export const sum = (arr: number[]) => {
    return _.isEmpty(arr) ? 0 : arr.reduce((a, b) => a + b, 0)
}
