import request from "@/network/request"
const testAPI = require("@/apis")

export const addStaff = config => request._post(testAPI.STAFF_ADD, config);
export const deleteStaff = config => request._get(testAPI.STAFF_DELETE, config);
export const updateStaff = config => request._post(testAPI.STAFF_UPDATE, config);
export const getAll = config => request._get(testAPI.STAFF_GET_ALL, config);
export const addStaffClock = config => request._post(testAPI.STAFF_CLOCK_ADD, config)
export const cleanStaffClock = config => request._post(testAPI.STAFF_CLOCK_CLEAN, config)
export const StaffClockIn = config => request._post(testAPI.STAFF_CLOCK_IN, config)
export const Clock_getAll = config => request._get(testAPI.STAFF_CLOCK_GET_ALL, config)
export const deleteClock = config => request._get(testAPI.CLOCK_DELETE, config);
export const createSalary = config => request._post(testAPI.SALARY_CREATE, config);
export const firstApproval = config => request._get(testAPI.SALARY_FIRST_APPROVAL, config);
export const secondApproval = config => request._get(testAPI.SALARY_SECOND_APPROVAL, config);
export const getAllSalary = config => request._get(testAPI.SALARY_FIND_SHEET_BY_STATE, config);
export const deleteSalary = config => request._get(testAPI.SALARY_DELETE, config);
export const updateSalary = config => request._post(testAPI.SALARY_UPDATE, config);

