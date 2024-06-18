import React from "react";
import { IonButton, IonGrid, IonRow, IonCol, IonIcon } from "@ionic/react";
import { arrowBack, arrowForward } from "ionicons/icons";

interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  itemsPerPage,
  totalItems,
  paginate,
  currentPage,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  let start = currentPage - 2;
  if (start < 1) {
    start = 1;
  }

  let end = start + 4;
  if (end > totalPages) {
    end = totalPages;
    if (end - 4 > 0) {
      start = end - 4;
    }
  }

  const visiblePageNumbers = pageNumbers.slice(start - 1, end);

  const handleBack = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  const handleForward = () => {
    if (currentPage < totalPages) {
      paginate(currentPage + 1);
    }
  };

  return (
    <IonGrid>
      <IonRow className="ion-justify-content-center">
        <IonCol size="auto">
          <IonButton
            fill="clear"
            disabled={currentPage === 1}
            onClick={handleBack}
          >
            <IonIcon icon={arrowBack} />
          </IonButton>
        </IonCol>
        {visiblePageNumbers.map((number) => (
          <IonCol size="auto" key={number}>
            <IonButton
              fill={currentPage === number ? "solid" : "clear"}
              onClick={() => paginate(number)}
            >
              {number}
            </IonButton>
          </IonCol>
        ))}
        <IonCol size="auto">
          <IonButton
            fill="clear"
            disabled={currentPage === totalPages}
            onClick={handleForward}
          >
            <IonIcon icon={arrowForward} />
          </IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};
