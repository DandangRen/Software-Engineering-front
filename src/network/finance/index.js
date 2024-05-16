import request from "@/network/request"
const testAPI = require("@/apis")

export const createReceivable = config => request._post(testAPI.RECEIVABLE_CREATE, config)
export const getAllReceivable = config => request._get(testAPI.RECEIVABLE_ALL, config);
export const ApprovalReceivable = config => request._get(testAPI.RECEIVABLE_APPROVAL, config);
export const getReceivableBySheetId = config => request._get(testAPI.RECEIVABLE_FIND_SHEET_BY_ID, config);
export const createPayable = config => request._post(testAPI.PAYABLE_CREATE, config)
export const getAllPayable = config => request._get(testAPI.PAYABLE_ALL, config);
export const ApprovalPayable = config => request._get(testAPI.PAYABLE_APPROVAL, config);
export const getPayableBySheetId = config => request._get(testAPI.PAYABLE_FIND_SHEET_BY_ID, config);
export const getSalesDetails = config => request._get(testAPI.SALES_DETAILS,config);
export const getBusinessCalendar = config => request._get(testAPI.BUSINESS_CALENDAR,config);
export const getBusinessOperation = config => request._get(testAPI.BUSINESS_OPERATION,config);
export const tableExportExcel = config=>request._get(testAPI.TABLE_EXPORT_EXCEL,config);