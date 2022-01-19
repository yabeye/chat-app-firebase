function SignUp({ firebase, auth }) {
  const signUpWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  return (
    <div>
      <p>Signup to continue!</p>
      <button onClick={signUpWithGoogle}>SignUpWithGoogle</button>
    </div>
  );
}

export default SignUp;
