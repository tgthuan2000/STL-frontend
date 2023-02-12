export interface ITrackingTransaction<T> {
    addQuery(type: ITrackingQuery): ITrackingTransaction<T>
    addParams(params: ITrackingFieldParam): ITrackingTransaction<T>
    addFields(name: ITrackingFieldName<T>, value: ITrackingFieldValue): ITrackingTransaction<T>
    execute(): Promise<void>
}

export type ITrackingQuery = string
export type ITrackingFieldName<T> = Path<T>
export type ITrackingFieldValue = string | number | boolean
export type ITrackingFieldParam = { [key: string]: any }

export interface ITrackingService {
    transaction<T>(): ITrackingTransaction<T>
}
