Meteor.startup(function() {
  // Generate new invoices on startup
  InvoiceTicketsCollection.remove({});
  createTicketsForFirstTwoMonths();
});

createTickets = function(startDate, days, numberOfTickets) {
  for (let invoiceNumber = 1; invoiceNumber <= numberOfTickets; invoiceNumber++) {
    let createdAt = new Date(startDate);
    createdAt.setDate(createdAt.getDate() - Math.floor(Math.random() * days));
    createdAt.setHours(0);
    createdAt.setMinutes(0);
    createdAt.setSeconds(0);
    createdAt.setMilliseconds(0);
    let total = Math.floor(Math.random() * 20) * 10;
    InvoiceTicketsCollection.insert({"invoiceNumber": invoiceNumber, "total": total, "createdAt": createdAt});
  }
}
createTicketsForFirstWeek = function() {
  createTickets(new Date(), 7, 50);
}
createTicketsForFirstMonth = function() {
  createTicketsForFirstWeek();
  createTickets(new Date(new Date() + 7), 23, 150); // Not exact but good enough
}
createTicketsForFirstTwoMonths = function() {
  createTicketsForFirstMonth();
  createTickets(new Date(new Date() + 30), 31, 150); // Not exact but good enough
}
