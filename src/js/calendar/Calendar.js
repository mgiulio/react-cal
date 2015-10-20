var
   React = require('react')
   ,Cursor = require('./Cursor')
   ,Events = require('./Events')
   ,YearView = require('./views/YearView')
   ,MonthView = require('./views/MonthView')
   ,DayView = require('./views/DayView')
;

var Calendar = React.createClass({

   getInitialState: function() {
      this.events = new Events(this.props.events);

      return {
         cursor: new Cursor(this.props.year, this.props.month, this.props.day)
      };
   },

   render: function() {
      var
         cursor = this.state.cursor,
         view
      ;

      switch (cursor.level()) {
         case 'year':
            view = <YearView
               year={cursor.year}
               events={this.events.getYearEvents(cursor.year)}
               on={{
                  left: this.left,
                  right: this.right,
                  down: this.down,
                  today: this.today
               }}
            />;
            break;
         case 'month':
            var prevMonthCursor = cursor.left();
            var nextMonthCursor = cursor.right();

            view = <MonthView
               year={cursor.year} month={cursor.month}
               events={{
                  currMonth: this.events.getMonthEvents(cursor.year, cursor.month),
                  prevMonth: this.events.getMonthEvents(prevMonthCursor.year, prevMonthCursor.month),
                  nextMonth: this.events.getMonthEvents(nextMonthCursor.year, nextMonthCursor.month)
               }}
               on={{
                  left: this.left,
                  right: this.right,
                  up: this.up,
                  down: this.down,
                  today: this.today
               }}
            />;
            break;
         case 'day':
            view = <DayView
               year={cursor.year} month={cursor.month} day={cursor.day}
               events={this.events.getDayEvents(cursor.year, cursor.month, cursor.day)}
               on={{
                  left: this.left,
                  right: this.right,
                  up: this.up,
                  today: this.today
               }}
            />;
            break;
         default:
            view = <AgendaView
               events={this.events.getAll()}
            />;
      }

      return view;
   },

   left: function() {
      this.setState({cursor: this.state.cursor.left()});
   },

   right: function() {
      this.setState({cursor: this.state.cursor.right()});
   },

   up: function() {
      this.setState({cursor: this.state.cursor.up()});
   },

   down: function(childIndex) {
      this.setState({cursor: this.state.cursor.down(childIndex)});
   },

   today: function() {
      this.setState({cursor: this.state.cursor.today()});
   }

});

module.exports = Calendar;
