import { AuthenticatedRequest } from "@/middlewares";
import ticketsServices from "@/services/tickets-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getTicketsTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const tikcetsList = await ticketsServices.getTicketsTypes();

    return res.status(httpStatus.OK).send(tikcetsList);
  } catch (error) {
    return res.sendStatus(401);
  }
}

export async function getTicketsFromUser(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req.body;

    const ticket = await ticketsServices.getTicketsFromUser(Number(userId));

    return res.status(200).send(ticket);
  } catch (error) {
    return res.sendStatus(404);
  }
}

export async function createNewTicket(req: AuthenticatedRequest, res: Response) {
  try {
    const { TicketTypeId, userId } = req.body;

    const ticket = await ticketsServices.createNewTicket(Number(TicketTypeId), Number(userId));

    return res.status(201).send(ticket);
  } catch (error) {
    return res.sendStatus(400);
  }
}
