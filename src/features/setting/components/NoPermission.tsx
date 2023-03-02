import { ShieldExclamationIcon } from '@heroicons/react/24/outline'

const NoPermission = (props: any) => {
    return (
        <div {...props}>
            <ShieldExclamationIcon className='h-10 w-10 flex-shrink-0' />
        </div>
    )
}

export default NoPermission
