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
import { useHistory } from "react-router-dom";

const Home: React.FC = () => {
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
          <IonTitle>Welcome {localStorage.getItem("User")}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid>
          
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
