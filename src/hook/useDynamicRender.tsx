import { isEmpty } from 'lodash'
import React, { Fragment, startTransition, useCallback, useMemo, useState } from 'react'

interface Props {
    children: React.ReactNode
}

interface UseDynamicRenderOptions {
    RootLayout?: React.FC<Props>
    ElementsLayout?: React.FC<Props & { id: string }>
    layouts: Array<{ layout: { key: string }; index: number; order: number }>
}

interface Result {
    [x: number]: JSX.Element[]
}

interface Element {
    [x: string]: (option: { id: string; order: number }) => JSX.Element
}

const useDynamicRender = (options: UseDynamicRenderOptions) => {
    const { RootLayout = Fragment, ElementsLayout = Fragment, layouts } = options
    const [element, setElement] = useState<Element>({})

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

            const el = element[key]

            const Element = <Fragment key={key}>{el?.({ id: key, order })}</Fragment>

            if (result[index]) {
                result[index].push(Element)
            } else {
                result[index] = [Element]
            }

            return result
        }, {})

        for (const [key, children] of Object.entries(childrens)) {
            result.push(
                <ElementsLayout key={key} id={key}>
                    {children}
                </ElementsLayout>
            )
        }

        return result
    }, [element])

    const setElementTransition = useCallback((data: Element) => {
        startTransition(() => {
            setElement(data)
        })
    }, [])

    return {
        setElement: setElementTransition,
        renderComponent: <RootLayout>{render}</RootLayout>,
    }
}

export default useDynamicRender
