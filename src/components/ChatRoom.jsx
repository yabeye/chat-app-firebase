import { useEffect, useRef, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';

function ChatRoom({ firebase, firestore, auth, user }) {
  const scrollPlaceHolder = useRef();
  const messageRef = firestore.collection('messages');
  const query = messageRef.orderBy('createdAt', 'desc').limit(25);
  const [messages] = useCollectionData(query);
  const [formValue, setFormValue] = useState('');

  useEffect(() => {
    scrollPlaceHolder.current.scrollIntoView({
      behavior: 'smooth',
    });
  });

  const sendMessage = async (e) => {
    e.preventDefault();

    if (formValue.trim() === '') return;

    const { uid, photoURL } = auth.currentUser;

    await messageRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid: uid,
      photoURL: photoURL,
    });

    setFormValue('');
  };

  return (
    <>
      <main>
        {messages && messages.length === 0 && (
          <p style={{ color: 'white' }}>Write the first message!</p>
        )}
        {messages &&
          messages
            .reverse()
            .map((message) => (
              <ChatMessage
                key={message.createdAt}
                user={user}
                message={message}
                currentUser={auth.currentUser}
              />
            ))}
        <div ref={scrollPlaceHolder}></div>
      </main>
      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          placeholder="say something nice"
          onChange={(e) => setFormValue(e.target.value)}
        />
        <button type="submit">🚀</button>
      </form>
    </>
  );
}

function ChatMessage(props) {
  const { text, createdAt, photoURL, uid } = props.message;
  const { currentUser } = props;

  const messageClass = currentUser.uid === uid ? 'sent' : 'received';
  var formattedTime = 'just now';
  if (createdAt) {
    const date = new Date(createdAt.seconds * 1000);
    var hours = date.getHours();
    var minutes = '0' + date.getMinutes();
    formattedTime =
      hours +
      ':' +
      minutes.slice(-2) +
      ' ' +
      date.getDate() +
      ',' +
      date.toLocaleString('default', { month: 'long' }).substring(0, 3) +
      date.getFullYear().toString().slice(-2);
  }

  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} alt={'Pf'} />
      <div className="message-group">
        <p className="text">{text}</p>
        <p className="timestamp">{formattedTime}</p>
      </div>
    </div>
  );
}

export default ChatRoom;
