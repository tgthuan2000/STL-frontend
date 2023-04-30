import { ChevronLeftIcon, ChevronRightIcon, FlagIcon } from '@heroicons/react/24/outline'
import moment from 'moment'
import React, { Fragment } from 'react'
import { NavigateAction } from 'react-big-calendar'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { DATE_FORMAT } from '~/constant'
import { useMessage } from '../../services/components'
import Button from './Button'
import Wrap from './Wrap'

interface ButtonGroupProps {
    onNavigate: (navigate: NavigateAction, date?: Date | undefined) => void
    value: string
}

const ButtonGroup: React.FC<ButtonGroupProps> = (props) => {
    const { onNavigate, value } = props
    const messages = useMessage()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    const createParamsUrl = (payload: string | null) => {
        const paramsUrl = new URLSearchParams(searchParams)

        if (payload === null) {
            paramsUrl.delete('month')
        } else {
            paramsUrl.set('month', JSON.stringify(payload))
        }
        navigate(`?${paramsUrl.toString()}`, { replace: true })
    }

    const handlePrevClick = () => {
        onNavigate('PREV')
        createParamsUrl(moment(value, DATE_FORMAT.MONTH).subtract(1, 'month').format(DATE_FORMAT.MONTH))
    }

    const handleNextClick = () => {
        onNavigate('NEXT')
        createParamsUrl(moment(value, DATE_FORMAT.MONTH).add(1, 'month').format(DATE_FORMAT.MONTH))
    }

    const handleTodayClick = () => {
        onNavigate('TODAY')
        createParamsUrl(null)
    }

    return (
        <Fragment>
            <Wrap className='hidden sm:flex'>
                <Button onClick={handlePrevClick} title={messages.previous}>
                    {messages.previous}
                </Button>
                <Button onClick={handleTodayClick} title={messages.today}>
                    {messages.today}
                </Button>
                <Button onClick={handleNextClick} title={messages.next}>
                    {messages.next}
                </Button>
            </Wrap>
            <Wrap className='flex sm:hidden'>
                <Button isIcon onClick={handleTodayClick} title={messages.today}>
                    <FlagIcon className='h-5 w-5' />
                </Button>
                <Button isIcon onClick={handlePrevClick} title={messages.previous}>
                    <ChevronLeftIcon className='h-5 w-5' />
                </Button>
                <Button isIcon onClick={handleNextClick} title={messages.next}>
                    <ChevronRightIcon className='h-5 w-5' />
                </Button>
            </Wrap>
        </Fragment>
    )
}

export default ButtonGroup
