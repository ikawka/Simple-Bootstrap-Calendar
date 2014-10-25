/*! https://github.com/tlindig/position-calculator */
!function(a){"function"==typeof define&&define.amd?define("position-calculator",["jquery"],a):jQuery.PositionCalculator=a(jQuery)}(function(a){"use strict";function b(a){return"string"==typeof a&&("window"===a?a=q:"document"===a&&(a=r)),a}function c(a){var b=a.split(" ");return{y:t.test(b[0])?b[0]:"top",x:u.test(b[1])?b[1]:"left"}}function d(a,b){return a===b?!0:a&&b?a.top===b.top&&a.left===b.left&&a.height===b.height&&a.width===b.width:!1}function e(b){var c=b[0];if(9===c.nodeType)return{width:b.outerWidth(),height:b.outerHeight(),top:0,left:0};if(a.isWindow(c))return{width:b.outerWidth(),height:b.outerHeight(),top:b.scrollTop(),left:b.scrollLeft()};if(c.preventDefault)return{width:0,height:0,top:c.pageY,left:c.pageX};var d=b.offset();return{width:b.outerWidth(),height:b.outerHeight(),top:d.top,left:d.left}}function f(b,c){var d=b[0];if(9!==d.nodeType){if(a.isWindow(d)&&(c.top=b.scrollTop(),c.left=b.scrollLeft()),d.preventDefault)return c.top=d.pageY,void(c.left=d.pageX);var e=b.offset();c.top=e.top,c.left=e.left}}function g(b){var c,d=b[0];return 9===d.nodeType?(d=s,c={top:0,left:0}):a.isWindow(d)?(d=s,c={top:b.scrollTop(),left:b.scrollLeft()}):c=b.offset(),{width:d.clientWidth,height:d.clientHeight,top:c.top+d.clientTop,left:c.left+d.clientLeft}}function h(b,c){var d,e=b[0];9===e.nodeType?(e=s,d={top:0,left:0}):a.isWindow(e)?(e=s,d={top:b.scrollTop(),left:b.scrollLeft()}):d=b.offset(),c.top=d.top+e.clientTop,c.left=d.left+e.clientLeft}function i(a,b){return{y:parseFloat(a.y)*(v.test(a.y)?b.height/100:1),x:parseFloat(a.x)*(v.test(a.x)?b.width/100:1),mirror:a.mirror}}function j(a,b,c){var d={top:0,left:0,middle:.5*a.height,center:.5*a.width,bottom:a.height,right:a.width};return 0!==b.y&&(d.middle+=b.y,b.mirror?(d.top+="top"!==c.y?-1*b.y:b.y,d.bottom+="bottom"!==c.y?-1*b.y:b.y):(d.top+=b.y,d.bottom+=b.y)),0!==b.x&&(d.center+=b.x,b.mirror?(d.left+="left"!==c.x?-1*b.x:b.x,d.right+="right"!==c.x?-1*b.x:b.x):(d.left+=b.x,d.right+=b.x)),d}function k(a){var b=[];return a.top>0&&b.push("top"),a.left>0&&b.push("left"),a.bottom<0&&b.push("bottom"),a.right<0&&b.push("right"),a.overflow=b.length?b:null,a}function l(a,b){var c={top:a.top-b.top,left:a.left-b.left,bottom:a.top+a.height-(b.top+b.height),right:a.left+a.width-(b.left+b.width),overflow:[]};return k(c)}function m(a,b,c,d){var e,f,g,h={y:b.y,x:b.x},i={y:c.y,x:c.x};if(-1!==d.overflow.indexOf("top")&&(e="top"),-1!==d.overflow.indexOf("bottom")&&(e=e?null:"bottom"),-1!==d.overflow.indexOf("left")&&(f="left"),-1!==d.overflow.indexOf("right")&&(f=f?null:"right"),!e&&!f)return null;switch(a=a===!0?"both":a,g=0,a){case"item":g=1;break;case"target":g=2;break;case"both":g=3}return 1&g&&(e&&(h.y=w[h.y]),f&&(h.x=w[h.x])),2&g&&(e&&(i.y=w[i.y]),f&&(i.x=w[i.x])),{item_at:h,tar_at:i}}function n(a,b,c){var d,e,f,g,h;return h=c?["top","bottom"]:["left","right"],d=a[h[0]],f=b[h[0]],e=-1*a[h[1]],g=-1*b[h[1]],0>d&&(d=0),0>e&&(e=0),0>f&&(f=0),0>g&&(g=0),0>d&&0>e?!0:0>f&&0>g?!1:f+g>d+e}function o(a,b){"all"===b&&(b=!0);var c=a.distance.overflow;if(!c.length)return a;for(var d,e,f=!1,g=!1,h=c.length-1;h>=0;h--)switch(d=c[h]){case"top":case"bottom":(!g&&b===!0||-1!==b.indexOf(d))&&(e=a.distance[d],a.moveBy.y+=e,a.distance.top-=e,a.distance.bottom-=e,g=!0);break;case"left":case"right":(!f&&b===!0||-1!==b.indexOf(d))&&(e=a.distance[d],a.moveBy.x+=e,a.distance.left-=e,a.distance.right-=e,f=!0)}return k(a.distance),a}function p(a){return this instanceof p?(this.options=this.$itm=this.$trg=this.$bnd=this.itmAt=this.trgAt=this.itmPos=this.trgPos=this.bndPos=this.itmOffset=this.trgOffset=null,void this._init(a)):new p(a)}var q=window,r=document,s=r.documentElement,t=/top|middle|bottom/,u=/left|center|right/,v=/%$/,w={left:"right",center:"center",right:"left",top:"bottom",middle:"middle",bottom:"top"};return p.prototype._init=function(d){var e=this.options=a.extend({},p.defaults,d);return e.item?(this.$itm=e.item.jquery?e.item:a(e.item),0===this.$itm.length?null:(this.$trg=e.target&&e.target.jquery?e.target:a(b(e.target)),this.$bnd=e.boundary&&e.boundary.jquery?e.boundary:a(b(e.boundary)),this.itmAt=c(e.itemAt),this.trgAt=c(e.targetAt),this.resize(),this)):null},p.prototype.resize=function(){var a=this.options,b=e(this.$itm),c=this.$trg.length?e(this.$trg):null;if(this.bndPos=this.$bnd.length?g(this.$bnd):null,!this.itmPos||!d(b,this.itmPos)){this.itmPos=b;var f=i(a.itemOffset,b);f.x=-1*f.x,f.y=-1*f.y,this.itmOffset=j(b,f,this.itmAt)}return this.trgPos&&d(c,this.trgPos)||(this.trgPos=c,c&&(this.trgOffset=j(c,i(a.targetOffset,c),this.trgAt))),this},p.prototype.calcVariant=function(a,b){var c={moveBy:null,distance:null,itemAt:null,targetAt:null};if(this.trgPos&&a&&b){var d={top:this.trgPos.top+this.trgOffset[b.y],left:this.trgPos.left+this.trgOffset[b.x]},e={top:d.top-this.itmOffset[a.y],left:d.left-this.itmOffset[a.x],height:this.itmPos.height,width:this.itmPos.width};c.moveBy={y:e.top-this.itmPos.top,x:e.left-this.itmPos.left},c.distance=this.bndPos?l(this.bndPos,e):null,c.itemAt=a.y+" "+a.x,c.targetAt=b.y+" "+b.x}else c.moveBy={y:0,x:0},c.distance=this.bndPos?l(this.bndPos,this.itmPos):null;return c},p.prototype.calculate=function(){if(null===this.itmPos)return null;var a=this.options;f(this.$itm,this.itmPos),this.trgPos&&f(this.$trg,this.trgPos),this.bndPos&&h(this.$bnd,this.bndPos);var b=this.calcVariant(this.itmAt,this.trgAt);if(!b.distance||!b.distance.overflow)return b;if(a.flip&&"none"!==a.flip&&this.trgPos){var c,d=m(a.flip,this.itmAt,this.trgAt,b.distance);if(d){if(c=this.calcVariant(d.item_at,d.tar_at),!c.distance.overflow)return c;var e={y:!1,x:!1};if(e.y=n(c.distance,b.distance,!0),e.x=n(c.distance,b.distance,!1),e.y!==e.x){if(b=this.calcVariant({y:e.y?d.item_at.y:this.itmAt.y,x:e.x?d.item_at.x:this.itmAt.x},{y:e.y?d.tar_at.y:this.trgAt.y,x:e.x?d.tar_at.x:this.trgAt.x}),!b.distance.overflow)return b}else e.y&&e.x&&(b=c)}}return a.stick&&"none"!==a.stick?o(b,a.stick):b},p.defaults={item:null,target:null,boundary:window,itemAt:"top left",targetAt:"top left",itemOffset:{y:0,x:0,mirror:!0},targetOffset:{y:0,x:0,mirror:!0},flip:"none",stick:"none"},p});

