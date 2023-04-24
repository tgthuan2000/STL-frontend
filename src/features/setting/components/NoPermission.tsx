import { ShieldExclamationIcon } from '@heroicons/react/24/outline'

const NoPermission = (props: any) => {
    return (
        <div {...props}>
            <ShieldExclamationIcon className='h-6 w-6 flex-shrink-0' />
        </div>
    )
}

export default NoPermission
