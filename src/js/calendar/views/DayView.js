var
   React = require('react')
   ,Navbar = require('./Navbar.js')
;

var DayView = React.createClass({

   render: function() {
      var events;
      var eventItems = this.props.events.map((e, i) =>
         <li className="mg-calendar-day-view-event" key={i}>{e.title}</li>
      );
      events = eventItems.length > 0 ? <ul className="mg-calendar-day-view-events">{eventItems}</ul> : <p className="mg-calendar-view-day-no-events-msg">There are no all-day events on this day</p>;

      return (
         <div className="mg-calendar mg-calendar-view-day">
            <Navbar
               year={this.props.year} month={this.props.month} day={this.props.day}
               on={this.props.on}
            />
            <h2 className="mg-calendar-view-day-title">All Day Events</h2>
            {events}
         </div>
      );
   }

});

module.exports = DayView;
