$(function(){
  
  function buildHTML(message){
    if (message.image){
      var html = `<div class="messages__lists lists">
                    <div class="lists__message_names names">
                      <div class="names__name">
                        ${message.user_name}
                      </div>
                      <div class="names__timestamp">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="lists__message">
                      <p class="lower-message__content">
                        ${message.body}
                      </p>
                      <img class="lower-message__image" src="${message.image}">
                    </div>
                  </div>`
    }else{
      var html = ` <div class="messages__lists lists">
                    <div class="lists__message_names names">
                      <div class="names__name">
                        ${message.user_name}
                      </div>
                      <div class="names__timestamp">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="lists__message">
                      <p class="lower-message__content">
                        ${message.body}
                      </p>
                    </div>
                  </div>`
    };
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType:'json',
      processData: false,
      contentType: false
    })
    .always(function(){
      $('.submit_btn').prop('disabled', false);
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('form')[0].reset();
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    });
  })
});