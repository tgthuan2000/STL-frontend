import { Combobox } from '@headlessui/react'
import React from 'react'
import { LazySearchSelectLabelProps } from '~/@types/components'
import LabelCore from '~/components/Label'

const Label: React.FC<LazySearchSelectLabelProps> = (props) => {
    const { label } = props

    if (!label) {
        return <></>
    }

    return <LabelCore label={label} as={Combobox.Label} />
}

export default Label
