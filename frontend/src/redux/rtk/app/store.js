import { configureStore } from "@reduxjs/toolkit";
import couponSlice from "../features/Coupon/couponSlice";
import SaleReturnListSlice from "../features/SaleReturnList/SaleReturnListSlice";
import accountReducer from "../features/account/accountSlice";
import adjustInventorySlice from "../features/adjustInventory/adjustInventorySlice";
import authSlice from "../features/auth/authSlice";
import cartReducer from "../features/cart/cartSlice";
import colorReducer from "../features/color/colorSlice";
import customerReducer from "../features/customer/customerSlice";
import customerPaymentReducer from "../features/customerPayment/customerPaymentSlice";
import damageStockSlice from "../features/damageStock/damageStockSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";
import dimensionUnitSlice from "../features/dimensionUnit/dimensionUnitSlice";
import cartDynamicSlice from "../features/eCommerce/cart/cartSlice";
import cartOrder from "../features/eCommerce/cartOrder/cartOrderSlice";
import categoryListSlice from "../features/eCommerce/categoryList/categoryListSlice";
import courierMediumSlice from "../features/eCommerce/courierMedium/courierMediumSlice";
import currencySlice from "../features/eCommerce/currency/currencySlice";
import customerECommerce from "../features/eCommerce/customer/customerSlice";
import deliveryFeeSlice from "../features/eCommerce/deliveryFee/deliveryFeeSlice";
import discountSlice from "../features/eCommerce/discount/discountSlice";
import productPublicRelatedSlice from "../features/eCommerce/product/productPublicRelatedSlice";
import productAttributeSlice from "../features/eCommerce/productAttribute/productAttribute";
import productAttributeValueSlice from "../features/eCommerce/productAttributeValue/productAttributeValueSlice";
import productPublicSearchSlice from "../features/eCommerce/productSearch/productSearchSlice";
import returnOrderSlice from "../features/eCommerce/returnOrder/returnOrderSlice";
import reviewRatingSlice from "../features/eCommerce/reviewRating/reviewRatingSlice";
import sliderSlice from "../features/eCommerce/slider/sliderSlice";
import wishlistSlice from "../features/eCommerce/wishlist/wishlistSlice";
import holdSaleSlice from "../features/holdSale/holdSaleSlice";
import permissionSlice from "../features/hr/role/permissionSlice";
import roleSlice from "../features/hr/role/roleSlice";
import manualPaymentSlice from "../features/manualPayment/manualPaymentSlice";
import manufacturerSlice from "../features/manufacturer/manufacturerSlice";
import mediaSlice from "../features/media/mediaSlice";
import paymentMethodSlice from "../features/paymentMethod/paymentMethodSlice";
import printPageSlice from "../features/printPage/printPageSlice";
import productSearchSlice from "../features/product/productSearchSlice";
import productReducer from "../features/product/productSlice";
import productBrandReducer from "../features/productBrand/productBrandSlice";
import productCategoryReducer from "../features/productCategory/productCategorySlice";
import ProductSortListSlice from "../features/productSortList/ProductSortListSlice";
import productSubCategoryReducer from "../features/productSubCategory/productSubCategorySlice";

import quickLinkSlice from "../features/quickLink/quickLinkSlice";
import saleReducer from "../features/sale/saleSlice";
import settingReducer from "../features/setting/settingSlice";
import stockTransferSlice from "../features/stockTransfer/stockTransferSlice";
import supplierReducer from "../features/supplier/supplierSlice";
import supplierPaymentReducer from "../features/supplierPayment/supplierPaymentSlice";
import termsAndConditionSlice from "../features/termsAndCondition/termsAndConditionSlice";
import transactionReducer from "../features/transaction/transactionSlice";

//================== HRM Slice ======================
import userSlice from "../features/hrm/user/userSlice";

