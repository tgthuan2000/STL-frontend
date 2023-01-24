export interface SettingOptions {
    id: number
    className: string
    component: React.FC<SettingComponentProps>
}
export interface SettingComponentProps {
    className?: string
}
