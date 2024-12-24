import React, { useEffect, useState } from "react";
import { Container, Box, Typography, CssBaseline } from "@mui/material";
import ReviewList from "./components/ReviewList";
import ReviewForm from "./components/ReviewForm";

import { TReview } from "./types/review";

const App = () => {
  const [reviews, setReviews] = useState<TReview[]>([]);

  const handleAddReview = (newReview: Omit<TReview, "id" | "date" | "user">) => {
    fetch("http://localhost:3000/", {
      method: "POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        comment: newReview.comment,
        rating: newReview.rating,
      }),
    })
      .then((response) => response.json())
      .then((review) => setReviews((prev) => [review, ...prev]));
  };
  useEffect(() => {
    fetch("http://localhost:3000/")
      .then((response) => response.json())
      .then((json) => setReviews(Object.values(json)));
  }, []);
  return (
    <Container maxWidth="md">
      <CssBaseline />
      <Box mt={4}>
        <Typography variant="h4" align="center" gutterBottom>
          Review System
        </Typography>
        <ReviewForm onAddReview={handleAddReview} />
        <ReviewList reviews={reviews} />
      </Box>
    </Container>
  );
};

export default App;
