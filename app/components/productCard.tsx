'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Box,
} from '@mui/material';
import Link from 'next/link';

type ProductCardProps = {
  id: number;
  title: string;
  price: number;
  image: string;
  isSelected?: boolean;
  onClick?: () => void;
};

export default function ProductCard({ id, title, price, image, isSelected = false, onClick }: ProductCardProps) {
  return (
      <Card onClick={onClick}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 2,
          border: isSelected ? '2px solid #1976d2' : '1px solid #ccc',
          boxShadow: isSelected ? 4 : 1,
          transition: 'transform 0.3s ease, box-shadow 0.2s ease',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: 10,
          },
        }}
      >
        <CardActionArea sx={{ flexGrow: 1 }}>
          {/* Image Box */}
          <Box
            sx={{
              height: 275,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 2,
              borderTopLeftRadius: 4,
              borderTopRightRadius: 4,
            }}
          >
            <CardMedia
              component="img"
              image={image}
              alt={title}
              sx={{
                maxHeight: '100%',
                maxWidth: '100%',
                objectFit: 'contain',
              }}
            />
          </Box>

          {/* Card Content */}
          <CardContent sx={{ padding: 1 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontSize: 17, fontWeight: 400, lineHeight: 1.2 }}
            >
              {title}
            </Typography>
            <Typography color="red" fontWeight={600}>
              ${price.toFixed(2)}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>    
  );
}
