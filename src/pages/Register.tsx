import { useState, useRef, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
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

import supabase from "../config/supabaseClient";

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [matchPassword, setMatchPassword] = useState<string>("");
  const [formError, setFormError] = useState<string>("");

  const history = useHistory();

  const handleSignup = async (e: any) => {
    e.preventDefault();

    if (!email || !password || !matchPassword) {
      setFormError("Missing fields");
      return;
    }

    if (password !== matchPassword) {
      setFormError("Not identical passwords");
      return;
    }

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setFormError("Something went wrong");
      console.log(error);
    }

    if (data) {
      setEmail("");
      setPassword("");
      setMatchPassword("");
      setFormError("");
      // Redirect to home page
      history.push("/login");
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Register Page</IonTitle>
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
                  onIonChange={(e: any) => setPassword(e.detail.value!)}
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Confirm Password</IonLabel>
                <IonInput
                  type="password"
                  onIonChange={(e: any) => setMatchPassword(e.detail.value!)}
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton onClick={handleSignup} expand="block">
                Sign Up
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <p>
                Already have an account? <Link to="/login">Login</Link>{" "}
              </p>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Register;
