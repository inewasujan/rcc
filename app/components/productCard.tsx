"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Box,
} from "@mui/material";
import Link from "next/link";

type ProductCardProps = {
  id: number;
  title: string;
  price: number;
  image: string;
  isSelected?: boolean;
  onClick?: () => void;
};

export default function ProductCard({
  id,
  title,
  price,
  image,
  isSelected = false,
  onClick,
}: ProductCardProps) {
  return (
    <Card
      onClick={onClick}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        border: isSelected ? "1px solid #1976d2" : "1px solid #ccc",
        boxShadow: "none",
      }}
    >
      <CardActionArea sx={{ flexGrow: 1 }}>
        {/* Image Box */}
        <Box
          sx={{
            height: 275,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 4,            
            margin: 2,
            // transition: "transform 0.3s ease",
            // "&:hover": {
            //   transform: "scale(1.05)",              
            // },
          }}
        >
          <CardMedia
            component="img"
            image={image}
            alt={title}
            sx={{
              maxHeight: "100%",
              maxWidth: "100%",
              objectFit: "contain",
            }}
          />
        </Box>

        {/* Card Content */}
        <CardContent sx={{ padding: 1 }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontSize: 18, fontWeight: 400, lineHeight: 1.2}}
          >
            {title}
          </Typography>
          <Typography fontSize={20} fontWeight={800}>
            ${price.toFixed(2)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
