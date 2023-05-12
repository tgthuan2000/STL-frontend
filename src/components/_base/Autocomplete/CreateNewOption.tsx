import { Combobox } from '@headlessui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import LANGUAGE from '~/i18n/language/key'

interface Props {
    query: string
}

const CreateNewOption: React.FC<Props> = (props) => {
    const { query } = props
    const { t } = useTranslation()

    const _query = query.trim()

    if (_query === '') {
        return <></>
    }

    let text = query.replace(/\s+/g, ' ').trim()
    text = text.charAt(0).toUpperCase() + text.slice(1)

    return (
        <Combobox.Option
            value={query.trim()}
            className='relative cursor-default select-none bg-indigo-600 py-2 pl-8 pr-4 text-white'
        >
            <span className='block truncate'>
                {t(LANGUAGE.CREATE_NEW)} <span className='font-medium'>"{text}"</span>
            </span>
        </Combobox.Option>
    )
}

export default CreateNewOption
