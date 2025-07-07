"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionPlanController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const pagination_1 = require("../../../constants/pagination");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const subscriptionPlan_constant_1 = require("./subscriptionPlan.constant");
const subscriptionPlan_service_1 = require("./subscriptionPlan.service");
const createSubscriptionPlan = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const SubscriptionPlanData = req.body;
    const result = yield subscriptionPlan_service_1.SubscriptionPlanService.createSubscriptionPlan(SubscriptionPlanData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'SubscriptionPlan Created successfully!',
        data: result,
    });
}));
const getAllSubscriptionPlan = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, [
        'searchTerm',
        ...subscriptionPlan_constant_1.subscriptionPlanFilterAbleFields,
    ]);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = yield subscriptionPlan_service_1.SubscriptionPlanService.getAllSubscriptionPlan(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'SubscriptionPlan retrieved successfully !',
        meta: result.meta,
        data: result.data,
    });
}));
const getSingleSubscriptionPlan = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield subscriptionPlan_service_1.SubscriptionPlanService.getSingleSubscriptionPlan(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'SubscriptionPlan retrieved  successfully!',
        data: result,
    });
}));
const updateSubscriptionPlan = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updateAbleData = req.body;
    const result = yield subscriptionPlan_service_1.SubscriptionPlanService.updateSubscriptionPlan(id, updateAbleData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'SubscriptionPlan Updated successfully!',
        data: result,
    });
}));
const deleteSubscriptionPlan = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield subscriptionPlan_service_1.SubscriptionPlanService.deleteSubscriptionPlan(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'SubscriptionPlan deleted successfully!',
        data: result,
    });
}));
exports.SubscriptionPlanController = {
    getAllSubscriptionPlan,
    createSubscriptionPlan,
    updateSubscriptionPlan,
    getSingleSubscriptionPlan,
    deleteSubscriptionPlan,
};
