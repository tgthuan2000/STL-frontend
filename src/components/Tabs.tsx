import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Tab } from '@headlessui/react'
import clsx from 'clsx'
import React, { memo, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { TabsProps } from '~/@types/spending'
import LANGUAGE from '~/i18n/language/key'

const Tabs: React.FC<TabsProps> = ({
    options,
    idKey = 'id',
    tabLabelKey = 'label',
    tabContentKey = 'content',
    getOptionLabel,
    getOptionContent,
    className,
}) => {
    const { t } = useTranslation()
    const [parent] = useAutoAnimate<HTMLDivElement>()

    return (
        <div className={className} ref={parent}>
            <Tab.Group>
                <Tab.List className='space-x-2 mb-4 border-b dark:border-slate-700'>
                    {options.map((option, index) => (
                        <Tab key={option[idKey] ?? index}>
                            {({ selected }) => (
                                <span
                                    className={clsx(
                                        'inline-block transition-all font-normal sm:text-base text-sm outline-none border-b-2 cursor-pointer p-2',
                                        selected
                                            ? 'text-rose-500 border-rose-500'
                                            : 'text-gray-600 dark:text-slate-200 border-transparent'
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
                            <Suspense
                                fallback={
                                    <div className='text-gray-900 dark:text-slate-200'>{t(LANGUAGE.LOADING)}</div>
                                }
                            >
                                {getOptionContent?.(option) ?? option[tabContentKey]}
                            </Suspense>
                        </Tab.Panel>
                    ))}
                </Tab.Panels>
            </Tab.Group>
        </div>
    )
}

export default memo(Tabs)
