  $('#user-search-field').on("keyup", function(){
    var input = $("#user-search-field").val();
    // console.log(input);
    $.ajax({
      type: "GET",
      url: "/users",
      data: { keyword: input },
      dataType: "json"
    })
      $("#user-search-result").empty();
