var st = steal("public/js/jquery.js", 
				"public/js/d3.v3.js", 
				"public/css/bootstrap.css", 
				"public/js/bootstrap.js",
				"public/css/index.css",
				"public/calendarPicker/jquery.calendarPicker.js", 
				"public/calendarPicker/jquery.calendarPicker.css");
				
st.then(function($) {
	$(document).ready(function($) {
		cal = $("#date-select").calendarPicker({callback:function(calen){
							$('#date-field').val(calen.currentDate.getTime());
						}});
	});
});
