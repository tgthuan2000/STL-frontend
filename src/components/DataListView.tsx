import { DataListViewProps } from '~/@types/components'
import { DATA_LIST_MODE } from '~/constant/component'
import List from './List'
import Table from './Table'

const DataListView: React.FC<DataListViewProps> = ({ mode, view: { list, table }, ...props }) => {
    switch (mode) {
        case DATA_LIST_MODE.TABLE:
            return <Table {...table} {...props} />
        case DATA_LIST_MODE.LIST:
            return <List {...list} {...props} />
    }
}

export default DataListView
