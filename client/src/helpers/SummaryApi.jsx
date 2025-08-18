const backendDomain="http://localhost:8080"
// const backendDomain="https://wealth-way-eight.vercel.app"

const SummaryApi = {
    signUp:{
        url: `${backendDomain}/api/signup`,
        method: "POST"
    },
    login:{
        url: `${backendDomain}/api/login`,
        method: "POST"
    },
    forgotPassword:{
        url: `${backendDomain}/api/forgot-password`,
        method: "POST"
    },
    resetPassword:{
        url: `${backendDomain}/api/reset-password`,
        method: "POST"
    },
    logout:{
        url: `${backendDomain}/api/logout`,
        method: "GET"
    },
    newExpense:{
        url: `${backendDomain}/api/new-expense`,
        method: "POST"
    },
    newEarning:{
        url: `${backendDomain}/api/new-earning`,
        method: "POST"
    },
    updateProfile:{
        url: `${backendDomain}/api/edit-profile`,
        method: "PUT"
    },
    deleteExpense:{
        url: `${backendDomain}/api/delete-expense`,
        method: "DELETE"
    },
    deleteEarning:{
        url: `${backendDomain}/api/delete-earning`,
        method: "DELETE"
    },
    fetchEarnings:{
        url: `${backendDomain}/api/fetch-earnings`,
        method: "GET"
    },
    fetchExpenses:{
        url: `${backendDomain}/api/fetch-expenses`,
        method: "GET"
    },
    editEarning:{
        url: `${backendDomain}/api/edit-earning`,
        method: "PUT"
    },
    editExpense:{
        url: `${backendDomain}/api/edit-expense`,
        method: "PUT"
    },
    uploadMergedEarnings:{
        url: `${backendDomain}/api/upload-merged-earnings`,
        method: "POST"
    },
    uploadMergedExpenses:{
        url: `${backendDomain}/api/upload-merged-expenses`,
        method: "POST"
    },
    deleteUser: {
        url: `${backendDomain}/api/delete-user`,
        method: "DELETE"
    },
    getSupport:{
        url: `${backendDomain}/api/support`,
        method: "POST"
    },
}

export default SummaryApi