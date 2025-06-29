import { z } from 'zod';

const createValidation = z.object({
  body: z.object({
    star: z.number({ required_error: 'star is required' }).min(0).max(5),
    reviewText: z.string({ required_error: 'reviewText is required' }),
  }),
});
const updateValidation = z.object({
  body: z.object({
    star: z
      .number({ required_error: 'star is required' })
      .min(0)
      .max(5)
      .optional(),
    reviewText: z
      .string({ required_error: 'reviewText is required' })
      .optional(),
  }),
});
export const ReviewValidation = {
  createValidation,
  updateValidation,
};
