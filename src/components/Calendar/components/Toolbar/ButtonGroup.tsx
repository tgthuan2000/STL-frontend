import { ChevronLeftIcon, ChevronRightIcon, FlagIcon } from '@heroicons/react/24/outline'
import React, { Fragment } from 'react'
import { NavigateAction } from 'react-big-calendar'
import { useMessage } from '../../services/components'
import Button from './Button'
import Wrap from './Wrap'

interface ButtonGroupProps {
    onNavigate: (navigate: NavigateAction, date?: Date | undefined) => void
}

const ButtonGroup: React.FC<ButtonGroupProps> = (props) => {
    const { onNavigate } = props
    const messages = useMessage()

    return (
        <Fragment>
            <Wrap className='hidden sm:flex'>
                <Button onClick={() => onNavigate('PREV')} title={messages.previous}>
                    {messages.previous}
                </Button>
                <Button onClick={() => onNavigate('TODAY')} title={messages.today}>
                    {messages.today}
                </Button>
                <Button onClick={() => onNavigate('PREV')} title={messages.next}>
                    {messages.next}
                </Button>
            </Wrap>
            <Wrap className='flex sm:hidden'>
                <Button isIcon onClick={() => onNavigate('TODAY')} title={messages.today}>
                    <FlagIcon className='h-5 w-5' />
                </Button>
                <Button isIcon onClick={() => onNavigate('PREV')} title={messages.previous}>
                    <ChevronLeftIcon className='h-5 w-5' />
                </Button>
                <Button isIcon onClick={() => onNavigate('PREV')} title={messages.next}>
                    <ChevronRightIcon className='h-5 w-5' />
                </Button>
            </Wrap>
        </Fragment>
    )
}

export default ButtonGroup
