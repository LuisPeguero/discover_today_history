// GridComponent.tsx
import React from "react";
import { useEffect, useState } from "react";
import "./FeedsGrid.css";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonSkeletonText,
  IonIcon,
} from "@ionic/react";
import { flower, glasses } from "ionicons/icons";
interface GridComponentProps {
  feeds: any[] | null | undefined;
  loading: boolean;
  itemsPerPage: number;
}

export const FeedsGrid: React.FC<GridComponentProps> = ({
  feeds,
  loading,
  itemsPerPage,
}) => {
  const [readStatus, setReadStatus] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const savedStatus = localStorage.getItem("readStatus");
    if (savedStatus) {
      setReadStatus(JSON.parse(savedStatus));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("readStatus", JSON.stringify(readStatus));
  }, [readStatus]);

  return (
    <IonGrid>
      <IonRow className="feed-row">
        {loading
          ? [...Array(itemsPerPage)].map((_, index) => (
              <IonCol key={index}>
                <IonCard className="feed-card">
                  <IonSkeletonText
                    animated
                    style={{ width: "100%", height: "150px" }}
                  />
                  <IonCardHeader>
                    <IonCardTitle>
                      <IonSkeletonText animated style={{ width: "80%" }} />
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonSkeletonText animated style={{ width: "60%" }} />
                  </IonCardContent>
                </IonCard>
              </IonCol>
            ))
          : feeds?.map(
              (
                page: {
                  title: string;
                  thumbnail: { source: string | undefined };
                  extract: string;
                  content_urls: { desktop: { page: string } };
                  pageid: number;
                },
                pageIndex: any
              ) => (
                <IonCol key={`${page.pageid}-${pageIndex}`}>
                  <IonCard
                    key={`${page.pageid}-${pageIndex}`}
                    className="feed-card"
                    style={
                      readStatus[`${page.pageid}`]
                        ? { backgroundColor: "rgb(239 239 239 / 56%)" }
                        : {}
                    }
                  >
                    <img
                      src={
                        page.thumbnail?.source
                          ? page.thumbnail.source
                          : "https://ionicframework.com/docs/img/demos/card-media.png"
                      }
                      alt={page.title.replace(/_/g, " ")}
                    />
                    <IonCardHeader>
                      <IonCardTitle>
                        {page.title.replace(/_/g, " ").substring(0, 30)}
                      </IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      {page.extract.substring(0, 100) + "..."}
                    </IonCardContent>
                    <IonRow>
                      <IonButton
                        fill="clear"
                        onClick={() => {
                          window.open(page.content_urls.desktop.page);
                          setReadStatus({
                            ...readStatus,
                            [`${page.pageid}`]: true,
                          });
                        }}
                      >
                        Visit Wiki
                      </IonButton>
                      {readStatus[`${page.pageid}`] && (
                        <IonIcon
                          icon={glasses}
                          style={{ float: "right" }}
                          size="large"
                        />
                      )}
                    </IonRow>
                  </IonCard>
                </IonCol>
              )
            )}
      </IonRow>
    </IonGrid>
  );
};
