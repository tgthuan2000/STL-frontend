import { isEmpty } from 'lodash'
import { useMemo, useRef } from 'react'
import { Layout, LayoutItem } from '~/@types/context'
import { LAYOUT_GROUP } from '~/constant/render-layout'
import { useConfig } from '~/context'
import { client } from '~/sanityConfig'
import { GET_GROUP_LAYOUT_BY_KEY } from '~/schema/query/layout'

interface Options {
    key: keyof typeof LAYOUT_GROUP
    defaultLayout: LayoutItem[]
    defaultGroupKey: LAYOUT_GROUP
}

interface GroupData {
    _id: string
    layouts: Array<{ _id: string; key: string }>
}

const useLayout = (options: Options) => {
    const { defaultGroupKey, defaultLayout, key } = options
    const { getLayoutGroup } = useConfig()

    const data = useMemo(() => {
        const layoutGroup = getLayoutGroup(key)
        if (layoutGroup) {
            const keys = layoutGroup.layouts.flatMap(({ layouts }) => layouts.map(({ _id }) => _id))

            if (isEmpty(keys)) {
                layoutGroup.layouts = defaultLayout
            } else {
                defaultLayout.forEach(({ layouts }, index) => {
                    const differences = layouts.filter((layout) => !keys.includes(layout._id))
                    if (!isEmpty(differences)) {
                        if (!layoutGroup.layouts[index]) {
                            layoutGroup.layouts[index] = { layouts: [] }
                        }
                        layoutGroup.layouts[index].layouts.push(...differences)
                    }
                })
            }

            return layoutGroup
        }
        return {
            _id: null,
            group: { _id: defaultGroupKey },
            layouts: defaultLayout,
        }
    }, [getLayoutGroup])

    return { data }
}

export default useLayout
