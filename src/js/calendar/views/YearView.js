var
   React = require('react')
   ,date = require('../Date')
   ,Navbar = require('./Navbar')
;

var YearView = React.createClass({

   render: function() {
      var
         months = []
      ;

      months = [1,2,3,4,5,6,7,8,9,10,11,12].map(m => <li className="mg-calendar-view-year-month" data-month={m} onClick={this.handleMonthClick} key={m}>{date.monthLabel(m)}</li>);

      return (
         <div className="mg-calendar mg-calendar-view-year">
            <Navbar
               year={this.props.year}
               on={this.props.on}
            />
            <ul className="mg-calendar-view-year-months">{months}</ul>
         </div>
      );
   },

   handleMonthClick: function(e) {
      e.stopPropagation();

      var monthNode = e.target;
      this.props.on.down(monthNode.dataset.month);
   }

});

module.exports = YearView;
