import request from "@/network/request"
const testAPI = require("@/apis")

export const createPromotion = config => request._post(testAPI.PROMOTION_CREATE,config);
export const getAllPromotion = config => request._get(testAPI.PROMOTION_SHOW,config);
