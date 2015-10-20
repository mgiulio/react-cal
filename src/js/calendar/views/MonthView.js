var
   React = require('react')
   ,date = require('../Date')
   ,Navbar = require('./Navbar')
;

var MonthView = React.createClass({

   render: function() {
      var
         isTodayPage = date.isToday(this.props.year, this.props.month),
         d = date.monthDates(this.props.year, this.props.month),
         days = [],
         dayEvents = null
      ;

      /*
       * Prev month cells
       */

      for (var i = d.prevMonthLastDate - (d.currMonthFirstDay - 1) + 1;  i <= d.prevMonthLastDate; i++) {
         dayEvents = null;

         if (i in this.props.events.prevMonth)
            dayEvents = this.props.events.prevMonth[i].map((e, j) => <li className="mg-calendar-event" key={j}>{e.title}</li>);

         days.push(
            <div className="mg-calendar-day mg-calendar-day-out-month mg-calendar-day-prev-month" key={`prev-${i}`}>
               <div className="mg-calendar-day-date">{i}</div>
               <ul className="mg-calendar-events">{dayEvents}</ul>
            </div>
         );
      }

      /*
       * Curr month cells
       */

      var classNames = [];
      for (i = 0; i < d.currMonthLastDate; i++)
         classNames.push("mg-calendar-day");

      if (isTodayPage)
         classNames[new Date().getDate() - 1] += ' mg-calendar-today';

      for (i = 1; i <= d.currMonthLastDate; i++) {
         dayEvents = null;

         if (i in this.props.events.currMonth)
            dayEvents = this.props.events.currMonth[i].map((e, j) => <li className="mg-calendar-event" key={j}>{e.title}</li>);

         days.push(
            <div className={classNames[i-1]} key={`curr-${i}`} onClick={this.handleDayCellClick}>
               <div className="mg-calendar-day-date">{i}</div>
               <ul className="mg-calendar-events">{dayEvents}</ul>
            </div>
         );
      }

      /*
       * Next month cells
       */

      var lastOutCellDate = 42 - days.length; //7 - d.currMonthLastDay;
      for (i = 1; i <= lastOutCellDate; i++) {
         dayEvents = null;

         if (i in this.props.events.nextMonth)
            dayEvents = this.props.events.nextMonth[i].map((e, j) => <li className="mg-calendar-event" key={j}>{e.title}</li>);

         days.push(
            <div className="mg-calendar-day mg-calendar-day-out-month mg-calendar-day-next-month" key={`next-${i}`}>
               <div className="mg-calendar-day-date">{i}</div>
               <ul className="mg-calendar-events">{dayEvents}</ul>
            </div>
         );
      }

      return (
         <div className="mg-calendar mg-calendar-view-month">
            <Navbar
               year={this.props.year} month={this.props.month}
               on={this.props.on}
            />
            <div className="mg-calendar-weekdays">
               <span className="mg-calendar-weekday">Mo</span>
               <span className="mg-calendar-weekday">Tu</span>
               <span className="mg-calendar-weekday">We</span>
               <span className="mg-calendar-weekday">Th</span>
               <span className="mg-calendar-weekday">Fr</span>
               <span className="mg-calendar-weekday">Sa</span>
               <span className="mg-calendar-weekday">Su</span>
            </div>
            <div className="mg-calendar-days">
               {days}
            </div>
         </div>
      );
   },

   handleDayCellClick: function(e) {
      e.stopPropagation();
      
      var dayCell = e.target;
      while (!dayCell.classList.contains('mg-calendar-day'))
         dayCell = dayCell.parentElement;

      var dayDate = parseInt(dayCell.querySelector('.mg-calendar-day-date').innerHTML);

      this.props.on.down(dayDate);
   }

});

module.exports = MonthView;
