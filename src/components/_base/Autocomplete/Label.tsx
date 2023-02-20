import { Combobox } from '@headlessui/react'
import React from 'react'
import { AutocompleteLabelProps } from '~/@types/components'
import LoadingButton from '../../Loading/LoadingButton'

const Label: React.FC<AutocompleteLabelProps> = ({ label, onReload, loading }) => {
    return (
        <div className='flex items-center justify-between'>
            <Combobox.Label className='inline-block text-sm font-medium text-gray-700 dark:text-slate-100'>
                {label}
            </Combobox.Label>
            {onReload && <LoadingButton disabled={loading} onReload={onReload} />}
        </div>
    )
}

export default Label
