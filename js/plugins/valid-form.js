jQuery(document).ready(function($) {
	jQuery(document).ready(function($) {
		$(function (){
			$('.valid-form').each(function(index, el) {
				$(this).validForm({
					serch_in: 'form',
				});
			});
		})
	});
});
/*
	field value:
	1) data-valid - required value
		data-error-empty="The field must be filled"
	2) data-test="text" - checking for correct input, possible values: (text, first-last-name, email, number)
		data-error-input="field is incorrect"
	3) data-concurrences="password" - The fields do not match
		data-error-concurrences="the fields do not match"
	4) data-minlength="6" - check for minimum characters
		data-error-minlength="Minimum number of characters 6"
	------------------------------Simples-------------------------------
	<label>
		<input type="text"
			data-valid
			data-test="text"
			data-error-empty="The field must be filled"
			data-error-input="The field was filled incorrectly"
		>
	</label>
	<label>
		<input type="checkbox"
		data-valid
		data-error-empty="You must select a checkbox"
		>
	</label>
	<label>
		<select
		data-valid
		data-error-empty="You must select from the list"
		>
			<option>
				1
			</option>
			<option>
				2
			</option>
			<option>
				3
			</option>
		</select>
	</label>
	<label>
		<input type="password"
			data-valid
			data-minlength="6"
			data-error-concurrences="The fields do not match"
			data-error-minlength="Minimum number of characters 6"
		>
	</label>
*/

;(function($) {
	var defaults = {
		serch_in: 'form', // where to search (locally for example in an .item or globally in your form)
		error_empty: 'defaulr text empty', // default text if input is empty (value for input in html "data-error-empty")
		error_checkbox: 'defaulr text eroor checkbox', // the default text in checkbox (value for input in html "data-error-empty")
		error_select: 'defaulr text eroor select', // the default text in select (value for input in html "data-error-empty")
		error_valid: 'defaulr text eroor input', // default text if text in input is not valid (value for input in html "data-error-input")
		error_concurrences: 'defaulr text eroor concurrences', // the default value if the fields do not match (value for input in html "data-concurrences")
		error_minlength: 'minimum number of characters 6', // the default text in min length (value for input in html "data-error-minlength")
	};
	function ValidForm(element, options){
		this.config = $.extend({}, defaults, options);
		this.element = element;
		this.init();
	}
	ValidForm.prototype.init = function(){
		// this element
		th = this.element;
		// this config
		this_config = this.config
		/*input entering text into the input/textarea*/
		th.find('label input, label textarea').focus(function(event) {
			$(this).parents('label').removeClass('error-label').find('.error-span').remove();
			$(this).parents(this_config.serch_in).removeClass('error-block');
		});
		th.find('label input, label textarea').focusout(function(event) {
			var t_v = $.trim($(this).val());
			$(this).val(t_v);
		});
		// do not valid the form with html
		th.attr('novalidate', 'novalidate');
		/*---click sumbmit---*/
		th.find('.submit input, .submit button').click(function(event) {
			// fucton for error
			function error_function (th_el, data_text_error, text_error_default) {
				// add error class for label
				th_el.addClass('error-label');
				// find text in data-error-empty
				var d_e = th_el.find('input, select, textarea').attr(data_text_error);
				// if label has not data-error-empty then add default text
				if(d_e == undefined) th_el.append('<span class="error-span">' + text_error_default + '</span>');
				// if label has default text then we take the text from this data
				else th_el.append('<span class="error-span">' + d_e + '</span>');
				// add eroor class from parents element (form or cactom class)
				th_el.parents(this_config.serch_in).addClass('error-block');
			}

			$(this).parents(this_config.serch_in).find('label').each(function(index, el) {
				// default for click
				$(this).find('.error-span').remove();
				$(this).removeClass('error-label');

				// check for empty field
				var h_d = $(this).find('input, textarea, select').attr('data-valid');
				if(h_d != undefined){
					// input
					if($.trim($(this).find('input, textarea').val()) == '') error_function($(this), 'data-error-empty', this_config.error_empty);
					// checkbox
					if($(this).find('input[type="checkbox"]').prop('checked') == false) error_function($(this), 'data-error-empty', this_config.error_checkbox);
					// select
					if($(this).find('select').length > 0){
						$(this).removeClass('error-label').find('.error-span').remove();
						if($(this).find('select option:first-child').is(':selected') == true || $(this).find('select').val() == null) error_function($(this), 'data-error-empty', this_config.error_select);
					}
				}
				// check for correct input
				var d_t = $(this).find('input, textarea').attr('data-test');
				var th_val = $(this).find('input, textarea').val();
				if(d_t != undefined && $.trim(th_val) != ''){
					var result;
					// text input
					if(d_t == 'text'){
						result = th_val.match('^[а-яА-ЯёЁa-zA-Z ]+$');
					}
					// first/last name
					if(d_t == 'first-last-name'){
						result = th_val.match('^[а-яА-ЯёЁa-zA-Z ]+ [а-яА-ЯёЁa-zA-Z ]+$');
					}
					// email input
					if(d_t == 'email'){
						result = th_val.match('^[a-za-zA-Z0-9][-_.a-za-zA-Z0-9]+@(?:[a-za-zA-Z0-9][-a-za-zA-Z0-9]+\.)+[a-zA-Z]{2,}$');
					}
					// number input
					if(d_t == 'number'){
						result = th_val.match('^[0-9 ]+$');
					}
					if(result == null) error_function ($(this), 'data-error-input', this_config.error_valid);
				}
				// check for minimum characters
				var d_m = $(this).find('input, textarea').attr('data-minlength');
				if(d_m != undefined && $(this).hasClass('error-label') == false){
					if($(this).find('input').val().length < d_m) error_function($(this), 'data-error-minlength', this_config.error_minlength);
				}
			});
			/*concurrences input*/
			$('input[data-concurrences]').each(function(index, el) {
				var th_val = $(this).val();
				var th_attr = $(this).attr('data-concurrences');
				var val_valid = $('input[data-concurrences=' + th_attr + ']').val();
				if($('input[data-concurrences=' + th_attr + ']').parents('label').hasClass('error-label') == true) return false;
				if(val_valid != th_val){
					$('input[data-concurrences=' + th_attr + ']').parents('label').each(function(index, el) {
						error_function ($(this), 'data-error-concurrences', this_config.error_concurrences);
					});
				}
			});
			// fuctoin event click
			$(this).parents(this_config.serch_in).find('label').each(function(index, el) {
				if($(this).hasClass('error-label') == true){
					event.preventDefault();
					return false;
				}
			});
		});
	}
	$.fn.validForm = function(options){
		new ValidForm(this.first(), options);
		return this.first()
	};
}(jQuery));