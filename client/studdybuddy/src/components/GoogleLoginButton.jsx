import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { API_BASE_URL } from "../api";

function GoogleLoginButton({ onSuccess, onError }) {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      // Send user info to backend
      const res = await fetch(`${API_BASE_URL}/api/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          googleId: user.uid,
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        }),
      });
      const dbUser = await res.json();
      if (onSuccess) onSuccess(dbUser);
    } catch (error) {
      if (onError) onError(error);
    }
  };

  return (
    <button onClick={handleLogin} style={{ padding: '10px 20px', fontSize: '16px' }}>
      Sign in with Google
    </button>
  );
}

export default GoogleLoginButton; 