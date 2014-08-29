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
    bsBtnClass: 'btn-warning',  //bootstap button styles
    defaultText: 'Select Date',
    dateFormat: 'MMM dd, yyyy' //using $.format plugin
});
```

[See in Action](http://jsfiddle.net/bulletproofscripts/08r7m1hL/embedded/result/)
