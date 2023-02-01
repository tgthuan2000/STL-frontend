import LANGUAGE, { LANGUAGE_TRANSLATION } from './key'

const translation: LANGUAGE_TRANSLATION = {
    translation: {
        /* COMMON */
        [LANGUAGE.LOGOUT]: 'Logout',
        [LANGUAGE.LOGIN]: 'Login',
        [LANGUAGE.HOME]: 'Home',
        [LANGUAGE.TRANSACTION]: 'Transaction',
        [LANGUAGE.METHOD]: 'Method',
        [LANGUAGE.CATEGORY]: 'Category',
        [LANGUAGE.CATEGORY_NAME]: 'Category name',
        [LANGUAGE.DATE]: 'Date',
        [LANGUAGE.NOTE]: 'Note',
        [LANGUAGE.SAVE]: 'Save',
        [LANGUAGE.CREATE]: 'Create',
        [LANGUAGE.CANCEL]: 'Cancel',
        [LANGUAGE.CREATING]: 'Creating',
        [LANGUAGE.RECEIVE]: 'Receive',
        [LANGUAGE.COST]: 'Cost',
        [LANGUAGE.TRANSFER]: 'Transfer',
        [LANGUAGE.SURPLUS]: 'Surplus',
        [LANGUAGE.MONTH]: 'Month',
        [LANGUAGE.LIMIT_AMOUNT]: 'Limit amount',

        /* VALIDATE MESSAGE */
        [LANGUAGE.REQUIRED_RECEIVE]: 'Required receive',
        [LANGUAGE.REQUIRED_COST]: 'Required cost',
        [LANGUAGE.REQUIRED_TRANSFER_AMOUNT]: 'Required transfer',
        [LANGUAGE.REQUIRED_KIND]: 'Required kind',
        [LANGUAGE.REQUIRED_CATEGORY]: 'Required category',
        [LANGUAGE.REQUIRED_CATEGORY_NAME]: 'Required category name',
        [LANGUAGE.REQUIRED_METHOD]: 'Required method',
        [LANGUAGE.REQUIRED_DATE]: 'Required date',
        [LANGUAGE.RECEIVE_MIN_ZERO]: 'Receive must be greater than zero',
        [LANGUAGE.TRANSFER_MIN_ZERO]: 'Transfer must be greater than zero',
        [LANGUAGE.COST_MIN_ZERO]: 'Cost must be greater than zero',
        [LANGUAGE.CATEGORY_NAME_MAX_50]: 'Category name must be less than 50 characters',

        /* PLACEHOLDER */
        [LANGUAGE.PLACEHOLDER_CHOOSE_KIND]: 'Choose kind',

        /* NOTIFY/TOAST */
        [LANGUAGE.NOTIFY_CREATE_RECEIVE_SUCCESS]: 'Receive success',
        [LANGUAGE.NOTIFY_CREATE_TRANSFER_SUCCESS]: 'Transfer success',
        [LANGUAGE.NOTIFY_CREATE_COST_SUCCESS]: 'Cost success',
        [LANGUAGE.NOTIFY_CREATE_CATEGORY_SUCCESS]: 'Create category success',

        /* SPENDING */
        [LANGUAGE.SPENDING]: 'Spending management',
        [LANGUAGE.BUDGET_BY_CATEGORY]: 'Budget by category',
        [LANGUAGE.BUDGET_BY_METHOD]: 'Budget by method',
        [LANGUAGE.TRANSACTION_RECENT]: 'Recent transaction',
        [LANGUAGE.METHOD_SPENDING]: 'Spending method',
        [LANGUAGE.MAKE_INCOME]: 'Make income',
        [LANGUAGE.MAKE_COST]: 'Make cost',
        [LANGUAGE.MAKE_TRANSFER]: 'Make transfer',
        [LANGUAGE.MAKE_BUDGET]: 'Make budget',
        [LANGUAGE.CREATE_METHOD]: 'Create new method',
        [LANGUAGE.CREATE_CATEGORY]: 'Create new category',
        [LANGUAGE.FROM_TRANSFER_METHOD]: 'From transfer method',
        [LANGUAGE.TO_TRANSFER_METHOD]: 'To transfer method',
        [LANGUAGE.CHOOSE_PREVIOUS_MONTH]: 'Choose by previous month',

        /* LOAN */
        [LANGUAGE.MAKE_GET_LOAN]: 'Make get loan',
        [LANGUAGE.MAKE_LOAN]: 'Make loan',
        [LANGUAGE.MAKE_LOAN_GET_LOAN]: 'Make loan/get loan',
        [LANGUAGE.CREATE_MEMBER]: 'Create new member',

        /* OTHERS */
        [LANGUAGE.SOME_CATEGORY_SIMILAR_NAME]: 'Some category have similar name',
        [LANGUAGE.NOT_CATEGORY_SIMILAR_NAME]: 'Not category have similar name',
    },
}

export default { translation }
