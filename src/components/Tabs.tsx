import { Tab } from '@headlessui/react'
import clsx from 'clsx'
import React, { memo, Suspense } from 'react'
import { TabsProps } from '~/@types/spending'
import AnimateWrap from './AnimateWrap'
import LoadingText from './Loading/LoadingText'

const Tabs: React.FC<TabsProps> = (props) => {
    const {
        options,
        idKey = 'id',
        tabLabelKey = 'label',
        tabContentKey = 'content',
        getOptionLabel,
        getOptionContent,
        className,
    } = props

    return (
        <AnimateWrap className={className}>
            <Tab.Group>
                <Tab.List className='mb-4 space-x-2 border-b dark:border-slate-700'>
                    {options.map((option, index) => (
                        <Tab key={option[idKey] ?? index}>
                            {({ selected }) => (
                                <span
                                    className={clsx(
                                        'inline-block cursor-pointer border-b-2 p-2 text-sm font-normal outline-none transition-all sm:text-base',
                                        selected
                                            ? 'border-rose-500 text-rose-500'
                                            : 'border-transparent text-gray-600 dark:text-slate-200'
                                    )}
                                >
                                    {getOptionLabel?.(option) ?? option[tabLabelKey]}
                                </span>
                            )}
                        </Tab>
                    ))}
                </Tab.List>
                <Tab.Panels>
                    {options.map((option, index) => (
                        <Tab.Panel key={option[idKey] ?? index}>
                            <Suspense fallback={<LoadingText />}>
                                {getOptionContent?.(option) ?? option[tabContentKey]}
                            </Suspense>
                        </Tab.Panel>
                    ))}
                </Tab.Panels>
            </Tab.Group>
        </AnimateWrap>
    )
}

export default memo(Tabs)
