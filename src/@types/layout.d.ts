export interface SideBarProps {
    children: React.ReactNode
    title?: string
}

export interface Navigation {
    name: string
    href: string
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}
