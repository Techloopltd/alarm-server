"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_router_1 = require("../modules/user/user.router");
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/auth/auth.route");
const faq_router_1 = require("../modules/faq/faq.router");
const fileUpload_route_1 = require("../modules/fileUpload/fileUpload.route");
const payment_router_1 = require("../modules/payment/payment.router");
const profile_router_1 = require("../modules/profile/profile.router");
const review_router_1 = require("../modules/review/review.router");
const subscription_router_1 = require("../modules/subscription/subscription.router");
const subscriptionPlan_router_1 = require("../modules/subscriptionPlan/subscriptionPlan.router");
const router = express_1.default.Router();
const moduleRoutes = [
    // ... routes
    {
        path: '/user',
        route: user_router_1.UserRoutes,
    },
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/file-upload',
        route: fileUpload_route_1.fileUploadRoutes,
    },
    {
        path: '/faq',
        route: faq_router_1.FaqRoutes,
    },
    {
        path: '/review',
        route: review_router_1.ReviewRoutes,
    },
    {
        path: '/profile',
        route: profile_router_1.ProfileRoutes,
    },
    {
        path: '/payment',
        route: payment_router_1.PaymentRoutes,
    },
    {
        path: '/subscribe',
        route: subscription_router_1.SubscriptionRoutes,
    },
    {
        path: '/subscriptionPlan',
        route: subscriptionPlan_router_1.SubscriptionPlanRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
