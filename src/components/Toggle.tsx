import { useState } from 'react'
import { Switch } from '@headlessui/react'
import clsx from 'clsx'

function Toggle() {
    const [enabled, setEnabled] = useState(false)

    return (
        <Switch
            checked={enabled}
            onChange={setEnabled}
            className={clsx(
                enabled ? 'bg-indigo-600' : 'bg-gray-200',
                'relative inline-flex h-6 w-11 items-center rounded-full transition-all'
            )}
        >
            <span
                className={clsx(
                    enabled ? 'translate-x-6' : 'translate-x-1',
                    'inline-block h-4 w-4 transform rounded-full bg-white transition-all'
                )}
            />
        </Switch>
    )
}

export default Toggle
