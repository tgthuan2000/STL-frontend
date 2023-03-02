export interface IAccount extends IUserProfile {
    role: {
        _id: string
        name: string
    }
}

export interface AccountService {
    getAll: () => AccountDefaultValueResult
    getDefaultValue: AccountGetDefaultValue
}

export type AccountGetDefaultValue = (options: AccountDefaultValueOption) => AccountDefaultValueResult

export interface AccountDefaultValueOption {
    searchParams: URLSearchParams
    getAll: AccountDefaultValueResult
}

export interface AccountDefaultValueResult {
    query: QueryTypeUseQuery<AccountQueryData>
    params: ParamsTypeUseQuery
    tags: TagsTypeUseQuery<AccountQueryData>
}

export interface AccountQueryData {
    account: Array<IAccount>
}
