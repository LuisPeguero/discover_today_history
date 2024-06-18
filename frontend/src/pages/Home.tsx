import {
  IonRow,
  IonCol,
  IonLabel,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonDatetimeButton,
  IonModal,
  IonDatetime,
  IonSelect,
  IonSelectOption,
  IonIcon,
} from "@ionic/react";
import { globeOutline } from "ionicons/icons";
import "./Home.css";
import { useGetFeed, useGetFeedTranslate } from "../hooks/useFeeds";
import { useState, useEffect } from "react";
import { FeedsGrid } from "../components/FeedsGrid";
import { Pagination } from "../components/Pagination";
import { Icon } from "ionicons/dist/types/components/icon/icon";

const Home: React.FC = () => {
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState<string>(today);
  const [language, setLanguage] = useState("en");
  const [toLanguage, setToLanguage] = useState("es");
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPosts, setCurrentPosts] = useState<any[]>([]);

  const {
    data: feeds,
    error: feedsError,
    loading: loading,
    refetch: refetchFeeds,
  } = useGetFeed(
    language,
    date.split("-")[0],
    date.split("-")[1],
    date.split("-")[2]
  );

  let indexOfLastPost: number;
  let indexOfFirstPost: number;

  // const { data: translatedFeeds, error: translatedFeedsError, refetch: refetchTranslatedFeeds } = useGetFeedTranslate(toLanguage, language, date.split('-')[0], date.split('-')[1], date.split('-')[2]); // Call the useGetFeedTranslate hook

  useEffect(() => {
    // Refetch the data when the date or language changes
    refetchFeeds();
    setCurrentPage(1);
    // refetchTranslatedFeeds();
  }, [date, language, toLanguage]);

  useEffect(() => {
    indexOfLastPost = currentPage * itemsPerPage;
    indexOfFirstPost = indexOfLastPost - itemsPerPage;
    if (feeds) setCurrentPosts(feeds.slice(indexOfFirstPost, indexOfLastPost));
  }, [feeds, currentPage, showModal, itemsPerPage]);

  return (
    <IonPage>
      <IonHeader collapse="fade">
        <IonToolbar>
          <IonIcon
            icon={globeOutline}
            slot="start"
            size="large"
            style={{ marginLeft: "20px" }}
          />
          <IonTitle>Discover a day in the history</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle>Discover a day in the history</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonRow>
          <IonCol>
            <IonRow className="date-filter">
              <IonLabel>Choose a date:</IonLabel>
              <IonDatetimeButton
                datetime="datetime"
                onClick={() => setShowModal(true)}
              ></IonDatetimeButton>
              <IonModal isOpen={showModal} keepContentsMounted={true}>
                <IonDatetime
                  presentation="date"
                  id="datetime"
                  value={date}
                  onIonChange={(e) => {
                    setShowModal(false);
                    setDate(e.detail.value!);
                  }}
                  onSelect={() => setShowModal(false)}
                ></IonDatetime>
              </IonModal>
            </IonRow>
          </IonCol>

          <IonCol>
            <IonRow className="filter">
              <IonLabel>Language:</IonLabel>
              <IonSelect
                value={language}
                onIonChange={(e) => setLanguage(e.detail.value)}
              >
                <IonSelectOption value="en">English</IonSelectOption>
                <IonSelectOption value="de">German</IonSelectOption>
                <IonSelectOption value="fr">French</IonSelectOption>
                <IonSelectOption value="sv">Swedish</IonSelectOption>
                <IonSelectOption value="pt">Portuguese</IonSelectOption>
                <IonSelectOption value="ru">Russian</IonSelectOption>
                <IonSelectOption value="es">Spanish</IonSelectOption>
                <IonSelectOption value="ar">Arabic</IonSelectOption>
                <IonSelectOption value="bs">Bosnian</IonSelectOption>
              </IonSelect>{" "}
            </IonRow>
          </IonCol>

          <IonCol>
            <IonRow className="filter">
              <IonLabel>Items per page:</IonLabel>
              <IonSelect
                value={itemsPerPage}
                onIonChange={(e) => setItemsPerPage(e.detail.value)}
              >
                <IonSelectOption value={5}>5</IonSelectOption>
                <IonSelectOption value={10}>10</IonSelectOption>
                <IonSelectOption value={20}>20</IonSelectOption>
                {/* Add more options as needed */}
              </IonSelect>{" "}
            </IonRow>
          </IonCol>
        </IonRow>

        <FeedsGrid
          feeds={currentPosts}
          loading={loading}
          itemsPerPage={itemsPerPage}
        />
        {feeds && (
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={feeds.length}
            paginate={setCurrentPage}
            currentPage={currentPage}
          />
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;
