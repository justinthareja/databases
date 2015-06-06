
var isInvalid = function (username, message) {
    return  !username || !message || !!username.match(/[^\w\s]/) || !!message.match(/[^\w\s]/);
}
var mostRecentMessage;

var app = {
  server: 'http://127.0.0.1:3000/classes/messages',
  init: function() {
    // assign event handlers to submit message
    $(document).on('ready', function () {

      $(".submit").on("click", function() {
        app.handleSubmit();
      });

      $("#chats").on("click", ".username", function() {
        app.addFriend(this);
      });

      // fetch messages, and re-fetch every 1 second
      app.fetch();
      // setInterval(app.fetch, 1000);
    });
  }, // end init function //
  send: function (message) {
      var valid = !isInvalid(message.username, message.text);
      if(valid) {
        $.ajax({
          // always use this url
          url: app.server,
          type: 'POST',
          data: JSON.stringify(message),
          contentType: 'application/json',
          success: function (data) {
            console.log('chatterbox: Message sent');
            $(".message").val("");
            $(".message").focus();
          },
          error: function (data) {
            // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
            console.error('chatterbox: Failed to send message');
          }
        });
      } else {
        alert('BAD! DON\'T YOU BE BAD!');
      }
  }, // end send function //
  fetch: function(timestamp) {
      console.log('refreshed');
      $.ajax({
        url: app.server,
        type:'GET',
        data: { roomname: 'room1' },
        contentType: 'application/json',
        success:function(data) {
          // data = JSON.parse(data);
          console.log(data);
          app.clearMessages();
          var results = data.results;
          for(var i=results.length-1; i > -1; i--) {
            var message = {
              username: results[i].username,
              text: results[i].text
            };
            app.addMessage(message);
          }
          if(results.length > 0) {
            mostRecentMessage = results[0].createdAt;
          }
        }
      });
    }, // end fetch function //
    clearMessages: function () {
      $('#chats').children().remove();
    },
    addMessage: function(message) {
      var valid = !isInvalid(message.username, message.text);
      if(valid) {
        var node = $('<div></div>');
        node.html("<span class='username'>" + message.username + "</span>" + ' : ' + "<span class='message'>" + message.text + "</span>");
        $('#chats').append(node);
      } else {
        console.log('BAD!: ' + message.username + ' ' + message.text);
      }
    },
    addRoom: function (lobbyName) {
      var node = $("<li>" + lobbyName + "</li>");
      $('#roomSelect').append(node);
    },
    addFriend: function(node) {
      $(node).css({
        "font-weight":"bold"
      })
    },
    handleSubmit: function() {
      var message = {
        'username': $(".name").val(),
        'text': $(".message").val(),
        'roomname': '4chan'
      };
      app.send(message);
    }

}  // end app

app.init();


