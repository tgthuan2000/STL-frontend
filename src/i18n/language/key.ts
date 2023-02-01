enum LANGUAGE {
    /* COMMON */
    LOGOUT = 'logout',
    LOGIN = 'login',
    HOME = 'home',
    TRANSACTION = 'transaction',
    METHOD = 'method',
    CATEGORY = 'category',
    CATEGORY_NAME = 'category-name',
    DATE = 'date',
    NOTE = 'note',
    SAVE = 'save',
    CREATE = 'create',
    CANCEL = 'cancel',
    CREATING = 'creating',
    RECEIVE = 'receive',
    COST = 'cost',
    TRANSFER = 'transfer',
    SURPLUS = 'surplus',
    MONTH = 'month',
    LIMIT_AMOUNT = 'limit-amount',

    /* VALIDATE MESSAGE */
    REQUIRED_RECEIVE = 'required-receive',
    REQUIRED_COST = 'required-cost',
    REQUIRED_TRANSFER_AMOUNT = 'required-transfer-amount',
    REQUIRED_KIND = 'required-kind',
    REQUIRED_CATEGORY = 'required-category',
    REQUIRED_CATEGORY_NAME = 'required-category-name',
    REQUIRED_METHOD = 'required-method',
    REQUIRED_DATE = 'required-date',
    RECEIVE_MIN_ZERO = 'receive-min-zero',
    TRANSFER_MIN_ZERO = 'transfer-min-zero',
    COST_MIN_ZERO = 'cost-min-zero',
    CATEGORY_NAME_MAX_50 = 'category-name-max-50',

    /* PLACEHOLDER */
    PLACEHOLDER_CHOOSE_KIND = 'placeholder-choose-kind',

    /* NOTIFY/TOAST */
    NOTIFY_CREATE_RECEIVE_SUCCESS = 'notify-create-receive-success',
    NOTIFY_CREATE_TRANSFER_SUCCESS = 'notify-create-transfer-success',
    NOTIFY_CREATE_COST_SUCCESS = 'notify-create-cost-success',
    NOTIFY_CREATE_CATEGORY_SUCCESS = 'notify-create-category-success',

    /* SPENDING */
    SPENDING = 'spending',
    BUDGET_BY_CATEGORY = 'budget-by-category',
    BUDGET_BY_METHOD = 'budget-by-method',
    TRANSACTION_RECENT = 'transaction-recent',
    METHOD_SPENDING = 'method-spending',
    MAKE_INCOME = 'make-income',
    MAKE_COST = 'make-cost',
    MAKE_TRANSFER = 'make-transfer',
    MAKE_BUDGET = 'make-budget',
    CREATE_METHOD = 'create-method',
    CREATE_CATEGORY = 'create-category',
    FROM_TRANSFER_METHOD = 'from-transfer-method',
    TO_TRANSFER_METHOD = 'to-transfer-method',
    CHOOSE_PREVIOUS_MONTH = 'choose-previous-month',

    /* LOAN */
    MAKE_GET_LOAN = 'make-get-loan',
    MAKE_LOAN = 'make-loan',
    MAKE_LOAN_GET_LOAN = 'make-loan-get-loan',
    CREATE_MEMBER = 'create-member',

    /* OTHERS */
    SOME_CATEGORY_SIMILAR_NAME = 'some-category-similar-name',
    NOT_CATEGORY_SIMILAR_NAME = 'not-category-similar-name',
}

export default LANGUAGE

export interface LANGUAGE_TRANSLATION {
    translation: { [key in LANGUAGE]: string }
}
