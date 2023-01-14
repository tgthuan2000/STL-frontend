import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Tab } from '@headlessui/react'
import clsx from 'clsx'
import React, { Fragment, memo, Suspense } from 'react'
import { TabsProps } from '~/@types/spending'

const Tabs: React.FC<TabsProps> = ({
    options,
    idKey = 'id',
    tabLabelKey = 'label',
    tabContentKey = 'content',
    getOptionLabel,
    getOptionContent,
    className,
}) => {
    const [parent] = useAutoAnimate<HTMLDivElement>()
    const [panelRef] = useAutoAnimate<HTMLDivElement>()

    return (
        <div className={className} ref={parent}>
            <Tab.Group>
                <Tab.List className='space-x-2 mb-4 border-b'>
                    {options.map((option, index) => (
                        <Tab key={option[idKey] ?? index}>
                            {({ selected }) => (
                                <span
                                    className={clsx(
                                        'inline-block transition-all font-normal sm:text-base text-sm outline-none border-b-2 cursor-pointer p-2',
                                        selected ? 'text-rose-500 border-rose-500' : 'text-gray-600 border-transparent'
                                    )}
                                >
                                    {getOptionLabel?.(option) ?? option[tabLabelKey]}
                                </span>
                            )}
                        </Tab>
                    ))}
                </Tab.List>
                <Tab.Panels ref={panelRef}>
                    <Suspense fallback={<div>Loading...</div>}>
                        {options.map((option, index) => (
                            <Tab.Panel key={option[idKey] ?? index}>
                                {getOptionContent?.(option) ?? option[tabContentKey]}
                            </Tab.Panel>
                        ))}
                    </Suspense>
                </Tab.Panels>
            </Tab.Group>
        </div>
    )
}

export default memo(Tabs)
