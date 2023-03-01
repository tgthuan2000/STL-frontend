import { Combobox } from '@headlessui/react'
import clsx from 'clsx'
import { isEmpty } from 'lodash'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Waypoint } from 'react-waypoint'
import { LazySearchSelectOptionsProps } from '~/@types/components'
import LoadingText from '~/components/Loading/LoadingText'
import LANGUAGE from '~/i18n/language/key'

const Options: React.FC<LazySearchSelectOptionsProps> = ({
    loading,
    options,
    valueKey,
    labelKey,
    getOptionLabel,
    handleGetMoreData,
    hasNextPage,
}) => {
    const { t } = useTranslation()
    return (
        <Combobox.Options className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-slate-600 sm:text-sm'>
            {loading ? (
                <Combobox.Option value={null} disabled>
                    <LoadingText className='p-2 text-center text-xs' />
                </Combobox.Option>
            ) : (
                <>
                    {isEmpty(options) ? (
                        <p className='p-2 text-center text-xs text-gray-500 dark:text-slate-200'>
                            {t(LANGUAGE.EMPTY_DATA)}
                        </p>
                    ) : (
                        <>
                            {options?.map((item, index) => (
                                <Combobox.Option
                                    key={item[valueKey]}
                                    className={({ active }) =>
                                        clsx(
                                            active
                                                ? 'bg-indigo-600 text-white dark:bg-cyan-500'
                                                : 'text-gray-900 dark:text-slate-200',
                                            'relative cursor-default select-none py-2 pl-8 pr-4'
                                        )
                                    }
                                    value={item}
                                >
                                    {({ active }) => <>{getOptionLabel?.(item, active) ?? <p>{item[labelKey]}</p>}</>}
                                </Combobox.Option>
                            ))}
                        </>
                    )}
                    {hasNextPage && <Waypoint onEnter={handleGetMoreData} bottomOffset='-20%' />}
                </>
            )}
        </Combobox.Options>
    )
}

export default Options
