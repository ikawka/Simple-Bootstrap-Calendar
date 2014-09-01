(function ($) {
    var cal_days_labels = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    var cal_months_labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var cal_months_labels_ = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    var cal_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // this is the current date
    var cal_current_date = new Date();
    var today = new Date();
    var nCal = null;
    var theSelectedDate = '';
    var settings;
    
    function setYear(year){
        if(settings.changeYear !== false){
            var yearOption = '<select class="simple-calendar-year form-control">';
            var thisyear   = cal_current_date.getFullYear();
            var range = [];
            if(settings.yearRange != false){
                range = settings.yearRange.split(':');
            }else{
                range[0] = thisyear - 10;
                range[1] = thisyear + 10;
            }
            
            for(var y = range[0]; y<= range[1]; y++){
                yearOption += '<option value="'+y+'" '+
                              ((y==year)?'selected':'')+
                              '>'+y+'</option>';
            }
            yearOption += '</select>';
            return '<div style="width: 50%; text-align: left" class="pull-right">'+yearOption+'</div>';
        }
        return '<div style="width: 50%; text-align: center; line-height: 22px" class="pull-right">'+year+'</div>';
    }
    
    function setMonthName(selected){
        if(settings.changeMonth !== false){
            var monthOption = '<select class="simple-calendar-month form-control">';
            for(var e=0; e<cal_months_labels_.length; e++){
                monthOption += '<option value="'+e+'" '+
                    ((e == selected) ? 'selected':'')+
                    '>'+cal_months_labels_[e]+'</option>';
            }
            monthOption += '</select>';
            return '<div style="width: 50%; text-align: right">'+monthOption+'</div>';
        }
        
        return '<div style="width: 50%; text-align: center; line-height: 22px;">'+cal_months_labels[selected]+'</div>';
    }
    
    function Calendar(month, year) {
        this.month = (isNaN(month) || month == null) ? cal_current_date.getMonth() : month;
        this.year = (isNaN(year) || year == null) ? cal_current_date.getFullYear() : year;
        this.html = '';
    }
    
    Calendar.prototype.generateHTML = function () {
        // get first day of month
        var firstDay = new Date(this.year, this.month, 1);
        var startingDay = firstDay.getDay();
        // find number of days in month
        var monthLength = cal_days_in_month[this.month];
        // compensate for leap year
        if (this.month == 1) { // February only!
            if ((this.year % 4 == 0 && this.year % 100 != 0) || this.year % 400 == 0) {
                monthLength = 29;
            }
        }

        var monthName = setMonthName(this.month);
        var theYear   = setYear(this.year);
        
        var html = '<table class="table table-condense table-striped table-bordered">'+
            '<tr><th><a class="simple-calendar-move btn-prev glyphicon glyphicon-chevron-left" href="javascript:;"></a></th><th colspan="5" style="text-align:center; padding: '+((settings.changeMonth !== false) ? '2':'8')+'px;">'+
                    theYear+ "" + monthName+
                   '</th><th><a class="simple-calendar-move btn-next glyphicon glyphicon-chevron-right" href="javascript:;"></a></th></tr>'+
                   '<tr class="calendar-header">';
        for (var i = 0; i <= 6; i++) {
            html += '<td class="calendar-header-day">';
            html += cal_days_labels[i];
            html += '</td>';
        }
        
        html += '</tr><tr>';

        var day = 1;
        // this loop is for is weeks (rows)
        for (var i = 0; i < 9; i++) {
            // this loop is for weekdays (cells)
            var mnth = this.month + 1;
            for (var j = 0; j <= 6; j++) {
                if (day <= monthLength && (i > 0 || j >= startingDay)) {
                    var paramDate = this.year + '-' + ((mnth < 10) ? '0' + mnth : mnth) + '-' + ((day < 10) ? '0' + day : day);
                    html += '<td><a href="javascript:;" class="day-item' + ((this.month == today.getMonth() && this.year == today.getFullYear() && day == today.getDate()) ? ' today' : '') + ((paramDate == theSelectedDate) ? ' selected' : '') + '" data-date="' + paramDate +
                        '">';

                    html += day;
                    html += '</a></td>';
                    day++;
                } else {
                    html += '<td></td>';
                }

            }
            // stop making rows if we've run out of days
            if (day > monthLength) {
                break;
            } else {
                html += '</tr><tr>';
            }
        }
        html += '</tr></table>';

        this.html = html;
    };

    Calendar.prototype.getHTML = function () {
        return this.html;
    };

    function moveNext() {
        var currMonth = cal_current_date.getMonth();
        var currYear = cal_current_date.getFullYear();
        currMonth += 1;

        if (currMonth == 12) {
            currMonth = 0;
            currYear += 1;
            cal_current_date.setFullYear(currYear);
        }
        cal_current_date.setMonth(currMonth);
        nCal.find('.dropdown-menu').empty().append(renderCalendar());
    }

    function movePrev() {
        var currMonth = cal_current_date.getMonth();
        var currYear = cal_current_date.getFullYear();
        currMonth -= 1;

        if (currMonth < 0) {
            currMonth = 11;
            currYear -= 1;
            cal_current_date.setFullYear(currYear);
        }
        cal_current_date.setMonth(currMonth);
        nCal.find('.dropdown-menu').empty().append(renderCalendar());
    }
    
    function jumpTo(month, year){
        cal_current_date.setFullYear(year);
        cal_current_date.setMonth(month);
        nCal.find('.dropdown-menu').empty().append(renderCalendar());
    }

    function renderCalendar() {
        var thisMonth = cal_current_date.getMonth();
        var thisYear = cal_current_date.getFullYear();
        var cal = new Calendar(thisMonth, thisYear);
        cal.generateHTML();

        var calendar = $(cal.getHTML());
        calendar.find('a.btn-next').click(function () {
            moveNext();
        });

        calendar.find('a.btn-prev').click(function () {
            movePrev();
        });
        
        calendar.find('select.simple-calendar-month').change(function(){
            var month = $(this).val();
            var year  = calendar.find('select.simple-calendar-year').val();
            jumpTo(month, year);
        });
        
        calendar.find('select.simple-calendar-year').change(function(){
            calendar.find('select.simple-calendar-month').change();
        });
        return calendar;
    }

    function dateToYmd(dateISOString) {
        var Ymd = dateISOString.split('T')[0];
        return Ymd;
    }

    $.fn.simpleCalendar = function (options) {
        var defaults = {
            bsBtnClass: 'btn-default',
            defaultText: 'Select Date',
            dateFormat: 'YYYY-MM-dd',
            maxDate: 0,
            yearRange: false,
            changeMonth: false,
            changeYear: false
        };
        
        settings = $.extend({}, defaults, options);
        //unset the time
        cal_current_date.setHours(0);
        cal_current_date.setMinutes(0);
        cal_current_date.setSeconds(0);

        return this.each(function (i, o) {
            $(o).hide();

            nCal = $(
                '<div class="dropdown simple-calendar">' +
                '<button class="btn ' + settings.bsBtnClass + ' dropdown-toggle" type="button" data-toggle="dropdown"><div class="selected-text">' + settings.defaultText + '</div> <span class="caret"></span></button>' +
                '<div class="dropdown-menu" role="menu" style="padding: 0" id="meals-calendar-container"></div>' +

                '</div>').on({
                "shown.bs.dropdown": function () {
                    this.closable = true;
                },
                    "mousedown": function (e) {
                    var target = $(e.target);
                    if (target.hasClass('day-item')) {
                        $(this).find('.table a').removeClass('selected');
                        target.addClass('selected');
                    }
                },
                    "click": function (e) {
                    var target = $(e.target);
                        console.log(target)
                    this.closable = true;
                    if (target.hasClass('simple-calendar-move') || target.is('select') || target.is('option')) {
                        this.closable = false;
                    } else if (target.hasClass('day-item')) {
                        var theDate = theSelectedDate = target.attr('data-date');

                        if ($.format) {
                            var formatted = $.format.date(new Date(Date.parse(theDate)).toISOString(), settings.dateFormat);
                            $(o).val(formatted).change();
                        } else {
                            $(o).val(theDate).change();
                        }
                    }
                },
                    "hide.bs.dropdown": function () {
                    var that = this;
                    setTimeout(function () {
                        that.closable = true;
                    }, 1000);
                    return this.closable;
                }
            });
            nCal.find('button').click(function () {
                $(o).change();
            });

            $(o).after(nCal);

            $(o).change(function () {
                var theValue = $(this).val();
                
                if (isNaN(Date.parse(theValue))) {
                    nCal.find('.dropdown-menu').empty().append(renderCalendar());
                    return;
                }

                cal_current_date = new Date(Date.parse(theValue));
                var temp = cal_current_date.toISOString();
                theSelectedDate = dateToYmd(temp);

                if ($.format) {
                    theValue = $.format.date(new Date(Date.parse(theValue)).toISOString(), settings.dateFormat);
                }
                nCal.find('.selected-text').text(theValue);

                nCal.find('.dropdown-menu').empty().append(renderCalendar());
            });
        });
    };
})(jQuery);