import EmailConfigSlice from "../features/EmailConfig/EmailConfigSlice";
import { apiSlice } from "../features/apiSlice/apiSlice";
import emailSlice from "../features/email/emailSlice";
import jobTypeSlice from "../features/hrm/JobType/jobTypeSlice";
import announcementSlice from "../features/hrm/announcement/announcementSlice";
import attendanceSlice from "../features/hrm/attendance/attendanceSlice";
import awardSlice from "../features/hrm/award/awardSlice";
import awardHistorySlice from "../features/hrm/awardHistory/awardHistorySlice";
import departmentSlice from "../features/hrm/department/departmentSlice";
import designationSlice from "../features/hrm/designation/designationSlice";
import designationHistorySlice from "../features/hrm/designationHistory/designationHistorySlice";
import educationSlice from "../features/hrm/education/educationSlice";
import employeeStatusSlice from "../features/hrm/employeeStatus/employeeStatusSlice";
import publicHolidaySlice from "../features/hrm/holiday/publicHolidaySlice";
import weeklyHolidaySlice from "../features/hrm/holiday/weeklyHolidaySlice";
import jobSlice from "../features/hrm/job/jobSlice";
import jobApplicationSlice from "../features/hrm/jobApplication/jobApplicationSlice";
import jobApplicationStatusSlice from "../features/hrm/jobApplicationStatus/jobApplicationStatusSlice";
import jobCategorySlice from "../features/hrm/jobCategory/jobCategorySlice";
import jobInterviewSlice from "../features/hrm/jobInterview/jobInterviewSlice";
import jobLocationSlice from "../features/hrm/jobLocation/jobLocationSlice";
import jobSkillsSlice from "../features/hrm/jobSkills/jobSkillsSlice";
import jobWorkExperienceSlice from "../features/hrm/jobWorkExperience/jobWorkExperienceSlice";
import leaveSlice from "../features/hrm/leave/leaveSlice";
import leavePolicySlice from "../features/hrm/leavePolicy/leavePolicySlice";
import salaryHistorySlice from "../features/hrm/salaryHistory/salaryHistorySlice";
import shiftSlice from "../features/hrm/shift/shiftSlice";
import prioritySlice from "@/redux/rtk/features/priority/prioritySlice";
import payrollSlice from "../features/hrm/payroll/payrollSlice";
import taskSlice from "../features/task/taskSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    payroll: payrollSlice,
    cart: cartReducer,
    cartDynamic: cartDynamicSlice,
    suppliers: supplierReducer,
    products: productReducer,
    productSearch: productSearchSlice,
    customers: customerReducer,
    task: taskSlice,
    sales: saleReducer,
    email: emailSlice,
    saleReturn: SaleReturnListSlice,
    adjustInventory: adjustInventorySlice,
    supplierPayments: supplierPaymentReducer,
    accounts: accountReducer,
    dashboard: dashboardReducer,
    transactions: transactionReducer,
    productCategories: productCategoryReducer,
    productSubCategories: productSubCategoryReducer,
    productBrands: productBrandReducer,
    colors: colorReducer,
    customerPayments: customerPaymentReducer,
    role: roleSlice,
    permission: permissionSlice,
    setting: settingReducer,
    productSortList: ProductSortListSlice,
    coupon: couponSlice,
    print: printPageSlice,
    holdSale: holdSaleSlice,
    termsAndConditions: termsAndConditionSlice,
    manufacturer: manufacturerSlice,
    dimensionUnit: dimensionUnitSlice,
    media: mediaSlice,
    emailConfig: EmailConfigSlice,
    priority: prioritySlice,
    // e-commerce slice
    customerECommerce: customerECommerce,
    courierMedium: courierMediumSlice,
    currency: currencySlice,
    discount: discountSlice,
    reviewRating: reviewRatingSlice,
    productAttribute: productAttributeSlice,
    productAttributeValue: productAttributeValueSlice,
    categoryList: categoryListSlice,
    productPublicRelated: productPublicRelatedSlice,
    productPublicSearch: productPublicSearchSlice,
    slider: sliderSlice,
    wishlist: wishlistSlice,
    ESale: cartOrder,
    auth: authSlice,
    manualPayment: manualPaymentSlice,
    paymentMethod: paymentMethodSlice,
    returnOrder: returnOrderSlice,
    deliveryFee: deliveryFeeSlice,
    quickLink: quickLinkSlice,
    stockTransfer: stockTransferSlice,
    damageStock: damageStockSlice,

    // ======== HRM ==============
    attendance: attendanceSlice,
    salaryHistory: salaryHistorySlice,
    designationHistory: designationHistorySlice,
    award: awardSlice,
    awardHistory: awardHistorySlice,
    education: educationSlice,
    department: departmentSlice,
    shift: shiftSlice,
    users: userSlice,
    employmentStatus: employeeStatusSlice,
    designations: designationSlice,
    announcement: announcementSlice,
    leave: leaveSlice,
    leavePolicy: leavePolicySlice,
    weeklyHoliday: weeklyHolidaySlice,
    publicHoliday: publicHolidaySlice,
    jobCategory: jobCategorySlice,
    jobType: jobTypeSlice,
    jobLocation: jobLocationSlice,
    jobSkills: jobSkillsSlice,
    jobWorkExperience: jobWorkExperienceSlice,
    job: jobSlice,
    jobApplication: jobApplicationSlice,
    jobInterview: jobInterviewSlice,
    jobApplicationStatus: jobApplicationStatusSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [
          "product/loadSingleProduct/fulfilled",
          "vatTax/loadVatTaxStatement/fulfilled",
          "transaction/deleteStaff/fulfilled",
          "productCategory/loadSingleProductCategory/fulfilled",
          "productSubCategory/loadSingleProductSubCategory/fulfilled",
          "productBrand/loadSingleProductBrand/fulfilled",
          "supplier/loadSupplier/fulfilled",
          "customer/loadSingleCustomer/fulfilled",
          "sale/loadSingleSale/fulfilled",
          "user/loadSingleStaff/fulfilled",
          "designation/loadSingleDesignation/fulfilled",
          "user/loadSingleStaff/fulfilled",
        ],
      },
    }).concat(apiSlice.middleware),
});

export default store;
