import { isEmpty } from 'lodash'
import React, { Fragment, useMemo, useState } from 'react'

interface Props {
    children: React.ReactNode
}

interface UseDynamicRenderOptions {
    RootLayout?: React.FC<Props>
    ElementsLayout?: React.FC<Props>
    layouts: Array<{ layout: { key: string }; index: number; order: number }>
}

interface Result {
    [x: number]: JSX.Element[]
}

const useDynamicRender = (options: UseDynamicRenderOptions) => {
    const { RootLayout = Fragment, ElementsLayout = Fragment, layouts } = options
    const [element, setElement] = useState<{ [x: string]: React.ReactNode }>({})

    const render = useMemo(() => {
        if (isEmpty(element)) {
            return
        }

        const result = []

        const childrens = layouts.reduce((result: Result, layout) => {
            const {
                layout: { key },
                index,
                order,
            } = layout

            const Element = (
                <div key={key} style={{ order }}>
                    {element[key]}
                </div>
            )

            if (result[index]) {
                result[index].push(Element)
            } else {
                result[index] = [Element]
            }

            return result
        }, {})

        for (const [key, children] of Object.entries(childrens)) {
            result.push(<ElementsLayout key={key}>{children}</ElementsLayout>)
        }

        return result
    }, [element])

    return {
        setElement,
        renderComponent: <RootLayout>{render}</RootLayout>,
    }
}

export default useDynamicRender
