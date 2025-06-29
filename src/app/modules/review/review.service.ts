import { Prisma, Review } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { reviewSearchableFields } from './review.constant';
import { IReviewFilters } from './review.interface';

const getAllReview = async (
  filters: IReviewFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<Review[]>> => {
  const { page, limit, skip } =
    paginationHelpers.calculatePagination(paginationOptions);

  const { searchTerm, ...filterData } = filters;

  const andCondition = [];

  if (searchTerm) {
    const searchAbleFields = reviewSearchableFields.map(single => {
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

  const whereConditions: Prisma.ReviewWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};

  const result = await prisma.review.findMany({
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
  const total = await prisma.review.count();
  const output = {
    data: result,
    meta: { page, limit, total },
  };
  return output;
};

const createReview = async (
  payload: Review,
  userId: string,
): Promise<Review | null> => {
  //  check is user already submitted the reveiw
  const isReviewExits = await prisma.review.findUnique({ where: { userId } });
  if (isReviewExits) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'User already submitted a review',
    );
  }
  const newReview = await prisma.review.create({
    data: { ...payload, userId },
  });
  return newReview;
};

const getSingleReview = async (id: string): Promise<Review | null> => {
  const result = await prisma.review.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateReview = async (
  id: string,
  payload: Partial<Review>,
): Promise<Review | null> => {
  const result = await prisma.review.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteReview = async (id: string): Promise<Review | null> => {
  const result = await prisma.review.delete({
    where: { id },
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Review not found!');
  }
  return result;
};

export const ReviewService = {
  getAllReview,
  createReview,
  updateReview,
  getSingleReview,
  deleteReview,
};
