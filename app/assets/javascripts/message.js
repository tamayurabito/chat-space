$(function(){

  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    var last_message_id = $('.messages__lists:last').data("message-id");
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        //追加するHTMLの入れ物を作る
        var insertHTML = '';
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        //メッセージが入ったHTMLに、入れ物ごと追加
        $('.messages').append(insertHTML);
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  
  function buildHTML(message){
    if (message.image){
      var html = `<div class="messages__lists lists" data-message-id=${message.id}>
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
      var html = ` <div class="messages__lists lists" data-message-id=${message.id}>
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
  //$(function(){});の閉じタグの直上(処理の最後)に以下のように追記
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});
