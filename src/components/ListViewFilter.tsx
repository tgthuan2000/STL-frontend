import { FireIcon, ListBulletIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { ListViewFilterProps } from '~/@types/components'
import { DATA_LIST_MODE } from '~/constant/component'
import TimeFilter from './TimeFilter'
import { Dropdown } from './_base'

const ListViewFilter: React.FC<ListViewFilterProps> = ({
    loading,
    timeFilter = true,
    viewListMode = true,
    viewTotal = true,
    onSubmitTimeFilter,
    children,
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
            <div className='flex justify-between mt-2'>
                {viewTotal && <div className=''></div>}
                {viewListMode && (
                    <div className='flex items-center gap-2 mx-2'>
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
