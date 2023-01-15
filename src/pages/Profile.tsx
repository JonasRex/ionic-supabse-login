import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
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

const Profile: React.FC = () => {
  const history = useHistory();

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [age, setAge] = useState<number>();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("profiles")
      .update([{ firstName, lastName, age }])
      .eq("id", 1)
      .select();

    if (error) {
      console.log(error);
    }

    if (data) {
      history.push("/");
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select()
        .eq("id", 1) // Equal
        .single(); // Otherwise it returns array

      if (error) {
        //Nothing yet
      }

      if (data) {
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setAge(data.age);
      }
    };
    fetchProfile();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>BMI Calculator</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">First Name</IonLabel>
                <IonInput
                  type="text"
                  value={firstName}
                  onIonChange={(e: any) => setFirstName(e.detail.value!)}
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Last Name</IonLabel>
                <IonInput
                  type="text"
                  value={lastName}
                  onIonChange={(e: any) => setLastName(e.detail.value!)}
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Last Name</IonLabel>
                <IonInput
                  type="number"
                  value={age}
                  min={18}
                  max={120}
                  onIonChange={(e: any) => setAge(e.detail.value!)}
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton onClick={handleSubmit} expand="block">
                Update
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
