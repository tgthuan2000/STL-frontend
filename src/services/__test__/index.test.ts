import moment from 'moment'
import { describe, expect, it } from 'vitest'
import { service } from '..'

describe('getDateOfMonth', () => {
    const testCases: Array<{ date: string; type: 'start' | 'end'; expected: string }> = [
        {
            date: '15-02-2023',
            type: 'start',
            expected: '2023-02-01T00:00:00.000Z',
        },
        {
            date: '15-02-2023',
            type: 'end',
            expected: '2023-02-28T23:59:59.999Z',
        },
        {
            date: '15-02-2023',
            type: 'start',
            expected: '2023-02-01T00:00:00.000Z',
        },
        {
            date: '15-02-2023',
            type: 'end',
            expected: '2023-02-28T23:59:59.999Z',
        },
    ]
    testCases.forEach((testCase) => {
        it(`${testCase.type}DateOfMonth/withDate`, () => {
            const date = moment(testCase.date, 'DD-MM-YYYY')
            const actual = service.getDateOfMonth(testCase.type, date)
            const expected = testCase.expected
            expect(actual).toBe(expected)
        })
    })
})

describe('getDate', () => {
    const testCases: Array<{ date: string; type: 'start' | 'end'; of: moment.unitOfTime.StartOf; expected: string }> = [
        {
            date: '15-02-2023',
            type: 'start',
            of: 'day',
            expected: '2023-02-15T00:00:00.000Z',
        },
        {
            date: '15-02-2023',
            type: 'end',
            of: 'day',
            expected: '2023-02-15T23:59:59.999Z',
        },
        {
            date: '15-02-2023',
            type: 'start',
            of: 'month',
            expected: '2023-02-01T00:00:00.000Z',
        },
        {
            date: '15-02-2023',
            type: 'end',
            of: 'month',
            expected: '2023-02-28T23:59:59.999Z',
        },
        {
            date: '15-02-2023',
            type: 'start',
            of: 'year',
            expected: '2023-01-01T00:00:00.000Z',
        },
        {
            date: '15-02-2023',
            type: 'end',
            of: 'year',
            expected: '2023-12-31T23:59:59.999Z',
        },
    ]
    testCases.forEach((testCase) => {
        it(`${testCase.type}Date/${testCase.of}/withDate`, () => {
            const date = moment(testCase.date, 'DD-MM-YYYY').toDate()
            const actual = service.getDate(date, testCase.type, testCase.of)
            const expected = testCase.expected
            expect(actual).toBe(expected)
        })
    })
})

describe('deleteObjKeys', () => {
    const testCases = [
        {
            obj: {
                name: 'hello',
                age: 20,
                address: 'world',
            },
            keys: ['name', 'age'],
            expected: {
                address: 'world',
            },
        },
        {
            obj: {
                name: 'hello',
                age: 20,
                address: 'world',
            },
            keys: ['name', 'age', 'address'],
            expected: {},
        },
        {
            obj: {
                name: 'hello',
                age: 20,
                address: 'world',
            },
            keys: ['name', 'age', 'address', 'phone'],
            expected: {},
        },
    ]
    testCases.forEach((testCase) => {
        it(`${testCase.keys}/withKeys`, () => {
            const actual = service.deleteObjKeys(testCase.obj, testCase.keys)
            const expected = testCase.expected
            expect(actual).toEqual(expected)
        })
    })
})

describe('hashCode', () => {
    const testCases: Array<{ str: string; expected: number }> = [
        {
            str: 'hello',
            expected: 99162322,
        },
        {
            str: 'hello world',
            expected: 1794106052,
        },
        {
            str: 'hello world!',
            expected: -217287203,
        },
    ]
    testCases.forEach((testCase) => {
        it(`${testCase.str}/withString`, () => {
            const actual = service.hashCode(testCase.str)
            const expected = testCase.expected
            expect(actual).toBe(expected)
        })
    })
})

describe('getColorPrize', () => {
    const testCases = [
        {
            prize: 1,
            expected: [{ 'text-green-500': true }, { 'text-red-500': false }, { 'text-gray-500': false }],
        },
        {
            prize: 0,
            expected: [{ 'text-green-500': false }, { 'text-red-500': false }, { 'text-gray-500': true }],
        },
        {
            prize: -1,
            expected: [{ 'text-green-500': false }, { 'text-red-500': true }, { 'text-gray-500': false }],
        },
    ]
    testCases.forEach((testCase) => {
        it(`${testCase.prize}/withPrize`, () => {
            const actual = service.getColorPrize(testCase.prize)
            const expected = testCase.expected
            expect(actual).toStrictEqual(expected)
        })
    })
})

describe('getBudgetId', () => {
    const testCases = [
        {
            budget: {
                userId: 'mtd9mj26evp8hh5',
                date: '15-02-2023',
            },
            expected: '2023-02-mtd9mj26evp8hh5',
        },
        {
            budget: {
                userId: 'm2xp0iqgirbhrb3',
                date: '21-04-2023',
            },
            expected: '2023-04-m2xp0iqgirbhrb3',
        },
        {
            budget: {
                userId: 'e6kmddlxgb0shyl',
                date: '30-05-2024',
            },
            expected: '2024-05-e6kmddlxgb0shyl',
        },
    ]
    testCases.forEach((testCase) => {
        it(`${testCase.budget.userId}/withBudget`, () => {
            const date = moment(testCase.budget.date, 'DD-MM-YYYY')
            const actual = service.getBudgetId(testCase.budget.userId, date)
            const expected = testCase.expected
            expect(actual).toBe(expected)
        })
    })
})

