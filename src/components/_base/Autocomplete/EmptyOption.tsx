import { Combobox } from '@headlessui/react'
import { useTranslation } from 'react-i18next'
import LANGUAGE from '~/i18n/language/key'

interface Props {
    fallback?: React.ReactNode
}

const EmptyOption: React.FC<Props> = (props) => {
    const { fallback } = props
    const { t } = useTranslation()

    return (
        <Combobox.Option
            value={undefined}
            disabled
            className='relative cursor-default select-none py-2 pl-8 pr-4 text-gray-700 dark:text-slate-200'
        >
            <span className='block truncate'>
                {t(LANGUAGE.EMPTY_DATA)} {fallback && <>- {fallback}</>}
            </span>
        </Combobox.Option>
    )
}

export default EmptyOption
