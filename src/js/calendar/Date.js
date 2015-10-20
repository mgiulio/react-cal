var
   //numDaysOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
   _monthLabel = ['January', 'Febrary', 'March', 'April', 'May', 'Jun', 'July', 'August', 'September', 'October', 'November', 'December'],
   weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'] // ordered as in Date.getDay()
   ,dayMs = 24*60*60*1000
;

function monthDates(year, month) {
   var out = {};

   var d = new Date(year, month - 1);

   d.setDate(1);
   out.currMonthFirstDay = d.getDay();
   if (out.currMonthFirstDay === 0)
      out.currMonthFirstDay = 7;

   d.setTime(d.getTime() - dayMs); // move by 24hr to get to the last day of prev month
   out.prevMonthLastDate = d.getDate();

   d.setDate(1);
   d.setMonth(d.getMonth() + 2);
   d.setTime(d.getTime() - dayMs)
   out.currMonthLastDate = d.getDate();
   out.currMonthLastDay = d.getDay();
   if (out.currMonthLastDay === 0)
      out.currMonthLastDay = 7;

   return out;
}

function lastDateOfMonth(year, month) {
   //return numDaysOfMonth[month];

   var d = new Date(year, month, 1);
   d.setTime(d.getTime() - dayMs);
   return d.getDate();
}

function today() {
   var t = new Date();
   return [t.getFullYear(), t.getMonth() + 1, t.getDate()];
}

function isToday(year, month, day) {
   var
      yes = false,
      today = new Date()
   ;

   if (day)
      yes = day == today.getDate() && month == today.getMonth() + 1 && year == today.getFullYear();
   else if (month)
      yes = month == today.getMonth() + 1 && year == today.getFullYear();
   else if (year)
      yes = year == today.getFullYear();

   return yes;
}

function weekday(y, m, d) {
   return weekdays[new Date(y, m - 1, d).getDay()];
}

function monthLabel(m) {
   return _monthLabel[m - 1];
}

module.exports = {
   monthDates: monthDates,
   lastDateOfMonth: lastDateOfMonth,
   monthLabel: monthLabel,
   weekday: weekday,
   today: today,
   isToday: isToday
};
