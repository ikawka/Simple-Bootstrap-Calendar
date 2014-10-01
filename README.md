Simple-Bootstrap-Calendar
=========================

A very simple Bootstrap Calendar utilizing the dropdown menu. You can also use [$.format](https://github.com/phstc/jquery-dateFormat) to format the date output.

10-01-2014:

-Added the auto position calculator using [PositionCalculator](https://github.com/tlindig/position-calculator) to be able to position the menu on top if the element is at the bottom of the page.

-Added Time Selector.

Example:

```html
<form id="frm-test" onsubmit="return false;">
    <input type="text" id="myCalendar" value="0" name="some-date" />
    <button type="submit" class="btn btn-primary" >Test</button>
</form>
```

```javascript
$("#myCalendar").simpleCalendar({
    bsBtnClass: 'btn-warning',   //bootstap button styles
    defaultText: 'Select Date',
    dateFormat: 'MMM dd, yyyy',  //using $.format plugin
    changeMonth: true,           //true|false. defaults to false, set month to select mode when set to true
    changeYear: true,            //true|false. defaults to false, set year to select mode when set to true
    yearRange: '1950:2000',      //begin:end|false. defaults to false, limit the year range
    showTime: true               //true|false. defaults to false, shows time selector when set to true
});
```
To set initial value
```javascript
$("#myCalendar").val("2014-08-28").change();
```
[See in Action](http://jsfiddle.net/bulletproofscripts/08r7m1hL/embedded/result/)
