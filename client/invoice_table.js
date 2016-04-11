Template.InvoiceTable.onCreated(function () {
  var instance = this;
  limit = new ReactiveVar(20);

  instance.autorun(function () {
    instance.cursor = instance.subscribe('invoices', date.get(), days.get(), limit.get());
  });
});

Template.InvoiceTable.helpers({
  invoices: function () {
    return InvoiceTicketsCollection.find(getFilter(date.get(), days.get()), {
      sort: {
        createdAt: sortState.get('sortCreatedAt', true),
        total: sortState.get('sortTotal', true)
      },
      limit: limit.get()
    });
  },
  createdAtButtonText: function () {
    return sortState.get('sortCreatedAt');
  },
  totalButtonText: function () {
    return sortState.get('sortTotal');
  },
  dummy: function () {
    return "Test";
  },
  hasMoreContent: function () {
    return !(InvoiceTicketsCollection.find(getFilter(date.get(), days.get()), {
      sort: {
        createdAt: sortState.get('sortCreatedAt', true),
        total: sortState.get('sortTotal', true)
      },
      limit: limit.get()
    }).count() < limit.get());
  }
});

Template.InvoiceTable.events({
  "click #createdAt": function (event) {
    sortState.toggle('sortCreatedAt');
  },
  "click #total": function (event) {
    sortState.toggle('sortTotal');
  },
  "invoiceScrollEvent": function (event) {
    limit.set(limit.get() + 20);
  }
});
