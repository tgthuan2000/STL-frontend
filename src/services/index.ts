import moment from 'moment'

export const getDate = (type: 'start' | 'end' = 'start') => {
    if (type === 'start') {
        return moment().utc().startOf('month').toISOString()
    }
    return moment().utc().endOf('month').toISOString()
}
