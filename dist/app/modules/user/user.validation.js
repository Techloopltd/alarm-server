"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const createValidation = zod_1.z.object({
    body: zod_1.z.object({}),
});
const updateValidation = zod_1.z.object({
    body: zod_1.z.object({}),
});
const bulkDeleteValidation = zod_1.z.object({
    body: zod_1.z.array(zod_1.z.string()),
});
exports.UserValidation = {
    createValidation,
    updateValidation,
    bulkDeleteValidation,
};
