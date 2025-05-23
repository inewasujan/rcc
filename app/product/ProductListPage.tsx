"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useGetProductsQuery } from "../lib/productsApi";
import ProductCard from "../components/productCard";
import {
  Container,
  Typography,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";

const PPR = 5; // Products per page

export default function ProductListPage() {
  const { data: products, error, isLoading } = useGetProductsQuery();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );

  // Load from searchParams OR fallback to localStorage
  useEffect(() => {
    const pageParam = searchParams.get("page");
    const selectedParam = searchParams.get("selected");

    const pageFromUrl = pageParam ? parseInt(pageParam, 10) : null;
    const selectedFromUrl = selectedParam ? parseInt(selectedParam, 10) : null;

    const storedPage = parseInt(localStorage.getItem("currentPage") || "1", 10);
    const storedSelected = parseInt(localStorage.getItem("selectedProductId") || "", 10);

    // const storedPage = parseInt(
    //   sessionStorage.getItem("currentPage") || "1",
    //   10
    // );
    // const storedSelected = parseInt(
    //   sessionStorage.getItem("selectedProductId") || "",
    //   10
    // );

    setCurrentPage(pageFromUrl || storedPage || 1);
    setSelectedProductId(selectedFromUrl || storedSelected || null);
  }, [searchParams]);

  useEffect(() => {
    localStorage.setItem("currentPage", currentPage.toString());
    if (selectedProductId) {
      localStorage.setItem("selectedProductId", selectedProductId.toString());
    } else {
      localStorage.removeItem("selectedProductId");
    }
    
    // sessionStorage.setItem("currentPage", currentPage.toString());
    // if (selectedProductId) {
    //   sessionStorage.setItem("selectedProductId", selectedProductId.toString());
    // } else {
    //   sessionStorage.removeItem("selectedProductId");
    // }
  }, [currentPage, selectedProductId]);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={8}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !products) {
    return <Typography>Failed to load products.</Typography>;
  }

  const totalPages = Math.ceil(products.length / PPR);
  const startIndex = (currentPage - 1) * PPR;
  const currentProducts = products.slice(startIndex, startIndex + PPR);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    setSelectedProductId(null);
    router.push(`/?page=${newPage}`);
  };

  const handleProductClick = (productId: number) => {
    setSelectedProductId(productId);
    router.push(
      `/product/${productId}?page=${currentPage}&selected=${productId}`
    );
  };

  return (
    <Container sx={{ paddingY: 20 }}>
      <Typography variant="h4" gutterBottom>
        Product List (Page {currentPage} of {totalPages})
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "1fr 1fr 1fr",
            lg: "1fr 1fr 1fr 1fr",
            xl: "1fr 1fr 1fr 1fr 1fr",
          },
          gap: 2,
        }}
      >
        {currentProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            image={product.image}
            title={product.title}
            price={product.price}
            isSelected={selectedProductId === product.id}
            onClick={() => handleProductClick(product.id)}
          />
        ))}
      </Box>

      <Box sx={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        <Button
          variant="contained"
          onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
        >
          ⬅ Previous
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            handlePageChange(Math.min(currentPage + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next ➡
        </Button>
      </Box>
    </Container>
  );
}
