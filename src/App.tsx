import { useState } from "react";
import { Container, Box, Typography, CssBaseline } from "@mui/material";
import ReviewList from "./components/ReviewList";
import ReviewForm from "./components/ReviewForm";

import {TReview} from "./types/review"

const App = () => {
  const [reviews, setReviews] = useState<TReview[]>([]);

  const handleAddReview = (newReview: Omit<TReview, "id" | "date">) => {
    const reviewWithId: TReview = {
      ...newReview,
      id: `${Date.now()}`,
      date: new Date().toISOString(),
    };
    setReviews((prev) => [reviewWithId, ...prev]);
  };

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
