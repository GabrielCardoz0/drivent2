import { notFoundError } from "@/errors";
import ticketsRepository from "@/repositories/tickets-repository";

async function getTicketsTypes() {
  const ticketsTypesList = await ticketsRepository.getTicktsTypes();
  
  if(!ticketsTypesList) {
    throw notFoundError();
  }

  return ticketsTypesList;
}

async function getTicketsFromUser(userId: number) {
  const ticket = await ticketsRepository.getTicketsFromUser(userId);

  if(!ticket) throw notFoundError();
}

async function createNewTicket(ticketTypeId: number, userId: number) {
  const newTicket = await ticketsRepository.createNewTicket(ticketTypeId, userId);

  if(!newTicket) throw notFoundError();

  return newTicket;
}

const ticketsServices = {
  getTicketsTypes,
  getTicketsFromUser,
  createNewTicket
};

export default ticketsServices;
