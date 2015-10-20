var
   React = require('react')
   ,Calendar = require('./calendar/Calendar')
;

React.render(<Calendar events={getEvents()} year={2015} month={10} />, document.body);

function getEvents() {
   var dates = [
      '2015-9-30',
      '2015-10-1',
      '2015-10-5',
      '2015-10-5',
      '2015-10-5',
      '2015-10-12',
      '2015-10-31',
      '2015-11-1',
      '2015-10-10',
      '2015-10-20'
   ];

   return dates.map(d => { return {title: d, date: d}; });
}
