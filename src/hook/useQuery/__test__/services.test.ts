import { describe, expect, it } from 'vitest'
import { TAGS } from '~/constant'
import { assignLoading, filterQueryParams, formatTransform } from '../services'

describe('filterQueryParams', () => {
    const testCases = [
        {
            name: 'test case 1',
            query: { spending: 'spending-query' },
            params: { userId: 'userId-123' },
            tags: { spending: TAGS.ALTERNATE },
            expected: {
                spending: {
                    loading: true,
                    data: undefined,
                    query: 'spending-query',
                    params: {},
                    tags: TAGS.ALTERNATE,
                },
            },
        },
        {
            name: 'test case 2',
            query: { spending: 'spending-query with &userId' },
            params: { userId: 'userId-123' },
            tags: { spending: TAGS.SHORT },
            expected: {
                spending: {
                    loading: true,
                    data: undefined,
                    query: 'spending-query with &userId',
                    params: { userId: 'userId-123' },
                    tags: TAGS.SHORT,
                },
            },
        },
        {
            name: 'test case 3',
            query: {
                spending: 'spending-query with &userId',
                spending2: 'spending-query2 with &kindSpending',
            },
            params: {
                userId: 'userId-123',
                kindSpending: 'kindSpending-123',
            },
            tags: {
                spending: TAGS.SHORT,
                spending2: TAGS.ALTERNATE,
            },
            expected: {
                spending: {
                    loading: true,
                    data: undefined,
                    query: 'spending-query with &userId',
                    params: { userId: 'userId-123' },
                    tags: TAGS.SHORT,
                },
                spending2: {
                    loading: true,
                    data: undefined,
                    query: 'spending-query2 with &kindSpending',
                    params: { kindSpending: 'kindSpending-123' },
                    tags: TAGS.ALTERNATE,
                },
            },
        },
    ]

    testCases.forEach((testCase) => {
        it(testCase.name, () => {
            expect(filterQueryParams(testCase.query, testCase.params, testCase.tags)).toEqual(testCase.expected)
        })
    })
})

