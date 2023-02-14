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
            <div className='flex justify-between mt-2 mx-2'>
                {viewTotal && (
                    <div className='flex gap-3 text-gray-900 dark:text-slate-200 text-xs font-normal'>
                        {totalLoading ? (
                            Array.from(Array(3)).map((v, i) => (
                                <span key={i} className='animate-pulse flex flex-col gap-1'>
                                    <span className='inline-block h-3.5 w-10 bg-gray-500 dark:bg-slate-700 rounded-full' />{' '}
                                    <span className='inline-block h-3.5 w-14 bg-gray-500 dark:bg-slate-700 rounded-full' />
                                </span>
                            ))
                        ) : (
                            <>
                                {!isNil(totalData?.receive) && (
                                    <span>
                                        {receiveTitle}{' '}
                                        <p className='text-green-500 text-sm'>{numeral(totalData?.receive).format()}</p>
                                    </span>
                                )}
                                {!isNil(totalData?.cost) && (
                                    <span>
                                        {costTitle}{' '}
                                        <p className='text-red-500 text-sm'>{numeral(totalData?.cost).format()}</p>
                                    </span>
                                )}
                                {!isNil(totalData?.count) && (
                                    <span>
                                        {countTitle}{' '}
                                        <p className='text-indigo-500 text-sm'>{numeral(totalData?.count).format()}</p>
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
