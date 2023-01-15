import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import supabase from "../config/supabaseClient";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";

const Home: React.FC = () => {
  const [user, setUser] = useState<any>(localStorage.getItem("user"));
  const history = useHistory();

  const handleLogout = async (e: any) => {
    supabase.auth.signOut();
    localStorage.removeItem("User");
    history.push("/login");
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Welcome</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid>
          {!user ? (
            <IonRow>
              <IonCol>
                <IonButton href="/login" expand="block">
                  Login
                </IonButton>
              </IonCol>
            </IonRow>
          ) : (
            <div>DONT WORK..</div>
          )}
          <IonRow>
            <IonCol>
              <IonButton onClick={handleLogout} expand="block">
                Logout
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
