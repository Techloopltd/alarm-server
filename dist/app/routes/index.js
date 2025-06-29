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
const review_router_1 = require("../modules/review/review.router");
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
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
