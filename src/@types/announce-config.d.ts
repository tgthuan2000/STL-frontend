import { IUserProfile } from './auth'
import { NotifyAssignForm, NotifyContentForm, NotifyTitleDescForm } from './notify'

export interface CreateStep1Props {
    id: string
    onSubmit: (data: NotifyContentForm) => void
}
export interface CreateStep2Props {
    id: string
    onSubmit: (data: NotifyTitleDescForm) => void
}

export interface CreateStep3Props {
    id: string
    onSubmit: (data: NotifyAssignForm) => void
}
export interface QueryDataStep3 {
    users: {
        data: IUserProfile[]
        hasNextPage: boolean
    }
}
export interface CreateStep4Props {
    id: string
    onSubmit: (data: localStorageValue<DraftNotify>) => Promise<void>
}
