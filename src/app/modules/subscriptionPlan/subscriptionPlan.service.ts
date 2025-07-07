import { Prisma, SubscriptionPlan } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { subscriptionPlanSearchableFields } from './subscriptionPlan.constant';
import { ISubscriptionPlanFilters } from './subscriptionPlan.interface';

const getAllSubscriptionPlan = async (
  filters: ISubscriptionPlanFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<SubscriptionPlan[]>> => {
  const { page, limit, skip } =
    paginationHelpers.calculatePagination(paginationOptions);

  const { searchTerm, ...filterData } = filters;

  const andCondition = [];

  if (searchTerm) {
    const searchAbleFields = subscriptionPlanSearchableFields.map(single => {
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
        if (value === 'true' || value === 'false') {
          return { [field]: JSON.parse(value) };
        }
        return { [field]: value };
      }),
    });
  }

  const whereConditions: Prisma.SubscriptionPlanWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};

  const result = await prisma.subscriptionPlan.findMany({
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
  const total = await prisma.subscriptionPlan.count();
  const output = {
    data: result,
    meta: { page, limit, total },
  };
  return output;
};

const createSubscriptionPlan = async (
  payload: SubscriptionPlan,
): Promise<SubscriptionPlan | null> => {
  const newSubscriptionPlan = await prisma.subscriptionPlan.create({
    data: payload,
  });
  return newSubscriptionPlan;
};

const getSingleSubscriptionPlan = async (
  id: string,
): Promise<SubscriptionPlan | null> => {
  const result = await prisma.subscriptionPlan.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateSubscriptionPlan = async (
  id: string,
  payload: Partial<SubscriptionPlan>,
): Promise<SubscriptionPlan | null> => {
  const isExits = await prisma.subscriptionPlan.findUnique({ where: { id } });
  if (!isExits) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Subscription not found!');
  }
  const result = await prisma.subscriptionPlan.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteSubscriptionPlan = async (
  id: string,
): Promise<SubscriptionPlan | null> => {
  const isExits = await prisma.subscriptionPlan.findUnique({ where: { id } });
  if (!isExits) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Subscription not found!');
  }
  const result = await prisma.subscriptionPlan.delete({
    where: { id },
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'SubscriptionPlan not found!');
  }
  return result;
};

export const SubscriptionPlanService = {
  getAllSubscriptionPlan,
  createSubscriptionPlan,
  updateSubscriptionPlan,
  getSingleSubscriptionPlan,
  deleteSubscriptionPlan,
};