describe('formatTransform', () => {
    const testCases = [
        {
            name: 'test case 1',
            prev: {
                spending: {
                    loading: true,
                    data: undefined,
                    query: 'spending-query',
                    params: {},
                    tags: TAGS.ALTERNATE,
                },
            },
            data: {
                spending: {
                    hasNextPage: true,
                    data: [
                        { id: 'spending-123', name: 'spending-123' },
                        { id: 'spending-456', name: 'spending-456' },
                    ],
                },
            },
            query: { spending: 'spending-query' },
            params: {},
            tags: { spending: TAGS.ALTERNATE },
            keys: [],
            expected: {
                spending: {
                    loading: false,
                    query: 'spending-query',
                    params: {},
                    tags: TAGS.ALTERNATE,
                    data: {
                        data: [
                            { id: 'spending-123', name: 'spending-123' },
                            { id: 'spending-456', name: 'spending-456' },
                        ],
                        hasNextPage: true,
                    },
                },
            },
        },
        {
            name: 'test case 2',
            prev: {
                spending: {
                    loading: true,
                    data: undefined,
                    query: 'spending-query with &userId',
                    params: { userId: 'userId-123' },
                    tags: TAGS.SHORT,
                },
            },
            data: {
                spending: {
                    hasNextPage: true,
                    data: [
                        { id: 'spending-123', name: 'spending-123' },
                        { id: 'spending-456', name: 'spending-456' },
                    ],
                },
            },
            query: { spending: 'spending-query with &userId' },
            params: { userId: 'userId-123' },
            tags: { spending: TAGS.SHORT },
            keys: [],
            expected: {
                spending: {
                    loading: false,
                    query: 'spending-query with &userId',
                    params: { userId: 'userId-123' },
                    tags: TAGS.SHORT,
                    data: {
                        data: [
                            { id: 'spending-123', name: 'spending-123' },
                            { id: 'spending-456', name: 'spending-456' },
                        ],
                        hasNextPage: true,
                    },
                },
            },
        },
        {
            name: 'test case 3',
            prev: {
                spending: {
                    loading: true,
                    data: undefined,
                    query: 'spending-query with &userId',
                    params: { userId: 'userId-123' },
                    tags: TAGS.SHORT,
                },
                spending2: {
                    loading: true,
                    data: undefined,
                    query: 'spending-query2 with &kindSpending',
                    params: { kindSpending: 'kindSpending-123' },
                    tags: TAGS.ALTERNATE,
                },
            },
            data: {
                spending: {
                    hasNextPage: true,
                    data: [
                        { id: 'spending-123', name: 'spending-123' },
                        { id: 'spending-456', name: 'spending-456' },
                    ],
                },
                spending2: {
                    hasNextPage: true,
                    data: [
                        { id: 'spending2-123', name: 'spending2-123' },
                        { id: 'spending2-456', name: 'spending2-456' },
                    ],
                },
            },
            query: {
                spending: 'spending-query with &userId',
                spending2: 'spending-query2 with &kindSpending',
            },
            params: {
                userId: 'userId-123',
                kindSpending: 'kindSpending-123',
            },
            tags: {
                spending: TAGS.SHORT,
                spending2: TAGS.ALTERNATE,
            },
            keys: [],
            expected: {
                spending: {
                    loading: false,
                    query: 'spending-query with &userId',
                    params: { userId: 'userId-123' },
                    tags: TAGS.SHORT,
                    data: {
                        data: [
                            { id: 'spending-123', name: 'spending-123' },
                            { id: 'spending-456', name: 'spending-456' },
                        ],
                        hasNextPage: true,
                    },
                },
                spending2: {
                    loading: false,
                    query: 'spending-query2 with &kindSpending',
                    params: { kindSpending: 'kindSpending-123' },
                    tags: TAGS.ALTERNATE,
                    data: {
                        data: [
                            { id: 'spending2-123', name: 'spending2-123' },
                            { id: 'spending2-456', name: 'spending2-456' },
                        ],
                        hasNextPage: true,
                    },
                },
            },
        },
        {
            name: 'test case 4',
            prev: {
                spending: {
                    loading: true,
                    data: undefined,
                    query: 'spending-query with &userId',
                    params: { userId: 'userId-123' },
                    tags: TAGS.SHORT,
                },
            },
            data: {
                spending: [
                    { id: 'spending-123', name: 'spending-123' },
                    { id: 'spending-456', name: 'spending-456' },
                ],
            },
            query: { spending: 'spending-query with &userId' },
            params: { userId: 'userId-123' },
            tags: { spending: TAGS.SHORT },
            keys: [],
            expected: {
                spending: {
                    loading: false,
                    query: 'spending-query with &userId',
                    params: { userId: 'userId-123' },
                    tags: TAGS.SHORT,
                    data: [
                        { id: 'spending-123', name: 'spending-123' },
                        { id: 'spending-456', name: 'spending-456' },
                    ],
                },
            },
        },
        {
            name: 'test case 5',
            prev: {
                spending: {
                    loading: true,
                    data: undefined,
                    query: 'spending-query with &userId',
                    params: { userId: 'userId-123' },
                    tags: TAGS.SHORT,
                },
            },
            data: {
                spending: [
                    { id: 'spending-123', name: 'spending-123' },
                    { id: 'spending-456', name: 'spending-456' },
                ],
            },
            query: { spending: 'new-spending-query with &userId' },
            params: { userId: 'userId-123' },
            tags: { spending: TAGS.SHORT },
            keys: [],
            expected: {
                spending: {
                    loading: false,
                    query: 'new-spending-query with &userId',
                    params: { userId: 'userId-123' },
                    tags: TAGS.SHORT,
                    data: [
                        { id: 'spending-123', name: 'spending-123' },
                        { id: 'spending-456', name: 'spending-456' },
                    ],
                },
            },
        },
        {
            name: 'test case 6',
            prev: {
                spending: {
                    loading: true,
                    data: [
                        { id: 'spending-123', name: 'spending-123' },
                        { id: 'spending-456', name: 'spending-456' },
                    ],
                    query: 'spending-query with &userId',
                    params: { userId: 'userId-123' },
                    tags: TAGS.SHORT,
                },
            },
            data: { spending: [{ id: 'spending-789', name: 'spending-789' }] },
            query: { spending: 'spending-query with &userId' },
            params: { userId: 'userId-123' },
            tags: { spending: TAGS.SHORT },
            keys: [],
            expected: {
                spending: {
                    loading: false,
                    query: 'spending-query with &userId',
                    params: {
                        userId: 'userId-123',
                    },
                    tags: TAGS.SHORT,
                    data: [{ id: 'spending-789', name: 'spending-789' }],
                },
            },
        },
        {
            name: 'test case 7',
            prev: {
                spending: {
                    loading: true,
                    data: {
                        data: [
                            { id: 'spending-123', name: 'spending-123' },
                            { id: 'spending-456', name: 'spending-456' },
                        ],
                        hasNextPage: true,
                    },
                    query: 'spending-query with &userId',
                    params: { userId: 'userId-123' },
                    tags: TAGS.SHORT,
                },
            },
            data: {
                spending: {
                    data: [{ id: 'spending-789', name: 'spending-789' }],
                    hasNextPage: false,
                },
            },
            query: { spending: 'spending-query with &userId' },
            params: { userId: 'userId-123' },
            tags: { spending: TAGS.SHORT },
            keys: [],
            expected: {
                spending: {
                    loading: false,
                    query: 'spending-query with &userId',
                    params: {
                        userId: 'userId-123',
                    },
                    tags: TAGS.SHORT,
                    data: {
                        data: [{ id: 'spending-789', name: 'spending-789' }],
                        hasNextPage: false,
                    },
                },
            },
        },
        {
            name: 'test case 8',
            prev: {
                spending: {
                    loading: true,
                    data: {
                        data: [
                            { id: 'spending-123', name: 'spending-123' },
                            { id: 'spending-456', name: 'spending-456' },
                        ],
                        hasNextPage: true,
                    },
                    query: 'spending-query with &userId',
                    params: { userId: 'userId-123' },
                    tags: TAGS.SHORT,
                },
            },
            data: {
                spending: {
                    data: [{ id: 'spending-789', name: 'spending-789' }],
                    hasNextPage: false,
                },
            },
            query: { spending: 'spending-query with &userId' },
            params: { userId: 'userId-123' },
            tags: { spending: TAGS.SHORT },
            keys: ['spending'],
            expected: {
                spending: {
                    loading: false,
                    query: 'spending-query with &userId',
                    params: {
                        userId: 'userId-123',
                    },
                    tags: TAGS.SHORT,
                    data: {
                        data: [
                            { id: 'spending-123', name: 'spending-123' },
                            { id: 'spending-456', name: 'spending-456' },
                            { id: 'spending-789', name: 'spending-789' },
                        ],
                        hasNextPage: false,
                    },
                },
            },
        },
        {
            name: 'test case 9',
            prev: {
                spending: {
                    loading: true,
                    data: {
                        data: [
                            { id: 'spending-123', name: 'spending-123' },
                            { id: 'spending-456', name: 'spending-456' },
                        ],
                        hasNextPage: true,
                    },
                    query: 'spending-query with &userId',
                    params: { userId: 'userId-123' },
                    tags: TAGS.SHORT,
                },
            },
            data: {
                spending: {
                    data: [{ id: 'spending-789', name: 'spending-789' }],
                    hasNextPage: false,
                },
            },
            query: { spending: 'spending-query with &userId' },
            params: { userId: 'userId-123' },
            tags: { spending: TAGS.SHORT },
            keys: ['spending'],
            isRevert: true,
            expected: {
                spending: {
                    loading: false,
                    query: 'spending-query with &userId',
                    params: { userId: 'userId-123' },
                    tags: TAGS.SHORT,
                    data: {
                        data: [
                            { id: 'spending-789', name: 'spending-789' },
                            { id: 'spending-123', name: 'spending-123' },
                            { id: 'spending-456', name: 'spending-456' },
                        ],
                        hasNextPage: false,
                    },
                },
            },
        },
        {
            name: 'test case 10',
            prev: {
                spending: {
                    loading: true,
                    data: {
                        data: [
                            { id: 'spending-123', name: 'spending-123' },
                            { id: 'spending-456', name: 'spending-456' },
                        ],
                        hasNextPage: true,
                    },
                    query: 'spending-query with &userId',
                    params: { userId: 'userId-123' },
                    tags: TAGS.SHORT,
                },
            },
            data: {
                spending: {
                    data: [{ id: 'spending-789', name: 'spending-789' }],
                    hasNextPage: true,
                },
            },
            query: { spending: 'spending-query with &userId' },
            params: { userId: 'userId-123' },
            tags: { spending: TAGS.SHORT },
            keys: ['spending'],
            isRevert: true,
            expected: {
                spending: {
                    loading: false,
                    query: 'spending-query with &userId',
                    params: { userId: 'userId-123' },
                    tags: TAGS.SHORT,
                    data: {
                        data: [
                            { id: 'spending-789', name: 'spending-789' },
                            { id: 'spending-123', name: 'spending-123' },
                            { id: 'spending-456', name: 'spending-456' },
                        ],
                        hasNextPage: true,
                    },
                },
            },
        },
    ]

    testCases.forEach((testCase) => {
        it(testCase.name, () => {
            expect(
                formatTransform(
                    testCase.prev,
                    testCase.data,
                    testCase.query,
                    testCase.params,
                    testCase.tags,
                    testCase.keys as any[],
                    testCase.isRevert
                )
            ).toEqual(testCase.expected)
        })
    })
})

describe('assignLoading', () => {
    const testCases = [
        {
            name: 'test case 1',
            prev: {
                spending: {
                    loading: false,
                    data: undefined,
                    query: 'spending-query with &userId',
                    params: { userId: 'userId-123' },
                    tags: TAGS.SHORT,
                },
            },
            expected: {
                spending: {
                    loading: true,
                    data: undefined,
                    query: 'spending-query with &userId',
                    params: { userId: 'userId-123' },
                },
            },
        },
        {
            name: 'test case 2',
            prev: {
                spending: {
                    loading: false,
                    data: undefined,
                    query: 'spending-query with &kindSpending',
                    params: { userId: 'userId-123' },
                    tags: TAGS.SHORT,
                },
            },
            expected: {
                spending: {
                    loading: true,
                    data: undefined,
                    query: 'spending-query with &kindSpending',
                    params: { userId: 'userId-123' },
                },
            },
        },
    ]

    testCases.forEach((testCase) => {
        it(testCase.name, () => {
            expect(assignLoading(testCase.prev)).toEqual(testCase.expected)
        })
    })
})
