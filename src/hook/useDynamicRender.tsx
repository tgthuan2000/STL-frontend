import { findIndex, isEmpty, sortBy } from 'lodash'
import React, { Fragment, startTransition, useCallback, useMemo, useState } from 'react'

interface Props {
    children: React.ReactNode
}

interface Item {
    index: number
    order: number
}

interface UseDynamicRenderOptions {
    RootLayout?: React.FC<Props>
    ElementsLayout?: React.FC<Props & { id: string }>
    layouts: Array<Item & { layout: { key: string } }>
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
    const [_layouts, setLayout] = useState(layouts)

    const render = useMemo(() => {
        if (isEmpty(element)) {
            return
        }

        const result = []

        const childrens = _layouts.reduce((result: Result, layout) => {
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
    }, [element, _layouts])
    console.log(_layouts.map(({ index, order }) => ({ index, order })))
    const updateLayout = useCallback((from: Item, to: Item) => {
        setLayout((prev) => {
            let _layout = structuredClone(prev)
            const fromLayoutIdx = findIndex(prev, { index: from.index, order: from.order })
            if (fromLayoutIdx !== -1) {
                // delete old element
                _layout.splice(fromLayoutIdx, 1)

                const fromLayout = prev[fromLayoutIdx]
                fromLayout.index = to.index
                fromLayout.order = to.order
                _layout = _layout.map((layout) => {
                    if (layout.index === to.index) {
                        if (to.index === from.index) {
                            if (layout.order < to.order && layout.order > from.order) {
                                return { ...layout, order: layout.order - 1 }
                            }
                        }
                        if (layout.order >= to.order) {
                            return { ...layout, order: layout.order + 1 }
                        }
                    }
                    if (layout.index === from.index && layout.order >= from.order) {
                        return { ...layout, order: layout.order - 1 }
                    }
                    return layout
                })
                _layout.push(fromLayout)
            }

            return sortBy(_layout, ['index', 'order'])
        })
    }, [])

    const setElementTransition = useCallback((data: Element) => {
        startTransition(() => {
            setElement(data)
        })
    }, [])

    return {
        setElement: setElementTransition,
        renderComponent: <RootLayout>{render}</RootLayout>,
        updateLayout,
    }
}

export default useDynamicRender
