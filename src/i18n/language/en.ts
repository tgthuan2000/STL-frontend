import LANGUAGE from './key'

const translation: {
    [key in LANGUAGE]: string
} = {
    /* COMMON */
    [LANGUAGE.LOGOUT]: 'Logout',
    [LANGUAGE.BACK]: 'Back',
    [LANGUAGE.LOGIN]: 'Login',
    [LANGUAGE.HOME]: 'Home',
    [LANGUAGE.TRANSACTION]: 'Transaction',
    [LANGUAGE.TRANSACTION_DETAIL]: 'Transaction detail',
    [LANGUAGE.TRANSACTION_KIND]: 'Transaction kind',
    [LANGUAGE.METHOD]: 'Method',
    [LANGUAGE.METHOD_NAME]: 'Method name',
    [LANGUAGE.CATEGORY]: 'Category',
    [LANGUAGE.CATEGORY_NAME]: 'Category name',
    [LANGUAGE.DATE]: 'Date',
    [LANGUAGE.DAY]: 'Day',
    [LANGUAGE.L_DAYS]: 'day(s)',
    [LANGUAGE.L_MAXIMUM]: 'maximum',
    [LANGUAGE.YEAR]: 'Year',
    [LANGUAGE.NOTE]: 'Note',
    [LANGUAGE.SAVE]: 'Save',
    [LANGUAGE.NEXT]: 'Next',
    [LANGUAGE.CREATE]: 'Create',
    [LANGUAGE.CANCEL]: 'Cancel',
    [LANGUAGE.CREATING]: 'Creating',
    [LANGUAGE.CREATION_TIME]: 'Creation time',
    [LANGUAGE.RECEIVE]: 'Receive',
    [LANGUAGE.COST]: 'Cost',
    [LANGUAGE.TRANSFER]: 'Transfer',
    [LANGUAGE.SURPLUS]: 'Surplus',
    [LANGUAGE.MONTH]: 'Month',
    [LANGUAGE.LIMIT_AMOUNT]: 'Limit amount',
    [LANGUAGE.STATUS]: 'Status',
    [LANGUAGE.AMOUNT]: 'Amount',
    [LANGUAGE.UPDATE]: 'Update',
    [LANGUAGE.FILTER]: 'Filter',
    [LANGUAGE.ADVANCE]: 'Advance',
    [LANGUAGE.DATE_RANGE]: 'Date range',
    [LANGUAGE.BY_DAY]: 'By day',
    [LANGUAGE.BY_MONTH]: 'By month',
    [LANGUAGE.BY_YEAR]: 'By year',
    [LANGUAGE.THIS_WEEK]: 'This week',
    [LANGUAGE.LAST_WEEK]: 'Last week',
    [LANGUAGE.BUDGET]: 'Budget',
    [LANGUAGE.EMPTY_DATA]: 'Empty data',
    [LANGUAGE.REMAINING]: 'Remaining',
    [LANGUAGE.TODAY]: 'Today',
    [LANGUAGE.OUT_OF_DATE]: 'Out of date',
    [LANGUAGE.UNLIMITED_TIME]: 'Unlimited time',
    [LANGUAGE.FULL_NAME]: 'Full name',
    [LANGUAGE.LOADING]: 'Loading...',
    [LANGUAGE.LOADING_IMAGE]: 'Loading image...',
    [LANGUAGE.UPLOAD_IMAGE]: 'Upload image',
    [LANGUAGE.SEE_MORE]: 'See more',
    [LANGUAGE.CREATE_DATE]: 'Create date',
    [LANGUAGE.EMPTY_METHOD]: 'Empty method',
    [LANGUAGE.NOT_ROLE]: 'Not role',
    [LANGUAGE.BACK_TO_HOME]: 'Back to home',
    [LANGUAGE.CONTENT]: 'Content',
    [LANGUAGE.VIEWERS]: 'Viewers',
    [LANGUAGE.READ]: 'Read',
    [LANGUAGE.TITLE]: 'Title',
    [LANGUAGE.SHORT_DESCRIPTION]: 'Short description',
    [LANGUAGE.NEW_NOTIFY]: 'New notify',
    [LANGUAGE.ERROR]: 'Something went wrong',
    [LANGUAGE.COMING_SOON]: 'Coming soon',
    [LANGUAGE.SURPLUS_AT_TIME]: 'Surplus at time',
    [LANGUAGE.TABLE]: 'Table',
    [LANGUAGE.LIST]: 'List',
    [LANGUAGE.REFRESH]: 'Refresh',
    [LANGUAGE.L_DAYS_AGO]: 'days ago',
    [LANGUAGE.L_HOURS_AGO]: 'hours ago',
    [LANGUAGE.L_MINUTES_AGO]: 'minutes ago',
    [LANGUAGE.RECENT]: 'Recent',
    [LANGUAGE.EDIT]: 'Edit',
    [LANGUAGE.EDITED]: 'Edited',
    [LANGUAGE.DELETE]: 'Delete',
    [LANGUAGE.REPLY]: 'Reply',
    [LANGUAGE.L_REPLIES]: 'replies',
    [LANGUAGE.CLICK_TO_READ_DETAIL]: 'Click to read detail',
    [LANGUAGE.CLICK_TO_CHOOSE_METHOD]: 'Click to choose method',
    [LANGUAGE.OBJECT]: 'Object',
    [LANGUAGE.RECENT_UPDATE]: 'Recent update',
    [LANGUAGE.PAID_TIME]: 'Paid time',
    [LANGUAGE.TYPE_YOUR_MESSAGE]: 'Type your message',
    [LANGUAGE.PASSWORD]: 'Password',
    [LANGUAGE.OTHERS]: 'Others',
    [LANGUAGE.HIDDEN]: 'Hidden',
    [LANGUAGE.SHOW]: 'Show',
    [LANGUAGE.NAME]: 'Name',
    [LANGUAGE.SAVING]: 'Saving',
    [LANGUAGE.SEARCH]: 'Search',
    [LANGUAGE.SEND_NOTIFY]: 'Send notify',
    [LANGUAGE.DROP_IMAGE_HERE]: 'Drop image here',

    /* PWA */
    [LANGUAGE.APP_READY_WORK_OFFLINE]: 'App ready to work offline',
    [LANGUAGE.RELOAD_TEXT]: 'New content available, click on reload button to update.',
    [LANGUAGE.RELOAD]: 'Reload',
    [LANGUAGE.CLOSE]: 'Close',

    /* EMPTY DATA */
    [LANGUAGE.EMPTY_NOTIFY]: 'Empty notify',
    [LANGUAGE.EMPTY_DESCRIPTION]: 'Empty description',

    /* VALIDATE MESSAGE */
    [LANGUAGE.REQUIRED_FIELD]: 'Required field',
    [LANGUAGE.REQUIRED_NUMBER]: 'Required number',
    [LANGUAGE.REQUIRED_METHOD_SPENDING]: 'Required method',
    [LANGUAGE.REQUIRED_TYPE_NUMBER]: 'Required type number',
    [LANGUAGE.REQUIRED_AMOUNT]: 'Required amount',
    [LANGUAGE.REQUIRED_RECEIVE]: 'Required receive',
    [LANGUAGE.REQUIRED_COST]: 'Required cost',
    [LANGUAGE.REQUIRED_TRANSFER_AMOUNT]: 'Required transfer',
    [LANGUAGE.REQUIRED_KIND]: 'Required kind',
    [LANGUAGE.REQUIRED_CATEGORY]: 'Required category',
    [LANGUAGE.REQUIRED_CATEGORY_NAME]: 'Required category name',
    [LANGUAGE.REQUIRED_METHOD]: 'Required method',
    [LANGUAGE.REQUIRED_METHOD_NAME]: 'Required method name',
    [LANGUAGE.REQUIRED_DATE]: 'Required date',
    [LANGUAGE.REQUIRED_USER_GET_LOAN]: 'Required user get loan',
    [LANGUAGE.REQUIRED_OLD_PASSWORD]: 'Required old password',
    [LANGUAGE.REQUIRED_NEW_PASSWORD]: 'Required new password',
    [LANGUAGE.REQUIRED_RE_PASSWORD]: 'Required re-password',
    [LANGUAGE.REQUIRED_FULL_NAME]: 'Required full name',
    [LANGUAGE.REQUIRED_NOTIFY_CONTENT]: 'Required notify content',
    [LANGUAGE.REQUIRED_NOTIFY_TITLE]: 'Required notify title',
    [LANGUAGE.RECEIVER_MIN_1]: 'Receiver must be greater than 1 characters',
    [LANGUAGE.AMOUNT_MIN_ZERO]: 'Amount must be greater than zero',
    [LANGUAGE.RECEIVE_MIN_ZERO]: 'Receive must be greater than zero',
    [LANGUAGE.TRANSFER_MIN_ZERO]: 'Transfer must be greater than zero',
    [LANGUAGE.SURPLUS_MIN_ZERO]: 'Surplus must be greater than zero',
    [LANGUAGE.COST_MIN_ZERO]: 'Cost must be greater than zero',
    [LANGUAGE.CATEGORY_NAME_MAX_50]: 'Category name must be less than 50 characters',
    [LANGUAGE.METHOD_NAME_MAX_50]: 'Method name must be less than 50 characters',
    [LANGUAGE.NEW_PASSWORD_MIN_1]: 'New password must be greater than 1 characters',
    [LANGUAGE.PASSWORD_NOT_MATCH]: 'Password not match',
    [LANGUAGE.REAL_MONEY_MUST_BE_LESS_THAN_AMOUNT]: 'Real money must be less than amount',
    [LANGUAGE.INVALID_FORMAT]: 'Invalid format',

    /* PLACEHOLDER */
    [LANGUAGE.PLACEHOLDER_CHOOSE_KIND]: 'Choose kind',
    [LANGUAGE.PLACEHOLDER_CHOOSE_TIME]: 'Choose time',
    [LANGUAGE.PLACEHOLDER_ENTER_CONTENT]: 'Enter content',
    [LANGUAGE.PLACEHOLDER_SHORT_DESCRIPTION]: 'Short description',

    /* NOTIFY/TOAST */
    [LANGUAGE.NOTIFY_UPDATE_SUCCESS]: 'Update success',
    [LANGUAGE.NOTIFY_UPDATE_FAILED]: 'Update failed',
    [LANGUAGE.NOTIFY_CREATE_RECEIVE_SUCCESS]: 'Receive success',
    [LANGUAGE.NOTIFY_CREATE_TRANSFER_SUCCESS]: 'Transfer success',
    [LANGUAGE.NOTIFY_CREATE_COST_SUCCESS]: 'Cost success',
    [LANGUAGE.NOTIFY_CREATE_METHOD_SUCCESS]: 'Create method success',
    [LANGUAGE.NOTIFY_CREATE_CATEGORY_SUCCESS]: 'Create category success',
    [LANGUAGE.NOTIFY_CREATE_GET_LOAN_SUCCESS]: 'Create get loan success',
    [LANGUAGE.NOTIFY_UPDATE_PASSWORD_SUCCESS]: 'Update password success',
    [LANGUAGE.NOTIFY_CREATE_MEMBER_SUCCESS]: 'Create member success',
    [LANGUAGE.NOTIFY_CREATE_NOTIFY_SUCCESS]: 'Create notify success',
    [LANGUAGE.NOTIFY_NOT_EXIST_ACCOUNT]: 'Not exist account',
    [LANGUAGE.NOTIFY_ERROR]: 'Something went wrong',
    [LANGUAGE.NOTIFY_ACCOUNT_CANT_LOGIN_BY_EMAIL_PASSWORD]: 'Account can not login by email and password',
    [LANGUAGE.NOTIFY_INVALID_PASSWORD]: 'Invalid password',
    [LANGUAGE.NOTIFY_INVALID_OLD_PASSWORD]: 'Invalid old password',
    [LANGUAGE.NOTIFY_NO_CHANGE]: 'No change',
    [LANGUAGE.NOTIFY_REQUIRED_EMAIL]: 'Required email',
    [LANGUAGE.NOTIFY_REQUIRED_ID]: 'Required id',
    [LANGUAGE.NOTIFY_REQUIRED_PASSWORD]: 'Required password',
    [LANGUAGE.NOTIFY_FORBIDDEN]: 'Forbidden',
    [LANGUAGE.NOTIFY_REQUIRED_REFRESH_TOKEN]: 'Required refresh token',
    [LANGUAGE.NOTIFY_EXPIRED_TOKEN]: 'Expired token',
    [LANGUAGE.NOTIFY_REQUIRED_CREDENTIAL]: 'Required credential',
    [LANGUAGE.NOTIFY_REQUIRED_DATA]: 'Required data',
    [LANGUAGE.NOTIFY_REQUIRED_URL]: 'Required url',
    [LANGUAGE.NOTIFY_REQUIRED_SUBSCRIPTION_ID]: 'Required subscription id',

    /* CONFIRM */
    [LANGUAGE.CONFIRM_NOTIFY]: 'Do you want to notify?',
    [LANGUAGE.CONFIRM_DELETE_TRANSACTION]: 'Do you want to delete transaction?',
    [LANGUAGE.CONFIRM_DELETE_MESSAGE]: 'Do you want to delete message?',

    /* SPENDING */
    [LANGUAGE.SPENDING]: 'Spending management',
    [LANGUAGE.BUDGET_BY_CATEGORY]: 'Budget by category',
    [LANGUAGE.BUDGET_BY_METHOD]: 'Budget by method',
    [LANGUAGE.TRANSACTION_RECENT]: 'Recent transaction',
    [LANGUAGE.METHOD_SPENDING]: 'Spending method',
    [LANGUAGE.FROM_METHOD_SPENDING]: 'From method',
    [LANGUAGE.TO_METHOD_SPENDING]: 'To method',
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
    [LANGUAGE.LOAN]: 'Loan',
    [LANGUAGE.GET_LOAN]: 'Get loan',
    [LANGUAGE.MAKE_GET_LOAN]: 'Make get loan',
    [LANGUAGE.MAKE_LOAN]: 'Make loan',
    [LANGUAGE.MAKE_LOAN_GET_LOAN]: 'Make loan/get loan',
    [LANGUAGE.CREATE_MEMBER]: 'Create new member',
    [LANGUAGE.NEAR_DEADLINE]: 'Near deadline',
    [LANGUAGE.METHOD_RECEIVE]: 'Receive method',
    [LANGUAGE.USER_GET_LOAN]: 'User get loan',
    [LANGUAGE.ESTIMATE_PAID_DATE]: 'Estimate paid date',
    [LANGUAGE.ASSET]: 'Asset',
    [LANGUAGE.ADD_ORIGIN_AMOUNT]: 'Add origin',
    [LANGUAGE.TEMP_LOAN]: 'Advance',
    [LANGUAGE.IMAGE_OPTION]: 'Image (optional)',
    [LANGUAGE.PRESS_TO_UPLOAD_IMAGE]: 'Press to upload image',
    [LANGUAGE.ALREADY_PAID]: 'Transaction done, no further editing!',
    [LANGUAGE.PAID_ACTION]: 'Paid',
    [LANGUAGE.PAID]: 'Paid',
    [LANGUAGE.UNPAID]: 'Unpaid',
    [LANGUAGE.REAL_AMOUNT]: 'Real amount',
    [LANGUAGE.AMOUNT_RECEIVE_METHOD]: 'Amount receive method',

    /* PROFILE */
    [LANGUAGE.JOIN_DATE]: 'Join date',
    [LANGUAGE.ALLOW_RECEIVE_NOTIFY_BY_MAIL]: 'Allow receive notify by mail',
    [LANGUAGE.MOST_USED]: 'Most used',
    [LANGUAGE.MOST_USED_RECEIVE]: 'Receive used most',
    [LANGUAGE.MOST_USED_COST]: 'Cost used most',
    [LANGUAGE.MOST_RECEIVE]: 'Receive most',
    [LANGUAGE.MOST_COST]: 'Cost most',
    [LANGUAGE.MOST_RECEIVE_TOTAL]: 'Total receive most',
    [LANGUAGE.MOST_COST_TOTAL]: 'Total cost most',
    [LANGUAGE.MOST_METHOD_AMOUNT]: 'Method amount most',
    [LANGUAGE.MOST_CATEGORY_AMOUNT]: 'Category amount most',

    /* SETTING */
    [LANGUAGE.OLD_PASSWORD_INCORRECT]: 'Old password incorrect',
    [LANGUAGE.OLD_PASSWORD]: 'Old password',
    [LANGUAGE.NEW_PASSWORD]: 'New password',
    [LANGUAGE.RE_PASSWORD]: 'Re-password',

    /* NOTIFICATION */
    [LANGUAGE.LIST_RECEIVE_NOTIFY_MEMBER]: 'List receive notify member',
    [LANGUAGE.SEND_ALL_MEMBER]: 'Send all member',
    [LANGUAGE.SEND_MAIL]: 'Send mail',
    [LANGUAGE.CREATE_NOTIFY]: 'Create notify',
    [LANGUAGE.PROGRESS_CONTENT]: 'Content',
    [LANGUAGE.PROGRESS_TITLE_DESC]: 'Title and description',
    [LANGUAGE.PROGRESS_CHOOSE_MEMBER]: 'Choose member',
    [LANGUAGE.PROGRESS_PREVIEW_AND_SEND]: 'Preview and send',
    [LANGUAGE.SEND_TO_ALL_MEMBER]: 'Send to all member',
    [LANGUAGE.SEND_MAIL_TO_ALL]: 'Send mail to all',
    [LANGUAGE.NOTIFY_RECEIVER_LIST]: 'Notify receiver list',
    [LANGUAGE.SEND_NOTIFY_BY_EMAIL]: 'Send notify by email',

    /* AUTH */
    [LANGUAGE.OR]: 'Or',
    [LANGUAGE.LOGIN_WITH_EMAIL_PASSWORD]: 'Login with email and password',
    [LANGUAGE.UNKNOWN_STEP]: 'Unknown step',
    [LANGUAGE.ACCOUNT_OPTION_EMAIL]: 'Email',
    [LANGUAGE.ACCOUNT_NOT_HAVE_PASSWORD]: 'Account not have password',

    /* OTHERS */
    [LANGUAGE.SOME_SIMILAR_NAME]: 'Some similar name',
    [LANGUAGE.NOT_SIMILAR_NAME]: 'Not similar name',
    [LANGUAGE.INVALID_FORMAT_IMAGE]: 'Invalid format image',
    [LANGUAGE.INVALID_FORMAT_IMAGE_SIZE]: 'Invalid format image size',

    /* LAYOUT */
    [LANGUAGE.SPENDING_MANAGEMENT]: 'Spending management',
    [LANGUAGE.LOAN_MANAGEMENT]: 'Loan/Get loan management',
    [LANGUAGE.TIME_KEEPING_MANAGEMENT]: 'Time keeping management',
    [LANGUAGE.ACCOUNT_MANAGEMENT]: 'Account management',
    [LANGUAGE.NOTIFY_MANAGEMENT]: 'Notify',
    [LANGUAGE.SETTING_MANAGEMENT]: 'Setting',
    [LANGUAGE.PROFILE_MANAGEMENT]: 'Profile',
    [LANGUAGE.DARK_MODE]: 'Dark mode',
    [LANGUAGE.LIGHT_MODE]: 'Light mode',
    [LANGUAGE.SET_PASSWORD]: 'Set password',
    [LANGUAGE.CHANGE_PASSWORD]: 'Change password',
    [LANGUAGE.FEEDBACK]: 'Feedback',
}

export default { translation }
