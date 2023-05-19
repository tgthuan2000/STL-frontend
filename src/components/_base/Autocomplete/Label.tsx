import { Combobox } from '@headlessui/react'
import React from 'react'
import { AutocompleteLabelProps } from '~/@types/components'
import LoadingButton from '../../Loading/LoadingButton'
import LabelCore from '~/components/Label'

const Label: React.FC<AutocompleteLabelProps> = ({ label, onReload, loading }) => {
    return (
        <div className='flex items-center justify-between'>
            <LabelCore label={label} as={Combobox.Label} />
            {onReload && <LoadingButton disabled={loading} onReload={onReload} />}
        </div>
    )
}

export default Label
