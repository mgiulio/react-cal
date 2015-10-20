function Events(inputEvents) {
   var events = this.events = {};

   inputEvents.forEach(function(e) {
      var [y,m,d] = e.date.split('-');

      if (!events[y])
         events[y] = {};

      if (!events[y][m])
         events[y][m] = {};

      if (!events[y][m][d])
         events[y][m][d] = [];

      events[y][m][d].push(e);
   });
}

Events.prototype.getAll = function() {
};

Events.prototype.getYearEvents = function(year) {

};

Events.prototype.getMonthEvents = function(year, month) {
   return year in this.events && month in this.events[year] ? this.events[year][month] : {};
};

Events.prototype.getDayEvents = function(year, month, day) {
   return year in this.events && month in this.events[year] && day in this.events[year][month] ? this.events[year][month][day] : [];
};

module.exports = Events;
