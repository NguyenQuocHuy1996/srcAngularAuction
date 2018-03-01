$(document).ready(function(){
  //Upload IMG
$('input[type=file]').on("change", function() {
  var $files = $(this).get(0).files;

  if ($files.length) {

    // Reject big files
    if ($files[0].size > $(this).data("max-size") * 1024) {
      alert("Vui lòng chọn hình ảnh có kích thước nhỏ hơn");
      return false;
    }

    // Begin file upload
    console.log("Đang tải ảnh lên");

    // Replace ctrlq with your own API key
    var apiUrl = 'https://api.imgur.com/3/image';
    var apiKey = 'faef2b533303522';

    var settings = {
      async: false,
      crossDomain: true,
      processData: false,
      contentType: false,
      type: 'POST',
      url: apiUrl,
      headers: {
        Authorization: 'Client-ID ' + apiKey,
        Accept: 'application/json'
      },
      mimeType: 'multipart/form-data'
    };

    var formData = new FormData();
    formData.append("image", $files[0]);
    settings.data = formData;

    // Response contains stringified JSON
    // Image URL available at response.data.link
    $.ajax(settings).done(function(response) {
      var obj = JSON.parse(response);
      var link = obj.data.link;
      $('#imgLink').val(link);
      $("#my_image").attr("src",link);
    });
  }
});
})
