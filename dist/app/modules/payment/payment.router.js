"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const payment_controller_1 = require("./payment.controller");
const payment_validation_1 = require("./payment.validation");
const router = express_1.default.Router();
router.get('/', payment_controller_1.PaymentController.getAllPayment);
router.get('/:id', payment_controller_1.PaymentController.getSinglePayment);
router.post('/', (0, validateRequest_1.default)(payment_validation_1.PaymentValidation.createValidation), payment_controller_1.PaymentController.createPayment);
router.patch('/:id', (0, validateRequest_1.default)(payment_validation_1.PaymentValidation.updateValidation), payment_controller_1.PaymentController.updatePayment);
router.delete('/:id', payment_controller_1.PaymentController.deletePayment);
exports.PaymentRoutes = router;
