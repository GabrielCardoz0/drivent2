import { createNewTicket, getTicketsFromUser, getTicketsTypes } from "@/controllers/tickets-controller";
import { authenticateToken, validateBody } from "@/middlewares";
import { ticketTypeSchema } from "@/schemas";
import { Router } from "express";

const ticketRouter = Router();

ticketRouter
  .get("/types", authenticateToken, getTicketsTypes)
  .get("/", authenticateToken, getTicketsFromUser)
  .post("/", authenticateToken, validateBody(ticketTypeSchema), createNewTicket);

export { ticketRouter };
