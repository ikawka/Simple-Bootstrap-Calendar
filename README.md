Simple-Bootstrap-Calendar
=========================

A very simple Bootstrap Calendar utilizing the dropdown menu. You can also use [$.format](https://github.com/phstc/jquery-dateFormat) to format the date output.

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
    changeMonth: true,           //set month to select mode
    changeYear: true,            //set year to select mode
    yearRange: '1950:2000'       // limit the year range
});
```
To set initial value
```javascript
$("#myCalendar").val("2014-08-28").change();
```
[See in Action](http://jsfiddle.net/bulletproofscripts/08r7m1hL/embedded/result/)
