import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { IDataListView } from '~/@types/components'
import { UseListViewFilter } from '~/@types/hook'
import { DATA_LIST_GROUP, DATA_LIST_MODE } from '~/constant/component'
import { LOCAL_STORAGE_KEY } from '~/constant/localStorage'
import { useService } from '~/services'
import { getDefaultMode } from '~/utils'
import useLocalStorage from './useLocalStorage'

export const use_services = () => {
    const { dataListOptions, listGroupOptions } = useService()

    const services = useMemo(() => {
        return {
            getDropdownOptions: dataListOptions,
            getListGroupOptions: () => [listGroupOptions],
        }
    }, [dataListOptions, listGroupOptions])

    return services
}

const useListViewFilter: UseListViewFilter = (onReload?: () => void) => {
    const { t } = useTranslation()
    const [dataListView, setDataListView] = useLocalStorage<IDataListView>(LOCAL_STORAGE_KEY.STL_DATALIST_VIEW)
    const { getDropdownOptions, getListGroupOptions } = use_services()
    const dropdownOptions = useMemo(() => getDropdownOptions({ onReloadClick: () => onReload?.() }), [t])
    const listGroupOptions = useMemo(() => getListGroupOptions(), [t])

    const form = useForm({
        defaultValues: {
            viewMode: getDefaultMode<DATA_LIST_MODE>(dropdownOptions, dataListView?.viewMode),
            listGroup: getDefaultMode<DATA_LIST_GROUP>(listGroupOptions, dataListView?.listGroup),
        },
    })

    const viewMode = form.watch('viewMode')
    const listGroup = form.watch('listGroup')

    useEffect(() => {
        setDataListView((prev) => ({ ...prev, viewMode: viewMode.id }))
    }, [JSON.stringify(viewMode)])
    useEffect(() => {
        setDataListView((prev) => ({ ...prev, listGroup: listGroup.id }))
    }, [JSON.stringify(listGroup)])

    return { viewMode, listGroup, form, dropdownOptions, listGroupOptions }
}

export default useListViewFilter
