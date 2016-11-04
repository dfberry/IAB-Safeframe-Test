window.onload = function() {
	// Get the window displayed in the iframe.
	var receiver = document.getElementById('receiver').contentWindow;
	var externalDomain = document.getElementById('externalDomain').value;
	var message = document.getElementById('message').value;

	console.log("externalDomain " + externalDomain);
	console.log("message " + message);

	// Get a reference to the 'Send Message' button.
	var btn = document.getElementById('send');

	// A function to handle sending messages.
	function sendMessage(e) {

		// Prevent any default browser behaviour.
		e.preventDefault();

		// Send a message with the text 'Hello Treehouse!' to the receiver window.
		receiver.postMessage(message, externalDomain);
	}

	// Add an event listener that will execute the sendMessage() function
	// when the send button is clicked.
	btn.addEventListener('click', sendMessage);
}
