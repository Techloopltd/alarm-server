import { Payment } from '@prisma/client';
          import { Request, Response } from 'express';
          import { RequestHandler } from 'express-serve-static-core';
          import httpStatus from 'http-status';
          import { paginationFields } from '../../../constants/pagination';
          import catchAsync from '../../../shared/catchAsync';
          import pick from '../../../shared/pick';
          import sendResponse from '../../../shared/sendResponse';
          import { PaymentService } from './payment.service';
          import { paymentFilterAbleFields } from './payment.constant';
          const createPayment: RequestHandler = catchAsync(
            async (req: Request, res: Response) => {
              const PaymentData = req.body;
          
              const result = await PaymentService.createPayment(
                PaymentData
              );
              sendResponse<Payment>(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Payment Created successfully!',
                data: result,
              });
            }
          );
          
          
  const getAllPayment = catchAsync(
            async (req: Request, res: Response) => {
              const filters = pick(req.query, [
                'searchTerm',
                ...paymentFilterAbleFields,
              ]);
              const paginationOptions = pick(req.query, paginationFields);
          
              const result = await PaymentService.getAllPayment(
                filters,
                paginationOptions
              );
          
              sendResponse<Payment[]>(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Payment retrieved successfully !',
                meta: result.meta,
                data: result.data,
              });
            }
          );
  
          
          const getSinglePayment: RequestHandler = catchAsync(
            async (req: Request, res: Response) => {
              const id = req.params.id;
          
              const result = await PaymentService.getSinglePayment(id);
          
              sendResponse<Payment>(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Payment retrieved  successfully!',
                data: result,
              });
            }
          );
          
          const updatePayment: RequestHandler = catchAsync(
            async (req: Request, res: Response) => {
              const id = req.params.id;
              const updateAbleData = req.body;
          
              const result = await PaymentService.updatePayment(
                id,
                updateAbleData
              );
          
              sendResponse<Payment>(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Payment Updated successfully!',
                data: result,
              });
            }
          );
          const deletePayment: RequestHandler = catchAsync(
            async (req: Request, res: Response) => {
              const id = req.params.id;
          
              const result = await PaymentService.deletePayment(id);
          
              sendResponse<Payment>(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: 'Payment deleted successfully!',
                data: result,
              });
            }
          );
          
          export const PaymentController = {
            getAllPayment,
            createPayment,
            updatePayment,
            getSinglePayment,
            deletePayment,
          };