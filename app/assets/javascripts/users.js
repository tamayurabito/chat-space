$(function(){
  function addUser(user) {
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${user.name}</p>
        <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
      </div>
    `;
    $("#user-search-result").append(html);
  }
  function addNoUser() {
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">ユーザーが見つかりません</p>
      </div>
    `;
    $("#user-search-result").append(html);
  }
  $('#user-search-field').on("keyup", function(){
    var input = $("#user-search-field").val();
    // console.log(input);
    $.ajax({
      type: "GET",
      url: "/users",
      data: { keyword: input },
      dataType: "json"
    })
    .done(function(users) {
      $("#user-search-result").empty();

      if (users.length !== 0) {
        users.forEach(function(user) {
          addUser(user);
        });
      } else if (input.length == 0) {
        return false;
      } else {
        addNoUser();
      }
    })
    .fail(function() {
      alert("通信エラーです。ユーザーが表示できません。");
    });
  });

  function  addDeleteUser(name, id){
    var html = `
            <div class='chat-group-user'>
              <input name='group[user_ids][]' type='hidden' value=${id}>
              <p class='chat-group-user__name'>${name}</p>
              <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
            </div>
            `
    $(".js-add-user").append(html)
  }
  
  function addMember(id){
    let html = `<input value="${userId}" name="group[user_ids][]" type="hidden" id="group_user_ids_${userId}" />`;
    $(`#${userId}`).append(html);
  }


  $("#user-search-result").on("click",".chat-group-user__btn--add",function(){
    // console.log("追加ボタンが押された")
    var userName = $(this).data('user-name');
    // console.log(userName)
    var userId = $(this).data('user-id');
    // console.log(userId)
    var aaa = $(this).parent();
    // console.log(aaa)
    $(aaa).remove();
    addDeleteUser(userName, userId);
    addMember(userID);
  });

  $("#chat-group-users").on("click", ".js-remove-btn", function(){
    var abc = $(this).parent();
    $(abc).remove();
  });
});