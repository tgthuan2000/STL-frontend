import { Combobox } from '@headlessui/react'
import clsx from 'clsx'
import { isEmpty } from 'lodash'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Waypoint } from 'react-waypoint'
import { LazySearchSelectOptionsProps } from '~/@types/components'
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
        <Combobox.Options className='absolute z-10 mt-1 w-full bg-white dark:bg-slate-600 shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'>
            {loading ? (
                <Combobox.Option value={null} disabled>
                    <p className='p-2 text-center text-xs text-gray-500 dark:text-slate-200'>{t(LANGUAGE.LOADING)}</p>
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
                                                ? 'text-white bg-indigo-600 dark:bg-cyan-500'
                                                : 'text-gray-900 dark:text-slate-200',
                                            'cursor-default select-none relative py-2 pl-8 pr-4'
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
