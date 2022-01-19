function SignUp({ firebase, auth }) {
  const signUpWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        color: 'white',
      }}
    >
      <h3>SignIn to continue!</h3>
      <button
        onClick={signUpWithGoogle}
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <img
          src={'https://freesvg.org/img/1534129544.png'}
          alt={'GoogleLogo'}
        />
        Continue with Google
      </button>
      <p>By signing in, you agreed to respect other group members.</p>
    </div>
  );
}

export default SignUp;
