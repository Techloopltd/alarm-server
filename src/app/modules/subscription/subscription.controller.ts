import { Subscription } from '@prisma/client';
          import { Request, Response } from 'express';
          import { RequestHandler } from 'express-serve-static-core';
          import httpStatus from 'http-status';
          import { paginationFields } from '../../../constants/pagination';
          import catchAsync from '../../../shared/catchAsync';
          import pick from '../../../shared/pick';
          import sendResponse from '../../../shared/sendResponse';
          import { SubscriptionService } from './subscription.service';
          import { subscriptionFilterAbleFields } from './subscription.constant';
          const createSubscription: RequestHandler = catchAsync(
            async (req: Request, res: Response) => {
              const SubscriptionData = req.body;
          
              const result = await SubscriptionService.createSubscription(
                SubscriptionData
              );
              sendResponse<Subscription>(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Subscription Created successfully!',
                data: result,
              });
            }
          );
          
          
  const getAllSubscription = catchAsync(
            async (req: Request, res: Response) => {
              const filters = pick(req.query, [
                'searchTerm',
                ...subscriptionFilterAbleFields,
              ]);
              const paginationOptions = pick(req.query, paginationFields);
          
              const result = await SubscriptionService.getAllSubscription(
                filters,
                paginationOptions
              );
          
              sendResponse<Subscription[]>(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Subscription retrieved successfully !',
                meta: result.meta,
                data: result.data,
              });
            }
          );
  
          
          const getSingleSubscription: RequestHandler = catchAsync(
            async (req: Request, res: Response) => {
              const id = req.params.id;
          
              const result = await SubscriptionService.getSingleSubscription(id);
          
              sendResponse<Subscription>(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Subscription retrieved  successfully!',
                data: result,
              });
            }
          );
          
          const updateSubscription: RequestHandler = catchAsync(
            async (req: Request, res: Response) => {
              const id = req.params.id;
              const updateAbleData = req.body;
          
              const result = await SubscriptionService.updateSubscription(
                id,
                updateAbleData
              );
          
              sendResponse<Subscription>(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Subscription Updated successfully!',
                data: result,
              });
            }
          );
          const deleteSubscription: RequestHandler = catchAsync(
            async (req: Request, res: Response) => {
              const id = req.params.id;
          
              const result = await SubscriptionService.deleteSubscription(id);
          
              sendResponse<Subscription>(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Subscription deleted successfully!',
                data: result,
              });
            }
          );
          
          export const SubscriptionController = {
            getAllSubscription,
            createSubscription,
            updateSubscription,
            getSingleSubscription,
            deleteSubscription,
          };