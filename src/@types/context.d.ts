export interface ILoadingContext {
    loading: boolean
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export interface ISlideOverContext {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    title: string
    setTitle: React.Dispatch<React.SetStateAction<string>>
}
