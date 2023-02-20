export interface SettingOptions {
    id: string
    className: string
    component: React.FC<SettingComponentProps>
}
export interface SettingComponentProps {
    className?: string
}
