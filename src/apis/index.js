//TEST
const TEST_GET = "/api/test/get";
const TEST_POST = "/api/test/post";

const AUTH = "/api/user/auth"
const LOGIN = "/api/user/login"
const REGISTER = '/api/user/register'

// 商品分类管理
const COMMODITY_CLASSIFICATION_ALL = '/api/category/queryAll'
const COMMODITY_CLASSIFICATION_CREATE = '/api/category/create'
const COMMODITY_CLASSIFICATION_UPDATE = '/api/category/update'
const COMMODITY_CLASSIFICATION_DELETE = '/api/category/delete'

// 商品管理
const COMMODITY_ALL = '/api/product/queryAll';
const COMMODITY_CREATE = '/api/product/create';
const COMMODITY_UPDATE = '/api/product/update';
const COMMODITY_DELETE = '/api/product/delete';


const WAREHOUSE_INPUT = '/api/warehouse/input';
const WAREHOUSE_OUTPUT_PRE = '/api/warehouse/product/count';
const WAREHOUSE_OUTPUT = '/api/warehouse/output';
const WAREHOUSE_GET_INPUTSHEET = '/api/warehouse/inputSheet/state';
const WAREHOUSE_GET_OUTPUTSHEET = '/api/warehouse/outputSheet/state';
const WAREHOUSE_IO_DEATIL_BY_TIME = '/api/warehouse/sheetContent/time';
const WAREHOUSE_IPQ_BY_TIME = '/api/warehouse/inputSheet/time/quantity';
const WAREHOUSE_OPQ_BY_TIME = '/api/warehouse/outputSheet/time/quantity';
const WAREHOUSE_OUTPUTSHEET_APPROVE = '/api/warehouse/outputSheet/approve';
const WAREHOUSE_INPUTSHEET_APPROVE = '/api/warehouse/inputSheet/approve';
const WAREHOUSE_DAILY_COUNT = '/api/warehouse/warehouse/counting';


// 销售管理
// 进货管理
const PURCHASE_ALL = '/api/purchase/sheet-show';
const PURCHASE_FIND_SHEET_BY_ID = '/api/purchase/find-sheet';
const PURCHASE_CREATE = '/api/purchase/sheet-make';
const PURCHASE_FIRST_APPROVAL = '/api/purchase/first-approval';
const PURCHASE_SECOND_APPROVAL = '/api/purchase/second-approval';
// 进货退货管理
const PURCHASE_RETURN_ALL = '/api/purchase-returns/sheet-show';
const PURCHASE_RETURN_CREATE = '/api/purchase-returns/sheet-make';
const PURCHASE_RETURN_FIRST_APPROVAL = '/api/purchase-returns/first-approval';
const PURCHASE_RETURN_SECOND_APPROVAL = '/api/purchase-returns/second-approval';
// 销售管理
const SALE_ALL = '/api/sale/sheet-show';
const SALE_CREATE = '/api/sale/sheet-make';
const SALE_FIRST_APPROVAL = '/api/sale/first-approval';
const SALE_SECOND_APPROVAL = '/api/sale/second-approval';
const SALE_FIND_SHEET_BY_ID = '/api/sale/find-sheet';
//销售退货管理
const SALE_RETURN_ALL = '/api/sale-returns/sheet-show';
const SALE_RETURN_CREATE = '/api/sale-returns/sheet-make';
const SALE_RETURN_FIRST_APPROVAL = '/api/sale-returns/first-approval';
const SALE_RETURN_SECOND_APPROVAL = '/api/sale-returns/second-approval';
// 客户管理
const CUSTOMER_QUERY = '/api/customer/findByType';
const CUSTOMER_UPDATE = '/api/customer/updateCustomer';


const SALES_DETAILS='/api/finance/getSalesDetails';
const BUSINESS_CALENDAR='/api/finance/getBill';
const BUSINESS_OPERATION='/api/finance/getBusinessOperation'

const CUSTOMER_DELETE = '/api/customer/deleteCustomer';
const CUSTOMER_CREATE = '/api/customer/createCustomer'
const SALE_PURCHASE_ALL = '/api/purchase/sheet-show';
const SALE_PURCHASE_CREATE = '/api/purchase/sheet-make';
const SALE_CUSTOMER_QUERY = '/api/customer/findByType';
const SALE_CUSTOMER_MAX = '/api/sale/maxAmountCustomer';
//财务管理
const RECEIVABLE_CREATE = '/api/finance/receivable/sheet-make'
const RECEIVABLE_ALL = '/api/finance/receivable/sheet-show'
const RECEIVABLE_APPROVAL = '/api/finance/receivable/approval'
const RECEIVABLE_FIND_SHEET_BY_ID = '/api/finance/receivable/find-sheet'
const PAYABLE_CREATE = '/api/finance/payable/sheet-make'
const PAYABLE_ALL = '/api/finance/payable/sheet-show'
const PAYABLE_APPROVAL = '/api/finance/payable/approval'
const PAYABLE_FIND_SHEET_BY_ID = '/api/finance/payable/find-sheet'
//账户管理
const BANK_ACCOUNT_CREATE = '/api/account/addAccount'
const BANK_ACCOUNT_DELETE = '/api/account/deleteAccount'
const BANK_ACCOUNT_UPDATE = '/api/account/updateAccount'
const BANK_ACCOUNT_GET = '/api/account/getAccount'
const BANK_ACCOUNT_GET_ALL = '/api/account/getAll'
const BANK_ACCOUNT_GET_ALMOST_BY_NUMBER = '/api/account/getAlmostByNumber'
const BANK_ACCOUNT_GET_ALMOST_BY_NAME = '/api/account/getAlmostByName'
//员工管理
const STAFF_ADD = '/api/staffManage/addStaff'
const STAFF_DELETE = '/api/staffManage/deleteStaff'
const STAFF_UPDATE = '/api/staffManage/updateStaff'
const STAFF_GET_ALL = '/api/staffManage/getAll'
const STAFF_CLOCK_ADD = '/api/staffClock/addClockIn'
const STAFF_CLOCK_CLEAN = '/api/staffClock/monthlyClean'
const STAFF_CLOCK_IN = '/api/staffClock/clockIn'
const STAFF_CLOCK_GET_ALL = '/api/staffClock/getAllClockIn'
const CLOCK_DELETE = '/api/staffClock/deleteClockIn'
const SALARY_ALL = '/api/salarySheet/getAll';
const SALARY_CREATE = '/api/salarySheet/addSalarySheet';
const SALARY_FIRST_APPROVAL = '/api/salarySheet/first-approval';
const SALARY_SECOND_APPROVAL = '/api/salarySheet/second-approval';
const SALARY_FIND_SHEET_BY_STATE = '/api/salarySheet/sheet-show';
const SALARY_DELETE = '/api/salarySheet/deleteSalarySheet'
const SALARY_UPDATE = '/api/salarySheet/updateSalary'

