import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import moment from 'moment'
import React from 'react'
import { ReactDatePickerCustomHeaderProps } from 'react-datepicker'
import Button from '~/components/Calendar/components/Toolbar/Button'
import { DATE_FORMAT } from '~/constant'

const Header: React.FC<ReactDatePickerCustomHeaderProps> = (props) => {
    const {
        changeMonth,
        changeYear,
        customHeaderCount,
        date,
        decreaseMonth,
        decreaseYear,
        increaseMonth,
        increaseYear,
        monthDate,
        nextMonthButtonDisabled,
        nextYearButtonDisabled,
        prevMonthButtonDisabled,
        prevYearButtonDisabled,
    } = props

    return (
        <div className='mx-3 flex items-center justify-between sm:mx-1'>
            <Button isIcon hoverOpacity noBg noHover onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                <ChevronLeftIcon className='h-5 w-5' />
            </Button>
            <button
                type='button'
                className='text-xl font-medium text-gray-900 hover:opacity-50 dark:text-slate-200 sm:text-base'
            >
                {moment(monthDate).format(DATE_FORMAT.MONTH)}
            </button>
            <Button isIcon hoverOpacity noBg noHover onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                <ChevronRightIcon className='h-5 w-5' />
            </Button>
        </div>
    )
}

export default Header
