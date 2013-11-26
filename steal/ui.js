var st = steal("http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js", 
				"public/js/d3.v3.js").then("http://netdna.bootstrapcdn.com/bootstrap/3.0.2/css/bootstrap.min.css", 
				"http://netdna.bootstrapcdn.com/bootstrap/3.0.2/js/bootstrap.min.js", 
				"public/css/index.css", 
				"public/calendarPicker/jquery.calendarPicker.js", 
				"public/calendarPicker/jquery.calendarPicker.css");

st.then(function($) {
	$(document).ready(function($) {
		$('#loading').remove();
		$('body').css({'opacity': 1});
		cal = $("#date-select").calendarPicker({
			callback : function(calen) {
				$('#date-field').val(calen.currentDate.getTime());
			}
		});
		$('#myModal').modal({});
	});
});
