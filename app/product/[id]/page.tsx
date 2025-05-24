"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useGetProductByIdQuery } from "@/app/lib/productsApi";
import {
  Box,
  Button,
  Container,
  Select,
  OutlinedInput,
  MenuItem,
  SelectChangeEvent,
  Typography,
  CircularProgress,
  Paper,
  useTheme,
} from "@mui/material";

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250,
    },
  },
};

const numbers = ["1", "2", "3", "4", "5", "6"];

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const productId = parseInt(id as string, 10);
  const { data: product, error, isLoading } = useGetProductByIdQuery(productId);

  const [backPage, setBackPage] = useState("1");
  const [selected, setSelected] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    const storedPage = sessionStorage.getItem("currentPage") || "1";
    const storedSelected = sessionStorage.getItem("selectedProductId") || "";
    setBackPage(storedPage);
    setSelected(storedSelected);
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setQuantity(event.target.value);
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={8}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !product) {
    return (
      <Container maxWidth="md" sx={{ mt: 8 }}>
        <Typography variant="h6" color="error">
          Product not found.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Button
        onClick={() => router.push(`/?page=${backPage}&selected=${selected}`)}
        sx={{ mb: 3 }}
      >
        ← Back to Product List
      </Button>

      <Paper
        sx={{
          padding: 4,
          boxShadow: "none",
          border: "1px solid #ccc",
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row",
          },
          alignItems: {
            xs: "center",
            md: "flex-start",
          },
          gap: 4,
        }}
      >
        <Box
          component="img"
          src={product.image}
          alt={product.title}
          sx={{
            maxWidth: {
              xs: "100%",
              md: "40%",
            },
            maxHeight: 400,
            objectFit: "contain",
            borderRadius: 4,
            width: "100%",
          }}
        />
        <Box sx={{ flex: 1 }}>
          <Typography
            sx={{ letterSpacing: -1, fontWeight: 600 }}
            variant="h4"
            gutterBottom
          >
            {product.title}
          </Typography>
          <Typography variant="h6" fontWeight={800} gutterBottom>
            ${product.price.toFixed(2)}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            ⭐⭐⭐ {product.rating?.rate} ({product.rating?.count} reviews)
          </Typography>

          {/* Quantity and Add to Cart Section */}
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                sm: "row",
              },
              alignItems: {
                xs: "stretch",
                sm: "center",
              },
              gap: 2,
              mb: 2,
            }}
          >
            <Select
              displayEmpty
              value={quantity}
              onChange={handleChange}
              input={<OutlinedInput />}
              renderValue={(selected) => {
                if (!selected) {
                  return <em>Select Quantity</em>;
                }
                return selected;
              }}
              MenuProps={MenuProps}
              inputProps={{ "aria-label": "Without label" }}
              sx={{
                height: 50,
                minWidth: 150,
              }}
            >
              <MenuItem disabled value="">
                <em>Select Quantity</em>
              </MenuItem>
              {numbers.map((num) => (
                <MenuItem key={num} value={num}>
                  {num}
                </MenuItem>
              ))}
            </Select>

            <Button
              variant="contained"
              sx={{
                height: 50,
                whiteSpace: "nowrap",
              }}
            >
              Add to Cart
            </Button>
          </Box>

          <Typography variant="body1">
            <strong>Description:</strong> {product.description}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
