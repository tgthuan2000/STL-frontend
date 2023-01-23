/* --- SERVICES --- */

export interface Services {
    getAll: GetAll
    getDefaultValue: GetDefaultValue
    filterSubmit: FilterSubmit
    getDropdownOptions: GetDropdownOptions
    getListGroupOptions: GetLisGroupOptions
}
type GetAll = (options: GetAllOptions) => DefaultValueResult
type GetLisGroupOptions = () => Array<Array<ListGroupResult>>
type GetDefaultValue = (options: DefaultValueOption) => DefaultValueResult

type FilterSubmit = (
    data: TimeFilterPayload,
    options: FilterSubmitOption
) => React.SetStateAction<DefaultValueResult> | undefined

type GetDropdownOptions = (options: DropdownOptions) => Array<Array<DropdownResult>>

interface GetAllOptions {
    kindSpendingIds: string[]
    userId: string
}
interface DropdownOptions {
    onReloadClick: () => void
}
interface FilterSubmitOption {
    defaultValues: DefaultValueResult
    getAll: DefaultValueResult
}
interface DefaultValueOption {
    searchParams: URLSearchParams
    getAll: DefaultValueResult
}
export interface DefaultValueResult {
    query: QueryTypeUseQuery<RecentQueryData>
    params: ParamsTypeUseQuery
    tags: TagsTypeUseQuery<RecentQueryData>
}

/* --- SERVICES --- */
