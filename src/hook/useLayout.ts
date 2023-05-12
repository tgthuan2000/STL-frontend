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
    const differences = useRef<Layout[] | null | undefined>(undefined)

    const data = useMemo(() => {
        const layoutGroup = getLayoutGroup(key)
        if (layoutGroup) {
            const keys = layoutGroup.layouts?.flatMap(({ layouts }) => layouts.map(({ key }) => key)) ?? []

            if (isEmpty(keys)) {
                layoutGroup.layouts = defaultLayout
            } else {
                defaultLayout.forEach(({ layouts }, index) => {
                    differences.current = layouts.filter((layout) => !keys.includes(layout.key))
                    if (!isEmpty(differences.current)) {
                        if (!layoutGroup.layouts[index]) {
                            layoutGroup.layouts[index] = { layouts: [] }
                        }
                        layoutGroup.layouts[index].layouts.push(...differences.current)
                    }
                })
            }

            return layoutGroup
        }
        differences.current = null
        return {
            _id: null,
            group: null,
            layouts: defaultLayout,
        }
    }, [getLayoutGroup])

    const getGroupLayout = async () => {
        return await client.fetch<GroupData>(GET_GROUP_LAYOUT_BY_KEY, { key: defaultGroupKey })
    }

    return { data, getGroupLayout }
}

export default useLayout
