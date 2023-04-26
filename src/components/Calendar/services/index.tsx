import moment from 'moment'
import { TitleEvent } from '../events'

const randomDate = () => {
    const random = Math.random() > 0.5

    const date = moment()

    if (random) {
        date.add(Math.floor(Math.random() * 10), 'days')
    } else {
        date.subtract(Math.floor(Math.random() * 10), 'days')
    }

    return date.toDate()
}

const randomTitle = () => {
    const titles = ['Đi chơi nè', 'Cúp học nè', 'Nghỉ làm xíu hoi', 'Ai bít dì mô', 'Thơm khùng 😁']
    return titles[Math.floor(Math.random() * titles.length)]
}

const randomColor = () => {
    const colors = [
        'text-white bg-blue-500',
        'text-white bg-red-500',
        'text-white bg-green-500',
        'text-white bg-yellow-500',
        'text-gray-900 bg-cyan-200',
        'text-white bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500',
    ]
    return colors[Math.floor(Math.random() * colors.length)]
}

export const mocks = Array.from(Array(20)).map(() => {
    const title = randomTitle()

    return {
        end: randomDate(),
        start: randomDate(),
        allDay: Math.random() > 0.5,
        title: <TitleEvent title={title} color='#000000' />,
        resource: {
            tooltip: title,
            color: randomColor(),
        },
    }
})
