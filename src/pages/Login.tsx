import { useState, useRef } from "react";
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useHistory, Link } from "react-router-dom";

import supabase from "../config/supabaseClient";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [user, setUser] = useState<any>(null);
  const [loginError, setLoginError] = useState<string>("");

  const history = useHistory();

  const handleLogin = async (e: any) => {
    e.preventDefault();

    if (!email || !password) {
      setLoginError("Missing fields");
      return;
    }

    // Sign in with email
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setLoginError("Something went wrong");
      console.log(error);
    }

    if (data) {
      setLoginError("");
      setUser(data.user?.email);
      console.log(data);
      setEmail("");
      setPassword("");
      // Redirect to home page
    }
    if (data.user?.email != null) {
      localStorage.setItem("User", user);
      history.push("/home");
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Login Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Email</IonLabel>
                <IonInput
                  type="email"
                  value={email}
                  onIonChange={(e: any) => setEmail(e.detail.value!)}
                  placeholder="email@domain.com"
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Password</IonLabel>
                <IonInput
                  type="password"
                  value={password}
                  onIonChange={(e: any) => setPassword(e.detail.value!)}
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton onClick={handleLogin} expand="block">
                Login
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <p>
                Create a new account. <Link to="/register">Register</Link>{" "}
              </p>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Login;
