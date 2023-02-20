import { FireIcon, ListBulletIcon } from '@heroicons/react/24/outline'
import { isNil } from 'lodash'
import numeral from 'numeral'
import React from 'react'
import { ListViewFilterProps } from '~/@types/components'
import { DATA_LIST_MODE } from '~/constant/component'
import i18n from '~/i18n'
import LANGUAGE from '~/i18n/language/key'
import TimeFilter from './TimeFilter'
import { Dropdown } from './_base'

const { t } = i18n
const ListViewFilter: React.FC<ListViewFilterProps> = ({
    loading,
    totalLoading,
    timeFilter = true,
    viewListMode = true,
    viewTotal = true,
    onSubmitTimeFilter,
    children,
    totalData,
    receiveTitle = t(LANGUAGE.RECEIVE),
    costTitle = t(LANGUAGE.COST),
    countTitle = t(LANGUAGE.TRANSACTION),
    _,
}) => {
    const { dropdownOptions, form, listGroupOptions, viewMode } = _
    return (
        <div className='flex flex-col'>
            {timeFilter && (
                <div className='self-start'>
                    <TimeFilter onSubmit={onSubmitTimeFilter} />
                </div>
            )}
            <div className='mx-2 mt-2 flex justify-between'>
                {viewTotal && (
                    <div className='flex gap-3 text-xs font-normal text-gray-900 dark:text-slate-200'>
                        {totalLoading ? (
                            Array.from(Array(3)).map((v, i) => (
                                <span key={i} className='flex animate-pulse flex-col gap-1'>
                                    <span className='inline-block h-3.5 w-10 rounded-full bg-gray-300 dark:bg-slate-700' />{' '}
                                    <span className='inline-block h-3.5 w-14 rounded-full bg-gray-300 dark:bg-slate-700' />
                                </span>
                            ))
                        ) : (
                            <>
                                {!isNil(totalData?.receive) && (
                                    <span>
                                        {receiveTitle}{' '}
                                        <p className='text-sm text-green-500'>{numeral(totalData?.receive).format()}</p>
                                    </span>
                                )}
                                {!isNil(totalData?.cost) && (
                                    <span>
                                        {costTitle}{' '}
                                        <p className='text-sm text-red-500'>{numeral(totalData?.cost).format()}</p>
                                    </span>
                                )}
                                {!isNil(totalData?.count) && (
                                    <span>
                                        {countTitle}{' '}
                                        <p className='text-sm text-indigo-500'>{numeral(totalData?.count).format()}</p>
                                    </span>
                                )}
                            </>
                        )}
                    </div>
                )}
                {viewListMode && (
                    <div className='flex items-center gap-2'>
                        {viewMode && viewMode.id === DATA_LIST_MODE.LIST && (
                            <Dropdown
                                form={form}
                                name='listGroup'
                                data={listGroupOptions}
                                idKey='id'
                                valueKey='name'
                                label={<ListBulletIcon className='h-6' />}
                                disabled={loading}
                            />
                        )}
                        <Dropdown
                            form={form}
                            name='viewMode'
                            data={dropdownOptions}
                            idKey='id'
                            valueKey='name'
                            label={<FireIcon className='h-6' />}
                            disabled={loading}
                        />
                        {children}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ListViewFilter
