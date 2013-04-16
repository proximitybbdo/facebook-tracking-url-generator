window.FBT ?= {
  Events: {},
}

class FBT.Site
  result = ''

  constructor: ->
    @init_events()

  init_events: ->
    $(document).on 'goto', @goto

    $('form').on 'submit', {ref: @}, @submit_form

  validate: () ->
    true

  submit_form: (e) ->
    e.preventDefault()

    that = e.data.ref
    that.generate_url() if that.validate()

    false

  generate_url: () ->
    base_url = @fetch('url')
    base_url += "?app_data="

    url = "{"
    url += '"utm_source":"' + @fetch('source') + '",'
    url += '"utm_medium":"' + @fetch('medium') + '",'
    url += '"utm_campaign":"' + @fetch('campaign') + '"'
    url += "}"

    url = encodeURIComponent(url)
    result = base_url + url

    $('#result').hide()
    $('#result').val(result)

    @start_progress()

  fetch: (id) ->
    $("##{id}").val()

  start_progress: () ->
    $('.progress').show()
    $('.progress .bar').css('width', '80%')

    $('.progress .bar').animate({
      width: '100%'
      }, 500, () =>
        $('.progress').hide()

        $('#result').fadeIn()
      )

$(document).ready ->
  window.site = new FBT.Site()