//总经理制定促销策略
const PROMOTION_CREATE = '/api/promotion/sheet-make'
const PROMOTION_SHOW = '/api/promotion/sheet-show'



//导出excel
const EXPORT_EXCEL = '/api/warehouse/warehouse/export';
const TABLE_EXPORT_EXCEL = '/api/finance/exportExcelPaper';


module.exports = {
  TEST_GET,
  TEST_POST,

  AUTH,
  LOGIN,
  REGISTER,
  COMMODITY_CLASSIFICATION_ALL,
  COMMODITY_CLASSIFICATION_CREATE,
  COMMODITY_CLASSIFICATION_UPDATE,
  COMMODITY_CLASSIFICATION_DELETE,

  COMMODITY_ALL,
  COMMODITY_CREATE,
  COMMODITY_UPDATE,
  COMMODITY_DELETE,

  WAREHOUSE_INPUT,
  WAREHOUSE_OUTPUT_PRE,
  WAREHOUSE_OUTPUT,
  WAREHOUSE_GET_INPUTSHEET,
  WAREHOUSE_GET_OUTPUTSHEET,
  WAREHOUSE_IO_DEATIL_BY_TIME,
  WAREHOUSE_IPQ_BY_TIME,
  WAREHOUSE_OPQ_BY_TIME,
  WAREHOUSE_OUTPUTSHEET_APPROVE,
  WAREHOUSE_INPUTSHEET_APPROVE,
  WAREHOUSE_DAILY_COUNT,

  PURCHASE_ALL,
  PURCHASE_CREATE,
  PURCHASE_FIRST_APPROVAL,
  PURCHASE_SECOND_APPROVAL,
  PURCHASE_RETURN_ALL,
  PURCHASE_RETURN_CREATE,
  PURCHASE_RETURN_FIRST_APPROVAL,
  PURCHASE_RETURN_SECOND_APPROVAL,
  PURCHASE_FIND_SHEET_BY_ID,
//销售退货管理
  SALE_ALL,
  SALE_CREATE,
  SALE_FIRST_APPROVAL,
  SALE_SECOND_APPROVAL,
  SALE_RETURN_ALL,
  SALE_RETURN_CREATE,
  SALE_RETURN_FIRST_APPROVAL,
  SALE_RETURN_SECOND_APPROVAL,
  SALE_CUSTOMER_QUERY,
  SALE_CUSTOMER_MAX,
  SALE_FIND_SHEET_BY_ID,
  CUSTOMER_QUERY,

//导出excel
  EXPORT_EXCEL,
  CUSTOMER_DELETE,
  CUSTOMER_UPDATE,
  CUSTOMER_CREATE,
//财务管理
  RECEIVABLE_CREATE,
  RECEIVABLE_ALL,
  RECEIVABLE_APPROVAL,
  RECEIVABLE_FIND_SHEET_BY_ID,
  PAYABLE_CREATE,
  PAYABLE_ALL,
  PAYABLE_APPROVAL,
  PAYABLE_FIND_SHEET_BY_ID,

//促销策略
  PROMOTION_CREATE,
  PROMOTION_SHOW,

  BANK_ACCOUNT_CREATE,
  BANK_ACCOUNT_DELETE,
  BANK_ACCOUNT_UPDATE,
  BANK_ACCOUNT_GET,
  BANK_ACCOUNT_GET_ALL,
  BANK_ACCOUNT_GET_ALMOST_BY_NUMBER,
  BANK_ACCOUNT_GET_ALMOST_BY_NAME,
  SALES_DETAILS,
  BUSINESS_CALENDAR,
  BUSINESS_OPERATION,
  TABLE_EXPORT_EXCEL,

  //员工管理
  STAFF_ADD,
  STAFF_DELETE,
  STAFF_UPDATE,
  STAFF_GET_ALL,
  STAFF_CLOCK_ADD,
  STAFF_CLOCK_CLEAN,
  STAFF_CLOCK_IN,
  STAFF_CLOCK_GET_ALL,
  CLOCK_DELETE,
  SALARY_ALL,
  SALARY_CREATE,
  SALARY_FIRST_APPROVAL,
  SALARY_SECOND_APPROVAL,
  SALARY_FIND_SHEET_BY_STATE,
  SALARY_DELETE,
  SALARY_UPDATE
};
