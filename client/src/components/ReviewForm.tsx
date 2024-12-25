import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Rating,
  Stack,
  MenuItem,
} from "@mui/material";

const services = [
  "My service",
  "UX Design | UX Writing",
  "Sales Training in English",
  "How to make Indian Chai",
];

type TReviewFormProps = {
  onAddReview: (review: {
    service: string;
    comment: string;
    rating: number;
  }) => void;
};  

const ReviewForm: React.FC<TReviewFormProps> = ({ onAddReview }) => {
  const [selectedService, setSelectedService] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService || !comment || rating === null) return;

    onAddReview({ service: selectedService, comment, rating });
    setSelectedService("");
    setComment("");
    setRating(0);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} mb={4}>
      <Typography variant="h6" gutterBottom>
        Add a Review
      </Typography>
      <Stack spacing={2}>
        <TextField
          select
          label="Select a service"
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
          fullWidth
          required
          margin="normal"
        >
          {services.map((service, index) => (
            <MenuItem key={index} value={service}>
              {service}
            </MenuItem>
          ))}
        </TextField>
        <Box display="flex" alignItems="center" mb={2}>
        <Typography variant="body1" sx={{ mr: 2 }}>
          Rating:
        </Typography>
        <Rating
          value={rating}
          onChange={(_, newValue) => setRating(newValue)}
          precision={0.5}
        />
      </Box>
        <TextField
          label="Your Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          multiline
          rows={4}
          fullWidth
          required
        />
        {/* <Box>
          <Typography component="legend">Rating</Typography>
          <Rating
            value={rating}
            onChange={(_, newValue) => setRating(newValue)}
          />
        </Box> */}
        <Button
          sx={{ backgroundColor: "#AD8A1F" }}
          variant="contained"
          type="submit"
        >
          Submit
        </Button>
      </Stack>
    </Box>
  );
};

export default ReviewForm;
