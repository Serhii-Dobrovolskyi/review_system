import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Rating,
  Stack,
} from "@mui/material";

type TReviewFormProps = {
  onAddReview: (review: {
    user: string;
    comment: string;
    rating: number;
  }) => void;
}

const ReviewForm: React.FC<TReviewFormProps> = ({ onAddReview }) => {
  const [user, setUser] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !comment || rating === null) return;

    onAddReview({ user, comment, rating });
    setUser("");
    setComment("");
    setRating(5);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} mb={4}>
      <Typography variant="h6" gutterBottom>
        Add a Review
      </Typography>
      <Stack spacing={2}>
        <TextField
          label="Your Name"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Your Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          multiline
          rows={4}
          fullWidth
          required
        />
        <Box>
          <Typography component="legend">Rating</Typography>
          <Rating
            value={rating}
            onChange={(e, newValue) => setRating(newValue)}
          />
        </Box>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Stack>
    </Box>
  );
};

export default ReviewForm;
