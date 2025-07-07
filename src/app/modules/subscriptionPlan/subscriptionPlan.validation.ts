import { z } from 'zod';

const createValidation = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    description: z.string({
      required_error: 'Description is required',
    }),
    price: z.number({
      required_error: 'Price is required',
    }),
    days: z.number({
      required_error: 'Days is required',
    }),
    isFeatured: z
      .boolean({
        required_error: 'isFeatured is required',
      })
      .optional(),
    stripePriceId: z
      .string({
        required_error: 'stripePriceId is required',
      })
      .optional(),
  }),
});
const updateValidation = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required',
      })
      .optional(),
    description: z
      .string({
        required_error: 'Description is required',
      })
      .optional(),
    price: z
      .number({
        required_error: 'Price is required',
      })
      .optional(),
    days: z
      .number({
        required_error: 'Days is required',
      })
      .optional(),
    isFeatured: z
      .boolean({
        required_error: 'isFeatured is required',
      })
      .optional(),
    stripePriceId: z
      .string({
        required_error: 'stripePriceId is required',
      })
      .optional(),
  }),
});
export const SubscriptionPlanValidation = {
  createValidation,
  updateValidation,
};
