import { SubscriptionPlan } from '@prisma/client';
import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { subscriptionPlanFilterAbleFields } from './subscriptionPlan.constant';
import { SubscriptionPlanService } from './subscriptionPlan.service';
const createSubscriptionPlan: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const SubscriptionPlanData = req.body;

    const result =
      await SubscriptionPlanService.createSubscriptionPlan(
        SubscriptionPlanData,
      );
    sendResponse<SubscriptionPlan>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'SubscriptionPlan Created successfully!',
      data: result,
    });
  },
);

const getAllSubscriptionPlan = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, [
      'searchTerm',
      ...subscriptionPlanFilterAbleFields,
    ]);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await SubscriptionPlanService.getAllSubscriptionPlan(
      filters,
      paginationOptions,
    );

    sendResponse<SubscriptionPlan[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'SubscriptionPlan retrieved successfully !',
      meta: result.meta,
      data: result.data,
    });
  },
);

const getSingleSubscriptionPlan: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await SubscriptionPlanService.getSingleSubscriptionPlan(id);

    sendResponse<SubscriptionPlan>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'SubscriptionPlan retrieved  successfully!',
      data: result,
    });
  },
);

const updateSubscriptionPlan: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updateAbleData = req.body;

    const result = await SubscriptionPlanService.updateSubscriptionPlan(
      id,
      updateAbleData,
    );

    sendResponse<SubscriptionPlan>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'SubscriptionPlan Updated successfully!',
      data: result,
    });
  },
);
const deleteSubscriptionPlan: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await SubscriptionPlanService.deleteSubscriptionPlan(id);

    sendResponse<SubscriptionPlan>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'SubscriptionPlan deleted successfully!',
      data: result,
    });
  },
);

export const SubscriptionPlanController = {
  getAllSubscriptionPlan,
  createSubscriptionPlan,
  updateSubscriptionPlan,
  getSingleSubscriptionPlan,
  deleteSubscriptionPlan,
};
