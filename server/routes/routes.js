const express = require('express')
const router = express.Router()


//imports
const signUpController = require('../controller/user/signUp')
const loginController = require('../controller/user/login')

const authToken = require('../middleware/authToken')
const newExpenseController = require('../controller/expense/newExpenseController')
const newEarningController = require('../controller/earning/newEarningController')
const updateProfileController = require('../controller/user/updateProfile')
const deleteExpenseController = require('../controller/expense/deleteExpense')
const deleteEarningController = require('../controller/earning/deleteEarning')
const fetchEarningsController = require('../controller/earning/fetchEarnings')
const editEarningController = require('../controller/earning/editEarning')
const uploadMergedEarningsController = require('../controller/earning/uploadMergedEarnings')
const fetchExpensesController = require('../controller/expense/fetchExpenses')
const editExpenseController = require('../controller/expense/editExpense')
const uploadMergedExpensesController = require('../controller/expense/uploadMergedExpenses')
const deleteAccountController = require('../controller/user/deleteAccount')
const sendMessageController = require('../controller/support/sendMessage')
const logoutController = require('../controller/user/logout')
const forgotPasswordController = require('../controller/user/forgotPassword')
const resetPasswordController = require('../controller/user/resetPassword')




//routes
router.post('/signup', signUpController)
router.post('/login', loginController)
router.post('/support', authToken, sendMessageController)
router.post('/forgot-password', forgotPasswordController)
router.post('/reset-password/:token', resetPasswordController)

router.post('/new-expense', authToken, newExpenseController)
router.post('/new-earning', authToken, newEarningController)

router.post('/upload-merged-earnings', authToken, uploadMergedEarningsController)
router.post('/upload-merged-expenses', authToken, uploadMergedExpensesController)

router.put('/edit-profile', authToken, updateProfileController)
router.put('/edit-earning', authToken, editEarningController)
router.put('/edit-expense', authToken, editExpenseController)

router.delete('/delete-expense', authToken, deleteExpenseController)
router.delete('/delete-earning', authToken, deleteEarningController)
router.delete('/delete-user', authToken, deleteAccountController)

router.get('/fetch-earnings', authToken, fetchEarningsController)
router.get('/fetch-expenses', authToken, fetchExpensesController)
router.get('/logout', authToken, logoutController)

module.exports = router