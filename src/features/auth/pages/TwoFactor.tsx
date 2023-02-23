import { TwoFactorForm } from '~/components'

const TwoFactor = () => {
    const handleSubmit = (data: any) => {}
    return (
        <div className='flex h-screen items-center justify-center overflow-hidden'>
            <TwoFactorForm onSubmit={handleSubmit} />
        </div>
    )
}

export default TwoFactor
