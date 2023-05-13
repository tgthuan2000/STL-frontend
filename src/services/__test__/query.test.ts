import { describe, expect, it } from 'vitest'
import {
    getCategorySpending,
    getMethodSpending,
    getMethodSpendingDescSurplus,
    getPayDueLoan,
    getRecentLoan,
    getRecentSpending,
    getRecentSpendingFilterDateRangePaginate,
    getStatisticLoan,
    getStatisticSpending,
} from '../query'

describe('query', () => {
    it('getCategorySpending', () => {
        const userProfile = {
            _id: '123',
            _rev: '123',
            _type: 'user',
            _createdAt: '',
            _updatedAt: '',
        }
        const kindSpending = '123'
        expect(getCategorySpending({ userProfile, kindSpending })).toMatchSnapshot()
    })

    it('getMethodSpendingDescSurplus', () => {
        const userProfile = {
            _id: '123',
            _rev: '123',
            _type: 'user',
            _createdAt: '',
            _updatedAt: '',
        }
        expect(getMethodSpendingDescSurplus({ userProfile })).toMatchSnapshot()
    })

    it('getMethodSpending', () => {
        const userProfile = {
            _id: '123',
            _rev: '123',
            _type: 'user',
            _createdAt: '',
            _updatedAt: '',
        }
        expect(getMethodSpending({ userProfile })).toMatchSnapshot()
    })

    it('getStatisticSpending', () => {
        const userProfile = {
            _id: '123',
            _rev: '123',
            _type: 'user',
            _createdAt: '',
            _updatedAt: '',
        }
        expect(getStatisticSpending({ userProfile })).toMatchSnapshot()
    })

    it('getRecentSpending', () => {
        const userProfile = {
            _id: '123',
            _rev: '123',
            _type: 'user',
            _createdAt: '',
            _updatedAt: '',
        }
        const getKindSpendingIds = () => ['cost', 'receive', 'transfer-from', 'transfer-to']
        expect(getRecentSpending({ userProfile, getKindSpendingIds })).toMatchSnapshot()
    })

    it('getRecentSpendingFilterDateRangePaginate', () => {
        const userProfile = {
            _id: '123',
            _rev: '123',
            _type: 'user',
            _createdAt: '',
            _updatedAt: '',
        }
        const getKindSpendingIds = () => ['cost', 'receive', 'transfer-from', 'transfer-to']
        expect(getRecentSpendingFilterDateRangePaginate({ userProfile, getKindSpendingIds })).toMatchSnapshot()
    })

    it('getRecentLoan', () => {
        const userProfile = {
            _id: '123',
            _rev: '123',
            _type: 'user',
            _createdAt: '',
            _updatedAt: '',
        }
        const kindLoan = '123'
        const kindCredit = '123'
        expect(getRecentLoan({ userProfile, kindLoan, kindCredit })).toMatchSnapshot()
    })

    // it('getPayDueLoan', () => {
    //     const userProfile = {
    //         _id: '123',
    //         _rev: '123',
    //         _type: 'user',
    //         _createdAt: '',
    //         _updatedAt: '',
    //     }
    //     const kindLoan = '123'
    //     const kindCredit = '123'
    //     expect(getPayDueLoan({ userProfile, kindLoan, kindCredit })).toMatchSnapshot()
    // })

    it('getStatisticLoan', () => {
        const userProfile = {
            _id: '123',
            _rev: '123',
            _type: 'user',
            _createdAt: '',
            _updatedAt: '',
        }
        expect(getStatisticLoan({ userProfile })).toMatchSnapshot()
    })
})
