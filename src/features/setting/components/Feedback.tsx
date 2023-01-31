import { ChatAlt2Icon } from '@heroicons/react/outline'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { SettingComponentProps } from '~/@types/setting'

const Feedback: React.FC<SettingComponentProps> = (props) => {
    const navigate = useNavigate()
    return (
        <button
            type='button'
            {...props}
            onClick={() => {
                navigate('/feedback')
            }}
        >
            <ChatAlt2Icon className='w-6 h-6 flex-shrink-0' />
            <p>Phản hồi</p>
        </button>
    )
}
export default Feedback
