import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import { useAuthState } from 'react-firebase-hooks/auth';

import ChatRoom from './components/ChatRoom';
import SignUp from './components/SignUp';

import './App.css';

firebase.initializeApp({
  // your config.
});

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header">
        <h2>GroupyChat⚛️💬</h2>
        <SignOut auth={auth} />
      </header>
      <section className="App-main">
        {user ? (
          <ChatRoom
            firebase={firebase}
            firestore={firestore}
            auth={auth}
            user={user}
          />
        ) : (
          <SignUp firebase={firebase} auth={auth} />
        )}
      </section>
    </div>
  );
}

function SignOut({ auth }) {
  return (
    auth.currentUser && <button onClick={() => auth.signOut()}>SignOut</button>
  );
}
export default App;
