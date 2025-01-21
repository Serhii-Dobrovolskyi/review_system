import { useEffect, useState } from "react";
import { Container, Box, Typography, CssBaseline } from "@mui/material";
import ReviewList from "./components/ReviewList";
import ReviewForm from "./components/ReviewForm";
import { TReview } from "./types/review";

const App = () => {
  const [reviews, setReviews] = useState<TReview[]>([]);

  const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:3000'
  const handleAddReview = async (
    newReview: Omit<TReview, "id" | "date" | "user">
  ) => {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment: newReview.comment,
        rating: newReview.rating,
        service: newReview.service,
      }),
    });
    const review = await response.json();
    setReviews((prev) => [review, ...prev]);
  };
  useEffect(() => {
    const fetchReviews = async () => {
      const response = await fetch(baseUrl);
      const json = await response.json();
      setReviews(Object.values(json));
    };
    fetchReviews();
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
