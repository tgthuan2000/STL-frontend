import { isEmpty } from 'lodash'
import React, { Fragment, startTransition, useCallback, useMemo, useState } from 'react'
import { LayoutItem } from '~/@types/context'

interface Props {
    children: React.ReactNode
}

interface UseDynamicRenderOptions {
    RootLayout?: React.FC<Props>
    ElementsLayout?: React.FC<Props & { id?: string }>
    layouts: LayoutItem[]
}

interface Element {
    [x: string]: ((index: number) => JSX.Element) | JSX.Element
}

interface Item {
    id: string
    index: number
}

const useDynamicRender = (options: UseDynamicRenderOptions) => {
    const { RootLayout = Fragment, ElementsLayout = Fragment, layouts } = options
    const [element, setElement] = useState<Element>({})
    const [_layouts, setLayout] = useState<LayoutItem[]>(layouts)

    const render = useMemo(() => {
        if (isEmpty(element)) {
            return
        }

        return _layouts.map((items, index) => {
            return (
                <ElementsLayout key={index} id={index + ''}>
                    {items.layouts.map(({ _id }, index) => {
                        const el = element[_id]
                        return <Fragment key={_id}>{typeof el === 'function' ? el?.(index) : el}</Fragment>
                    })}
                </ElementsLayout>
            )
        })
    }, [element, _layouts])

    const updateLayout = useCallback((from: Item, to: Item) => {
        setLayout((prev) => {
            const layout = structuredClone(prev)
            const temp = layout[+from.id].layouts[from.index]
            layout[+from.id].layouts.splice(from.index, 1)
            layout[+to.id].layouts.splice(to.index, 0, temp)
            return layout
        })
    }, [])

    const setElementTransition = useCallback((data: Element) => {
        startTransition(() => {
            setElement(data)
        })
    }, [])

    const reset = useCallback(() => {
        setLayout(layouts)
    }, [layouts])

    const push = useCallback(() => {
        setLayout((prev) => {
            const layouts = structuredClone(prev)
            layouts.push({ layouts: [] })
            return layouts
        })
    }, [])

    const pop = useCallback(() => {
        setLayout((prev) => {
            const layouts = structuredClone(prev)
            const lastEl = layouts.at(-1)
            if (lastEl) {
                if (isEmpty(lastEl.layouts)) {
                    layouts.pop()
                }
            }
            return layouts
        })
    }, [])

    const submit = useCallback(
        (onSubmit: (layout: LayoutItem[]) => void | Promise<void>) => {
            return () => {
                onSubmit(_layouts)
            }
        },
        [_layouts]
    )

    return {
        setElement: setElementTransition,
        renderComponent: <RootLayout>{render}</RootLayout>,
        updateLayout,
        reset,
        push,
        pop,
        submit,
    }
}

export default useDynamicRender
