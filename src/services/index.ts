import moment from 'moment'

export const getDate = (type: 'start' | 'end' = 'start') => {
    if (type === 'start') {
        return moment().utc(true).startOf('month').toISOString()
    }
    return moment().utc(true).endOf('month').toISOString()
}
