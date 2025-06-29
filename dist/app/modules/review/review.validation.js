"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewValidation = void 0;
const zod_1 = require("zod");
const createValidation = zod_1.z.object({
    body: zod_1.z.object({
        star: zod_1.z.number({ required_error: 'star is required' }).min(0).max(5),
        reviewText: zod_1.z.string({ required_error: 'reviewText is required' }),
    }),
});
const updateValidation = zod_1.z.object({
    body: zod_1.z.object({
        star: zod_1.z
            .number({ required_error: 'star is required' })
            .min(0)
            .max(5)
            .optional(),
        reviewText: zod_1.z
            .string({ required_error: 'reviewText is required' })
            .optional(),
    }),
});
exports.ReviewValidation = {
    createValidation,
    updateValidation,
};
