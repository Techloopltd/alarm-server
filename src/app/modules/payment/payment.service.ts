import { Payment, Prisma } from '@prisma/client';
          import httpStatus from 'http-status';
          import ApiError from '../../../errors/ApiError';
          import { paginationHelpers } from '../../../helpers/paginationHelper';
          import { IGenericResponse } from '../../../interfaces/common';
          import { IPaginationOptions } from '../../../interfaces/pagination';
          import prisma from '../../../shared/prisma';
          import { paymentSearchableFields } from './payment.constant';
          import { IPaymentFilters } from './payment.interface';
          
          
  
  const getAllPayment = async (
            filters: IPaymentFilters,
            paginationOptions: IPaginationOptions
          ): Promise<IGenericResponse<Payment[]>> => {
            const { page, limit, skip } =
              paginationHelpers.calculatePagination(paginationOptions);
          
            const { searchTerm, ...filterData } = filters;
          
            const andCondition = [];
          
            if (searchTerm) {
              const searchAbleFields = paymentSearchableFields.map(single => {
                const query = {
                  [single]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                  },
                };
                return query;
              });
              andCondition.push({
                OR: searchAbleFields,
              });
            }
            if (Object.keys(filters).length) {
             andCondition.push({
               AND: Object.entries(filterData).map(([field, value]) => {
                  // Check if the value is a string "true" or "false"
                  if (value === "true" || value === "false") {
                    return { [field]: JSON.parse(value) };
                  }
                  return { [field]: value };
                }),
              });
            }
          
            const whereConditions: Prisma.PaymentWhereInput =
              andCondition.length > 0 ? { AND: andCondition } : {};
          
            const result = await prisma.payment.findMany({
              where: whereConditions,
              skip,
              take: limit,
              orderBy:
                paginationOptions.sortBy && paginationOptions.sortOrder
                  ? {
                      [paginationOptions.sortBy]: paginationOptions.sortOrder,
                    }
                  : {
                      createdAt: 'desc',
                    },
            });
            const total = await prisma.payment.count();
            const output = {
              data: result,
              meta: { page, limit, total },
            };
            return output;
          };
  
          
          const createPayment = async (
            payload: Payment
          ): Promise<Payment | null> => {
            const newPayment = await prisma.payment.create({
              data: payload,
            });
            return newPayment;
          };
          
          const getSinglePayment = async (
            id: string
          ): Promise<Payment | null> => {
            const result = await prisma.payment.findUnique({
              where: {
                id,
              },
            });
            return result;
          };
          
          const updatePayment = async (
            id: string,
            payload: Partial<Payment>
          ): Promise<Payment | null> => {
            const result = await prisma.payment.update({
              where: {
                id,
              },
              data: payload,
            });
            return result;
          };
          
          const deletePayment = async (
            id: string
          ): Promise<Payment | null> => {
            const result = await prisma.payment.delete({
              where: { id },
            });
            if (!result) {
              throw new ApiError(httpStatus.NOT_FOUND, 'Payment not found!');
            }
            return result;
          };
          
          export const PaymentService = {
            getAllPayment,
            createPayment,
            updatePayment,
            getSinglePayment,
            deletePayment,
          };