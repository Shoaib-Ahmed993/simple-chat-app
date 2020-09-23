let myName = prompt("Enter your name")

const sendMessage = () => {
    let message = document.getElementById('message').value
    firebase.database().ref('messages').push().set({
        'sender': myName,
        'message': message
    })
    return false
}
firebase.database().ref('messages').on('child_added', (data) => {
    let html = ""
    html += "<li id='message-" + data.key + "'>"

    if (data.val().sender == myName) {
        html += "<button data-id='" + data.key + "' onclick = 'deleteMessage(this)'>"
        html += "Delete"
        html += "</button>"
    }
    html += data.val().sender + ": " + data.val().message
    html += "</li>"
    document.getElementById('messages').innerHTML += html
})

const deleteMessage = (self) => {
    let messageId = self.getAttribute("data-id")
    firebase.database().ref('messages').child(messageId).remove()
}
firebase.database().ref('messages').on('child_removed', (data)=>{
    document.getElementById('message-'+ data.key).innerHTML = "This message has been deleted"
})