import { useCollectionData } from 'react-firebase-hooks/firestore';

function ChatRoom({ firebase, firestore, auth, user }) {
  console.log('User', user);
  const messageRef = firestore.collection('messages');
  const query = messageRef.orderBy('createdAt').limit(25);
  const [messages] = useCollectionData(query);

  return (
    <main>
      {messages &&
        messages.map((message) => (
          <ChatMessage key={message.createdAt} user={user} message={message} />
        ))}
    </main>
  );
}

function ChatMessage(props) {
  const { text, createdAt, photoURL } = props.message;
  console.log('message', props.message);
  return (
    <div>
      <img src={photoURL} alt={'P'} />
      <p>{text}</p>
      <p>{'11:46 AM'}</p>
    </div>
  );
}

export default ChatRoom;
