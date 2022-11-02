import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import app_config from "../../config";

const ManageReview = () => {

  const [reviewData, setReviewData] = useState([]);
  const url = app_config.url;
  const { id } = useParams();

  const getReviewDatafromBackend =  () => {
    fetch(url+'/reviewrating/getByuserId/'+id)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setReviewData(data);
      }
      );
  };

  useEffect(() => {
   getReviewDatafromBackend();
  }, [])
  
  const displayReview = () => {
    return (
      <div>
        <h1>Manage Review</h1>
      </div>
    );
  }

  return <div>

    {displayReview()}

  </div>;


};

export default ManageReview;
