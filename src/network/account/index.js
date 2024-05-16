import request from "@/network/request"
const testAPI = require("@/apis")

export const addAccount = config => request._post(testAPI.BANK_ACCOUNT_CREATE, config)
export const deleteAccount = config => request._get(testAPI.BANK_ACCOUNT_DELETE, config);
export const updateAccount = config => request._post(testAPI.BANK_ACCOUNT_UPDATE, config);
export const getAccount = config => request._get(testAPI.BANK_ACCOUNT_GET, config);
export const getAll = config => request._get(testAPI.BANK_ACCOUNT_GET_ALL, config);
export const getByNumber = config => request._get(testAPI.BANK_ACCOUNT_GET_ALMOST_BY_NUMBER, config);
export const getByName = config => request._get(testAPI.BANK_ACCOUNT_GET_ALMOST_BY_NAME, config);