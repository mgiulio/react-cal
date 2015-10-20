var
   React = require('react')
   ,date = require('../Date')
;

var Navbar = React.createClass({

   render: function() {
      return (
         <div className="mg-calendar-navbar">
            <h1 className="mg-calendar-navbar-label">
               {this.label()}
            </h1>
            <div className="mg-calendar-navbar-navbtns">
               {this.navButtons()}
            </div>
         </div>
      );
   },

   navButtons: function() {
      var
         navButtons = [],
         key = 0
      ;

      if ('left' in this.props.on)
         navButtons.push(
            <button
               className="mg-calendar-navbar-button mg-calendar-navbar-button-left"
               title="Previous"
               onClick={this.props.on.left}
               key={key++}
            >
               Prev
            </button>
         );

      if ('right' in this.props.on)
         navButtons.push(
            <button
               className="mg-calendar-navbar-button mg-calendar-navbar-button-right"
               title="Next"
               onClick={this.props.on.right}
               key={key++}
            >
               Next
            </button>
         );

      if ('up' in this.props.on)
         navButtons.push(
            <button
               className="mg-calendar-navbar-button mg-calendar-navbar-button-up"
               title="Up"
               onClick={this.props.on.up}
               key={key++}
            >
               Up
            </button>
         );

      if ('today' in this.props.on) {
         var className = 'mg-calendar-navbar-button mg-calendar-navbar-button-today';

         if (date.isToday(this.props.year, this.props.month, this.props.day))
            className += ' mg-calendar-disabled';

         navButtons.push(
            <button
               className={className}
               title="Today"
               onClick={this.props.on.today}
               key={key++}
            >
               Today
            </button>
         );
      }

      return navButtons;
   },

   label: function() {
      var
         label = [],
         year,
         month,
         day,
         weekday,
         key = 0
      ;

      if (this.props.year) {
         year = <span className="mg-calendar-navbar-label-component mg-calendar-navbar-label-component-year" key={key++}>{this.props.year}</span>
      }

      if (this.props.month) {
         month = <span className="mg-calendar-navbar-label-component mg-calendar-navbar-label-component-month" key={key++}>{date.monthLabel(this.props.month)}</span>
      }

      if (this.props.day) {
         weekday = <span className="mg-calendar-navbar-label-component mg-calendar-navbar-label-component-weekday" key={key++}>
            {date.weekday(this.props.year, this.props.month, this.props.day)}
         </span>
         day = <span className="mg-calendar-navbar-label-component mg-calendar-navbar-label-component-day" key={key++}>{this.props.day}</span>
      }

      if (day) {
         label.push(weekday);
         label.push(day);
      }
      if (month)
         label.push(month);
      if (year)
         label.push(year);

      return label;
   }

});

module.exports = Navbar;
