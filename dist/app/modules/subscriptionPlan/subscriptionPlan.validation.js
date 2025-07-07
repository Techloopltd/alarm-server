"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionPlanValidation = void 0;
const zod_1 = require("zod");
const createValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Name is required',
        }),
        description: zod_1.z.string({
            required_error: 'Description is required',
        }),
        price: zod_1.z.number({
            required_error: 'Price is required',
        }),
        days: zod_1.z.number({
            required_error: 'Days is required',
        }),
        isFeatured: zod_1.z
            .boolean({
            required_error: 'isFeatured is required',
        })
            .optional(),
        stripePriceId: zod_1.z
            .string({
            required_error: 'stripePriceId is required',
        })
            .optional(),
    }),
});
const updateValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            required_error: 'Name is required',
        })
            .optional(),
        description: zod_1.z
            .string({
            required_error: 'Description is required',
        })
            .optional(),
        price: zod_1.z
            .number({
            required_error: 'Price is required',
        })
            .optional(),
        days: zod_1.z
            .number({
            required_error: 'Days is required',
        })
            .optional(),
        isFeatured: zod_1.z
            .boolean({
            required_error: 'isFeatured is required',
        })
            .optional(),
        stripePriceId: zod_1.z
            .string({
            required_error: 'stripePriceId is required',
        })
            .optional(),
    }),
});
exports.SubscriptionPlanValidation = {
    createValidation,
    updateValidation,
};
