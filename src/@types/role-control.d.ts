export interface IPermissions {
    _id: PERMISSION
    name: string
    description: string
}
export interface IPermissionGroup {
    _id: string
    name: string
    permissions: IPermissions[]
}
export interface IRoleControl {
    _id: string
    name: string
    description: string
    parentId: string | null
    permissions: { _id: PERMISSION }[]
}
