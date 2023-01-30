import { prisma } from "@/config";

async function getTicktsTypes() {
  const ticketsList = await prisma.ticket.findMany({
    include: {
      TicketType: true
    }
  });

  return ticketsList;
}

async function getTicketsFromUser(userId: number) {
  const ticket = await prisma.enrollment.findMany({
    where: {
      userId
    },
    select: {
      Ticket: {
        select: {
          TicketType: true
        }
      }
    }
  });

  return ticket;
}

async function createNewTicket(ticketTypeId: number, userId: number) {
  const newTicketEnrollment = await prisma.enrollment.findFirst({
    where: {
      userId
    }
  });

  if(!newTicketEnrollment) return undefined;

  const newTicket = await prisma.ticket.create({
    data: {
      ticketTypeId,
      enrollmentId: newTicketEnrollment.id,
      status: "PAID",
    }
  });

  return prisma.ticket.findFirst({
    where: {
      id: newTicket.id
    },
    include: {
      TicketType: true
    }
  });
}

const ticketsRepository = {
  getTicktsTypes,
  getTicketsFromUser,
  createNewTicket
};

export default ticketsRepository;
