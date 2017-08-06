var socket = io();

function scrollToBottom() {
    // Selecctors
    var messages = $('#messages');
    var newMessage = messages.children('div:last-child'); 
    //Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }
};

////////////////////////////////////////////////////////////////

socket.on('connect', function()  {
    console.log('Connected to Server');
    var params = jQuery.deparam(window.location.search);

    socket.emit('join', params, function(err) {
        if(err) {
            alert(err)
            window.location.href = '/';
        } else {
            console.log('No error');
        }
    });
});

socket.on('disconnect', function() {
    console.log('unable to connect');
});

//////////////////////////////////////////////////

socket.on('updateUserList', function (users) {
    var ol = $('<ol></ol');

    users.forEach(function (user) {
        ol.append($('<li></li>').text(user));
    });

    $('#users').html(ol);
});

////////////////////////////////////////////////////

socket.on('statusMessage', function(mess) {
    var formattedTime = moment(mess.createdAt).format('h:mm a');
    var template= jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: mess.text,
        from: mess.from,
        createdAt: formattedTime
    });

    var div= jQuery('<div style="text-align: center"></div>');
    div.append(html);
    jQuery('#messages').append(div);
    scrollToBottom();
});

socket.on('newMessage', function(mess){
    var formattedTime = moment(mess.createdAt).format('h:mm a');
    var template= jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: mess.text,
        from: mess.from,
        createdAt: formattedTime
    });

    var div= jQuery('<div style="text-align: left; border: 2px solid none; border-radius: 12px; word-wrap: break-word; margin-bottom:10px" class="col-md-6"></div>');
    div.append(html);
    jQuery('#messages').append(div);
    scrollToBottom();
    /*
    var li = jQuery('<li></li>');
    li.text(`${mess.from} ${formattedTime}: ${mess.text}`);
    li.css("text-align","right");

    jQuery('#messages').append(li); 
    */
});

// For sender display

socket.on('newMessageForSender', function(mess){
    var formattedTime = moment(mess.createdAt).format('h:mm a');
    var template= jQuery('#message-template').html();

    var html = Mustache.render(template, {
        text: mess.text,
        from: mess.from,
        createdAt: formattedTime
    });

    var div= jQuery('<div style="text-align: right; border: 2px solid none; border-radius: 12px; word-wrap: break-word; margin-bottom:10px" class="col-md-6 offset-6"></div>');
    div.append(html);
    jQuery('#messages').append(div);
    scrollToBottom();
});

/*socket.on('newEmail', function(email) {
    console.log('new Email', email);
}); */

socket.on('newLocationMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#location-message-template').html();
    var html= Mustache.render(template,{
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    });

    var div= jQuery('<div style="text-align: left"></div>');
    div.append(html);
    jQuery('#messages').append(div);
    scrollToBottom();
    /*var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location</a>');

    li.text(`${message.from} ${formattedTime}: `);
    a.attr('href', message.url);
    li.append(a);

     jQuery('#messages').append(li); */ 
});

socket.on('newLocationMessageForSender', function(message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');  
    var template = jQuery('#location-message-template').html();
    var html= Mustache.render(template,{
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    });

    var div= jQuery('<div style="text-align: right"></div>');
    div.append(html);
    jQuery('#messages').append(div);
    scrollToBottom();
});

////////////////////////////////////////////////////////////////////////

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    var messageTextBox = jQuery('[name=message]');

    socket.emit('createMessage', {
        text: messageTextBox.val()
    }, function () {
        messageTextBox.val('');
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser!');
    }

    locationButton.attr('disabled', 'disabled').text('Sending ...');

    navigator.geolocation.getCurrentPosition(function(position) {
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function() {
        locationButton.removeAttr('disabled');
        alert('Unable to fetch location.');
    });
});