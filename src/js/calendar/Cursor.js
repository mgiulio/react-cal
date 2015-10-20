var
   date = require('./Date.js')
;

function Cursor(year, month, day) {
   this.year = this.month = this.day = null;

   if (year) {
      this.year = year;
      if (month) {
         this.month = month;
         if (day)
            this.day = day;
      }
   }
}

Cursor.prototype.up = function() {
   var c = new Cursor();

   if (this.day) { // day -> month
      c.year = this.year;
      c.month = this.month;
   }
   else if (this.month) // month -> year
      c.year = this.year;

   return c;
};


Cursor.prototype.down = function(childIndex) {
   var c = new Cursor(this.year);

   if (this.month) { // Go down from a month to a day
      c.month = this.month;
      c.day = childIndex;
   }
   else // Go down from an year to a month
      c.month = childIndex;

   return c;
};

Cursor.prototype.left = function() {
   var
      y = this.year,
      m = this.month,
      d = this.day
   ;

   if (this.day) {
      d--;
      if (d === 0) {
         m--;
         if (m === 0) {
            m = 12;
            y--;
         }
         d = date.lastDateOfMonth(y, m);
      }
   }
   else if (this.month) {
      m--;
      if (m === 0) {
         m = 12;
         y--;
      }
   } else if (this.year) {
      y--;
   }

   return new Cursor(y, m, d);
};

Cursor.prototype.right = function() {
   var
      y = this.year,
      m = this.month,
      d = this.day
   ;

   if (this.day) {
      d++;
      if (d > date.lastDateOfMonth(y, m)) {
         m++;
         if (m === 13) {
            m = 1;
            y++;
         }
         d = 1;
      }
   }
   else if (this.month) {
      m++;
      if (m === 13) {
         m = 1;
         y++;
      }
   } else if (this.year) {
      y++;
   }

   return new Cursor(y, m, d);
};

Cursor.prototype.today = function() {
   var
      y, m, d,
      [ty, tm, td] = date.today()
   ;

   if (this.day) {
      y = ty;
      m = tm;
      d = td;
   }
   else if (this.month) {
      y = ty;
      m = tm;
   }
   else if (this.year) {
      y = ty;
   }

   return new Cursor(y, m, d);
};

Cursor.prototype.level = function() {
   var level = null;

   if (this.day)
      level = 'day';
   else if (this.month)
      level = 'month';
   else if (this.year)
      level = 'year';

   return level;
};

module.exports = Cursor;
