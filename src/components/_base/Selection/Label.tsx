import { Listbox } from '@headlessui/react'
import React from 'react'
import { SelectionLabelProps } from '~/@types/components'
import LabelCore from '~/components/Label'

const Label: React.FC<SelectionLabelProps> = (props) => {
    const { label } = props

    if (!label) {
        return <></>
    }

    return <LabelCore as={Listbox.Label} label={label} />
}

export default Label