/*!
Simple Bootstrap Calendar
Version 0.1.0
https://github.com/ikawka/Simple-Bootstrap-Calendar
by ikawka August 2014
http://bulletproofscript.wordpress.com/

Sources/References
Basic Calendar
http://jszen.blogspot.com/2007/03/how-to-build-simple-calendar-with.html
Prevent Bootstrap dropdown from closing
http://stackoverflow.com/a/19797577
*/

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
    var theSelectedTime = '12:00 AM';
    var settings;
    var calendarId = "";
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
            return '<div style="width: 40%; text-align: left" class="pull-right">'+yearOption+'</div>';
        }
        return '<div style="width: 40%; text-align: center; line-height: 22px" class="pull-right">'+year+'</div>';
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
            return '<div style="width: 60%; text-align: right">'+monthOption+'</div>';
        }

        return '<div style="width: 60%; text-align: center; line-height: 22px;">'+cal_months_labels[selected]+'</div>';
    }

    function Calendar(month, year) {
        this.month = (isNaN(month) || month == null) ? cal_current_date.getMonth() : month;
        //if(settings.yearRange != false && isNaN(this.year)){
        //    this.year = settings.yearRange.split(':')[0];
        //}else{
           this.year = (isNaN(year) || year == null) ? cal_current_date.getFullYear() : year;
        //}
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

        var html = '<table class="table table-condense table-striped table-bordered">' +
                   '<tr><th><a class="simple-calendar-move btn-prev glyphicon glyphicon-chevron-left" href="javascript:;"></a></th><th colspan="5" style="text-align:center; padding: ' + ((settings.changeMonth !== false) ? '2':'4') + 'px;">' +
                    theYear + ' ' + monthName +
                   '</th><th><a class="simple-calendar-move btn-next glyphicon glyphicon-chevron-right" href="javascript:;"></a></th></tr>' +
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

        html += '</tr>';

        if(settings.showTime == true){
            var tOptions = '';
            var min  = '00';
            var ap   = 'AM';
            var hour = '';
            var t    = 0;
            while(t < 24){
                if(t<12){ ap = 'AM'; }else{ ap = 'PM'; }
                if(t == 0){ hour = 12; }else{ hour = ((t<10) ? '0'+t : t); }
                if(hour > 12 ){ hour = (((hour-12)<10) ? '0'+(hour-12) : (hour-12) ); }
                
                var displayTime = hour+':'+min+' '+ap;
                tOptions += '<option value="'+((t<10) ? '0'+t : t)+':'+min+'" '+((theSelectedTime == displayTime) ? 'selected' : '')+'>'+displayTime+'</option>';
                if(min == '30'){
                    min = '00';
                    t++;
                }else{
                    min = '30';
                }
            }

            html += '<tr><td style="line-height: 22px; font-weight: bold; padding: 2px" align="center" colspan="2">Time: </td>'+
                        '<td style="padding: 2px" colspan="3"><select class="simple-calendar-time form-control">'+tOptions+'</select></td>'+
                        '<td style="line-height: 22px; font-weight: bold; padding: 2px" align="center" colspan="2"><button type="button" class="btn btn-default btn-xs btn-calendar-ok">Select</button></td>'+
                    '</tr>';
        }

        html += '</table>';

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
        $('[data-id="'+calendarId+'"]').find('.dropdown-menu').empty().append(renderCalendar());
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
        $('[data-id="'+calendarId+'"]').find('.dropdown-menu').empty().append(renderCalendar());
    }

    function jumpTo(month, year){
        cal_current_date.setFullYear(year);
        cal_current_date.setMonth(month);
        $('[data-id="'+calendarId+'"]').find('.dropdown-menu').empty().append(renderCalendar());
    }

    function renderCalendar() {
        var thisMonth = cal_current_date.getMonth();
        var thisYear  = cal_current_date.getFullYear();
        var cal       = new Calendar(thisMonth, thisYear);
        
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
            var year  = $('[data-id="'+calendarId+'"]').find('.simple-calendar-year').val();
            jumpTo(month, year);
        });

        calendar.find('select.simple-calendar-year').change(function(){
            $('[data-id="'+calendarId+'"]').find('.simple-calendar-month').change();
        });
        
        calendar.find('button.btn-calendar-ok').click(function(){
            $('[data-id="'+calendarId+'"]').find('.simple-calendar-time').change();
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
            changeYear: false,
            showTime: false
        };

        settings = $.extend({}, defaults, options);

        //unset the time
        cal_current_date.setHours(0);
        cal_current_date.setMinutes(0);
        cal_current_date.setSeconds(0);

        return this.each(function (i, o) {
            $(o).hide();
            $(o).data("settings", JSON.stringify(settings));
            var id = calendarId = $(o).attr("id");
            var theValue = $(this).val();

            if (isNaN(Date.parse(theValue))) {
                cal_current_date = new Date();
                var temp = cal_current_date.toISOString();
                theSelectedDate = dateToYmd(temp);
            }else{
                cal_current_date = new Date(Date.parse(theValue));
                var temp = cal_current_date.toISOString();
                theSelectedDate = dateToYmd(temp);
            }
            nCal = $(
                '<div class="dropdown simple-calendar" data-id="'+id+'">' +
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
                    
                    this.closable = true;
                    if (target.hasClass('simple-calendar-move') || target.is('select') || target.is('option')) {
                        this.closable = false;
                    } else if (target.hasClass('day-item')) {
                        
                        if(settings.showTime == true)
                            this.closable = false;
                            
                        var theDate = theSelectedDate = target.attr('data-date');
                        
                        if(settings.showTime == true){
                            var theTime = theSelectedTime = $('[data-id="'+calendarId+'"]').find('.simple-calendar-time option:selected').text();
                            theDate    +=  ' '+theTime;
                        }
                        
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
                }, "change": function(e){
                    
                    var target = $(e.target);
                    if (target.hasClass('simple-calendar-time')){
                        if(settings.showTime == true)
                            this.closable = false;
                            
                        var theDate = theSelectedDate;
                        
                        if(settings.showTime == true){
                            var theTime = theSelectedTime = $('[data-id="'+calendarId+'"]').find('.simple-calendar-time option:selected').text();
                            theDate    +=  ' '+theTime;
                        }
                        
                        if ($.format) {
                            var formatted = $.format.date(new Date(Date.parse(theDate)).toISOString(), settings.dateFormat);
                            $(o).val(formatted).change();
                        } else {
                            $(o).val(theDate).change();
                        }
                    }
                }, "shown.bs.dropdown.position-calculator": function(e, data){
                    var $item = $('[data-id="'+calendarId+'"]').find('.dropdown-menu', e.target);
                    var target = data.relatedTarget;
                
                    // reset position
                    $item.css({top:0, left:0});
                    
                    // calculate new position
                    var calculator = new $.PositionCalculator({
                        item        : $item,
                        target      : target,
                        itemAt      : "top left",
                        itemOffset  : { y:3, x:0, mirror:true },
                        targetAt    : "bottom left",
                        flip        : "both"
                    });
                    var posResult = calculator.calculate();
                
                    // set new position
                    $item.css({
                        top: posResult.moveBy.y + "px",
                        left: posResult.moveBy.x + "px"
                    });
                }
            });
            nCal.find('button').click(function () {
                calendarId = $(o).attr("id");
                settings   = JSON.parse($(o).data("settings"));
                $(o).change();
            });

            $(o).after(nCal);

            $(o).change(function () {
                var theValue = $(this).val().replace(/\-/g, "/");

                if (isNaN(Date.parse(theValue))) {
                    cal_current_date = new Date();
                    var temp = cal_current_date.toISOString();
                    theSelectedDate = dateToYmd(temp);
                    $('[data-id="'+calendarId+'"]').find('.dropdown-menu').empty().append(renderCalendar());
                    return;
                }
                var tmpDate = new Date(theValue);
                cal_current_date = new Date();
                cal_current_date.setDate(tmpDate.getDate());
                cal_current_date.setMonth(tmpDate.getMonth());
                cal_current_date.setFullYear(tmpDate.getFullYear());
                
                var temp = cal_current_date.toISOString();
               
                theSelectedDate = dateToYmd(temp).replace(/\//g, "-");
                
                if ($.format) {
                    theValue = $.format.date(temp, settings.dateFormat);
                }
                
                $('[data-id="'+calendarId+'"]').find('.selected-text').text(theValue);

                $('[data-id="'+calendarId+'"]').find('.dropdown-menu').empty().append(renderCalendar());
            });
        });
    };
})(jQuery);
