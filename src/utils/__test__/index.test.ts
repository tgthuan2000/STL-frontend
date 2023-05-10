import { describe, expect, it } from 'vitest'
import { DATA_LIST_MODE } from '~/constant/component'
import { KIND_SPENDING } from '~/constant/spending'
import { checkDarkTheme, getDefaultMode, getLinkSpending } from '..'

describe('getLinkSpending', () => {
    const testCases = [
        {
            key: KIND_SPENDING.CREDIT,
            id: '123',
            expected: '/loan/transaction/123/detail',
        },
        {
            key: KIND_SPENDING.LOAN,
            id: '123',
            expected: '/loan/transaction/123/detail',
        },
        {
            key: KIND_SPENDING.COST,
            id: '123',
            expected: '/spending/transaction/123',
        },
        {
            key: KIND_SPENDING.RECEIVE,
            id: '123',
            expected: '/spending/transaction/123',
        },
    ]

    testCases.forEach(({ key, id, expected }) => {
        it(`getLinkSpending ${key} ${id}`, () => {
            expect(getLinkSpending(key, id)).toBe(expected)
        })
    })
})

describe('getDefaultMode', () => {
    // render test case for getDefaultMode
    const array = [
        [
            { id: DATA_LIST_MODE.TABLE, name: 'table' },
            { id: DATA_LIST_MODE.LIST, name: 'list' },
        ],
        [{ id: 0, name: 'refresh' }],
    ]
    const testCases = [
        {
            mode: DATA_LIST_MODE.TABLE,
            expected: { id: DATA_LIST_MODE.TABLE, name: 'table' },
        },
        {
            mode: undefined,
            expected: { id: DATA_LIST_MODE.TABLE, name: 'table' },
        },
        {
            mode: DATA_LIST_MODE.LIST,
            expected: { id: DATA_LIST_MODE.LIST, name: 'list' },
        },
        {
            mode: 0,
            expected: { id: DATA_LIST_MODE.TABLE, name: 'table' },
        },
    ]

    testCases.forEach(({ mode, expected }) => {
        it(`getDefaultMode ${array} ${mode}`, () => {
            expect(getDefaultMode(array, mode)).toEqual(expected)
        })
    })
})

describe('checkDarkTheme', () => {
    // render test case for checkDarkTheme
    const testCases = [
        {
            value: 'dark',
            expected: true,
        },
        {
            value: undefined,
            expected: false,
        },
        {
            value: 'light',
            expected: false,
        },
    ]

    testCases.forEach(({ value, expected }) => {
        it(`checkDarkTheme ${value}`, () => {
            expect(checkDarkTheme(value)).toBe(expected)
        })
    })
})