describe('getSpacingTime', () => {
    const testCases = [
        {
            time: '2021-01-01T00:00:00.000Z',
            now: new Date('2021-01-02T00:00:00.000Z'),
            expected: '24 giờ trước',
        },
        {
            time: '2021-01-01T00:00:00.000Z',
            now: new Date('2021-01-03T00:00:00.000Z'),
            expected: '2 ngày trước',
        },
        {
            time: '2021-01-01T00:00:00.000Z',
            now: new Date('2021-01-02T01:00:00.000Z'),
            expected: '2 ngày trước',
        },
        {
            time: '2021-01-01T00:00:00.000Z',
            now: new Date('2021-01-02T01:01:00.000Z'),
            expected: '2 ngày trước',
        },
        {
            time: '2021-01-01T00:00:00.000Z',
            now: new Date('2021-01-02T01:01:01.000Z'),
            expected: '2 ngày trước',
        },
    ]
    testCases.forEach((testCase) => {
        it(`${testCase.time}/withTime`, () => {
            const actual = service.getSpacingTime(testCase.time, testCase.now)
            const expected = testCase.expected
            expect(actual).toBe(expected)
        })
    })
})

describe('listToTree', () => {
    // render test case for listToTree
    const testCases = [
        {
            list: [
                {
                    _id: '1',
                    parentId: null,
                    name: '1',
                },
                {
                    _id: '2',
                    parentId: null,
                    name: '2',
                },
                {
                    _id: '3',
                    parentId: '1',
                    name: '3',
                },
                {
                    _id: '4',
                    parentId: '1',
                    name: '4',
                },
                {
                    _id: '5',
                    parentId: '2',
                    name: '5',
                },
                {
                    _id: '6',
                    parentId: '2',
                    name: '6',
                },
                {
                    _id: '7',
                    parentId: '3',
                    name: '7',
                },
                {
                    _id: '8',
                    parentId: '3',
                    name: '8',
                },
                {
                    _id: '9',
                    parentId: '4',
                    name: '9',
                },
                {
                    _id: '10',
                    parentId: '4',
                    name: '10',
                },
                {
                    _id: '11',
                    parentId: '5',
                    name: '11',
                },
                {
                    _id: '12',
                    parentId: '5',
                    name: '12',
                },
                {
                    _id: '13',
                    parentId: '6',
                    name: '13',
                },
                {
                    _id: '14',
                    parentId: '6',
                    name: '14',
                },
                {
                    _id: '15',
                    parentId: '7',
                    name: '15',
                },
                {
                    _id: '16',
                    parentId: '7',
                    name: '16',
                },
                {
                    _id: '17',
                    parentId: '8',
                    name: '17',
                },
                {
                    _id: '18',
                    parentId: '8',
                    name: '18',
                },
                {
                    _id: '19',
                    parentId: '9',

                    name: '19',
                },
                {
                    _id: '20',
                    parentId: '9',
                    name: '20',
                },
            ],
            expected: [
                {
                    _id: '1',
                    parentId: null,
                    name: '1',
                    children: [
                        {
                            _id: '3',
                            parentId: '1',
                            name: '3',
                            children: [
                                {
                                    _id: '7',
                                    parentId: '3',

                                    name: '7',
                                    children: [
                                        {
                                            _id: '15',
                                            parentId: '7',
                                            name: '15',
                                            children: [],
                                        },
                                        {
                                            _id: '16',
                                            parentId: '7',
                                            name: '16',
                                            children: [],
                                        },
                                    ],
                                },
                                {
                                    _id: '8',
                                    parentId: '3',
                                    name: '8',
                                    children: [
                                        {
                                            _id: '17',
                                            parentId: '8',
                                            name: '17',
                                            children: [],
                                        },
                                        {
                                            _id: '18',

                                            parentId: '8',
                                            name: '18',
                                            children: [],
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            _id: '4',
                            parentId: '1',
                            name: '4',
                            children: [
                                {
                                    _id: '9',
                                    parentId: '4',
                                    name: '9',
                                    children: [
                                        {
                                            _id: '19',

                                            parentId: '9',
                                            name: '19',
                                            children: [],
                                        },
                                        {
                                            _id: '20',
                                            parentId: '9',
                                            name: '20',
                                            children: [],
                                        },
                                    ],
                                },
                                {
                                    _id: '10',
                                    parentId: '4',
                                    name: '10',
                                    children: [],
                                },
                            ],
                        },
                    ],
                },
                {
                    _id: '2',
                    parentId: null,
                    name: '2',
                    children: [
                        {
                            _id: '5',
                            parentId: '2',
                            name: '5',
                            children: [
                                {
                                    _id: '11',
                                    parentId: '5',
                                    name: '11',
                                    children: [],
                                },
                                {
                                    _id: '12',
                                    parentId: '5',

                                    name: '12',

                                    children: [],
                                },
                            ],
                        },
                        {
                            _id: '6',
                            parentId: '2',
                            name: '6',
                            children: [
                                {
                                    _id: '13',
                                    parentId: '6',
                                    name: '13',
                                    children: [],
                                },
                                {
                                    _id: '14',
                                    parentId: '6',
                                    name: '14',
                                    children: [],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ]
    testCases.forEach((testCase) => {
        it('should return correct tree', () => {
            expect(service.listToTree(testCase.list)).toEqual(testCase.expected)
        })
    })
})
