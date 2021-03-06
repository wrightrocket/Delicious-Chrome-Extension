$(document).ready(function() {
	$(window).load(function(){
		if(localStorage.getItem("bookmarkKeyChar")) {
			var bookmarkKeyChar_stored = localStorage.getItem("bookmarkKeyChar"),
				bookmarkSpecialKey_stored = localStorage.getItem("bookmarkSpecialKey");
			
			$('#bookmarkKeyChar').val(bookmarkKeyChar_stored);
			
			if (bookmarkSpecialKey_stored === null) {
				// Default to alt
				$('#bookmarkSpecialKey').val('alt');
			} else {
				$('#bookmarkSpecialKey').val(bookmarkSpecialKey_stored);
			}
		} else {
			$('#bookmarkKeyChar').val('D');
			$('#bookmarkSpecialKey').val('alt');
		}

		// if exists
		if(localStorage.getItem("autoClosePopup")) {
			var autoClosePopup_stored = localStorage.getItem("autoClosePopup");

			if (autoClosePopup_stored === null) {
				// default to true
				$('#autoClosePopup').prop("checked", true);
			} else {
				// alert(autoClosePopup_stored);
				if (autoClosePopup_stored === "false") {
					// alert("here, in my false");
					$("#autoClosePopup").prop("checked", false);
				} else {
					$("#autoClosePopup").prop("checked", true);
				}
			}
		} else {
			$("#autoClosePopup").prop("checked", true);
		}
	});

	$('#save_options').submit(function(){
		var bookmarkKeyChar = $('#bookmarkKeyChar').val(),
			bookmarkSpecialKey = $('#bookmarkSpecialKey').val();

			if ($("input#autoClosePopup").is(":checked")) {
				autoClosePopup = "true";
			} else {
				autoClosePopup = "false";
			}

		localStorage.setItem("bookmarkKeyChar", bookmarkKeyChar);
		localStorage.setItem("bookmarkSpecialKey", bookmarkSpecialKey);
		localStorage.setItem("autoClosePopup", autoClosePopup);

		// console.log("autoClosePopup: " + autoClosePopup);

		if(!localStorage.getItem("bookmarkKeyChar")) {
			$('.message').html('<p class=\"fail\">Please enter a Keyboard shortcut</p>');
		} else {
			$('.message').html('<p class=\"success\">Keyboard shortcut now set to <strong>' + localStorage.getItem("bookmarkSpecialKey") + ' ' + localStorage.getItem('bookmarkKeyChar') + '</strong><br /><small>Open tabs require a refresh</small>');
		}

		return false;
	});

	$("#bookmarkKeyChar").keyup(function() {
		var len = $(this).val().length;
		if (len > 1) {
			$(this).val($(this).val().substr(len - 1, 1));
		}
		$(this).val($(this).val().toUpperCase());
	});
});