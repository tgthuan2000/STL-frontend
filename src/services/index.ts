import moment from 'moment'

export const getDate = (type: 'start' | 'end' = 'start') => {
    if (type === 'start') {
        return moment().startOf('month').toISOString()
    }
    return moment().endOf('month').toISOString()
}
