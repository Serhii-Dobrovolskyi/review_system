import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Rating,
  Divider,
} from "@mui/material";
import { TReview } from "../types/review";

type TReviewListProps = {
  reviews: TReview[];
};

const ReviewList: React.FC<TReviewListProps> = ({ reviews }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Reviews
      </Typography>
      {reviews.length === 0 ? (
        <Typography color="text.secondary">
          No reviews yet. Be the first!
        </Typography>
      ) : (
        reviews.map((review) => (
          <Card key={review.id} variant="outlined" sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold">
                {review.user}
              </Typography>
              <Typography variant="subtitle1" color="text.primary">
                Service: {review.service}
              </Typography>
              <Rating value={review.rating} readOnly />
              <Typography variant="body2" mt={1}>
                {review.comment}
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="caption" color="text.secondary">
                {new Date(review.date).toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default ReviewList;
