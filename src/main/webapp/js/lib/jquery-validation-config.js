const jqueryValidateConfig = () => {
  function stripHtml(value) {
    // remove html tags and space chars
    return value.replace(/<.[^<>]*?>/g, ' ').replace(/&nbsp;|&#160;/gi, ' ')
      // remove numbers and punctuation
      .replace(/[0-9.(),;:!?%#$'"_+=\/-]*/g, '')
  }

  jQuery.validator.addMethod('lettersonly', function (value, element) {
    return this.optional(element) || /^[a-z\s]+$/i.test(value)
  }, 'Solo letras.')
  jQuery.validator.setDefaults({
    debug: true,
    ignore: 'input[type=hidden], .select2-search__field', // ignore hidden fields
    errorClass: 'validation-error-label',
    successClass: 'validation-valid-label',
    highlight: function (element, errorClass) {
      $(element).removeClass(errorClass)
    },
    unhighlight: function (element, errorClass) {
      $(element).removeClass(errorClass)
    },
    // Different components require proper error label placement
    errorPlacement: function (error, element) {

      // Styled checkboxes, radios, bootstrap switch
      if (element.parents('div').hasClass('checker') || element.parents('div').hasClass('choice') || element.parent().hasClass('bootstrap-switch-container')) {
        if (element.parents('label').hasClass('checkbox-inline') || element.parents('label').hasClass('radio-inline')) {
          error.appendTo(element.parent().parent().parent().parent())
        } else {
          error.appendTo(element.parent().parent().parent().parent().parent())
        }
      }

      // Unstyled checkboxes, radios
      else if (element.parents('div').hasClass('checkbox') || element.parents('div').hasClass('radio')) {
        error.appendTo(element.parent().parent().parent())
      }

      // Input with icons and Select2
      else if (element.parents('div').hasClass('has-feedback') || element.hasClass('select2-hidden-accessible')) {
        error.appendTo(element.parent())
      }

      // Inline checkboxes, radios
      else if (element.parents('label').hasClass('checkbox-inline') || element.parents('label').hasClass('radio-inline')) {
        error.appendTo(element.parent().parent())
      }

      // Input group, styled file input
      else if (element.parent().hasClass('uploader') || element.parents().hasClass('input-group')) {
        error.appendTo(element.parent().parent())
      } else {
        error.insertAfter(element)
      }
    }
  })
}

jqueryValidateConfig()