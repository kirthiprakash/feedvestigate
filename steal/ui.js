var st = steal("public/js/jquery.js");
st = st.then("public/css/bootstrap.css", "public/js/bootstrap.js");
st = st.then("public/css/index.css");
st = st.then("public/calendarPicker/jquery.calendarPicker.js", "public/calendarPicker/jquery.calendarPicker.css");
st.then(function($) {
	$(document).ready(function($) {
		cal = $("#date-select").calendarPicker({});
	});
});
