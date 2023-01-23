import React from 'react'
import { DATA_LIST_GROUP, DATA_LIST_MODE } from '~/constant/component'

export interface DropdownResult {
    id: DATA_LIST_MODE | number
    name: string
    icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element
    onClick?: () => void
}

export interface ListGroupResult {
    id: DATA_LIST_GROUP
    name: string
}
