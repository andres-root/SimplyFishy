$(document).ready(function(){
    //Connect to the socket server.
    var socket = io.connect('http://' + document.domain + ':' + location.port)
    socket.on('connect', function() {
        socket.emit('my_message', 'User connected!');
    });

    socket.on('float_sw', function(msg) {
         $('#floatsw_msg_'+msg.pin).html('<span>' + msg.data + '</span>');
         //console.log(msg.data + msg.pin)
     });

    //Setup interval to check temp every 5 seconds
    setInterval(function(){
        socket.emit('read_temp');
    }, 5000);

    socket.on('tempprobe_1', function(temp) {
        $('#tempprobe_1_temp').html(temp.data);
        //console.log(temp.data)
    });

});

function socket_onoff ( socket ) {

	var onOff = $('#button_'+socket).data('state');
	console.log(onOff);

	if (onOff=='0') {
		$.get("/"+socket+"/on");
		$('#button_'+socket).data('state', '1');
	}
	else if (onOff=='1') {
		$.get("/"+socket+"/off");
		$('#button_'+socket).data('state', '0');
	}

}

function addNoteData() {

    $("#addNote").on('submit', function (e) {
        e.preventDefault();

        var notedata = $(this).serialize();
        //console.log(notedata);

        $.post("actions.php?fn=addNote",notedata)
            .done(function( data ) {
                $('#addNoteSuccess').text(data);
                $('#addNoteSuccess').css("color", "green");
                $('#addNoteSuccess').css("float", "right");
                $('#notes').val('');
            });
    });

}

function deleteNote(id) {

    console.log(id);

    var answer = confirm('Are you sure you want to delete this note?');

    if ( answer ) {
        $.post("actions.php?fn=deleteNote&id="+id)
    }
}

function addTest() {

    $(".aT").on('click', function(e) {
        e.preventDefault();

        var testData = $('#testData').serialize();

        $.post("actions.php?action=add_test", testData)
            .done(function () {
                $("#testModal").modal('hide');
                location.reload(true);
            });
    });
}