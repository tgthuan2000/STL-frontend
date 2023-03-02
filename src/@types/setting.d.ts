import { PERMISSION } from '~/constant/permission'

export interface SettingOptions {
    id: string
    className: string
    component: React.FC<SettingComponentProps>
    permissions: Array<PERMISSION>
}
export interface SettingComponentProps {
    className?: string
}
