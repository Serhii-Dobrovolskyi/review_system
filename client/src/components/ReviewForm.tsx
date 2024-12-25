import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Rating,
  Stack,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { SERVICES } from "../constants/SERVICES";

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
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService || !comment || rating === null) {
      setError("Please fill in all fields, including selecting a rating.");
      return;
    }

    onAddReview({ service: selectedService, comment, rating });
    setError("");
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
          {SERVICES.map((service, index) => (
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
        {error && (
          <FormHelperText error sx={{ mt: 1, mb: 2 }}>
            {error}
          </FormHelperText>
        )}
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
