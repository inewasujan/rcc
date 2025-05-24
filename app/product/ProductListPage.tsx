"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );

  // Safe query param parsing from URL (on client only)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const url = new URL(window.location.href);
    const pageParam = url.searchParams.get("page");
    const selectedParam = url.searchParams.get("selected");

    const pageFromUrl = pageParam ? parseInt(pageParam, 10) : null;
    const selectedFromUrl = selectedParam ? parseInt(selectedParam, 10) : null;

    const storedPage = parseInt(
      sessionStorage.getItem("currentPage") || "1",
      10
    );
    const storedSelected = parseInt(
      sessionStorage.getItem("selectedProductId") || "",
      10
    );

    setCurrentPage(pageFromUrl || storedPage || 1);
    setSelectedProductId(selectedFromUrl || storedSelected || null);
  }, []);

  useEffect(() => {
    sessionStorage.setItem("currentPage", currentPage.toString());
    if (selectedProductId) {
      sessionStorage.setItem("selectedProductId", selectedProductId.toString());
    } else {
      sessionStorage.removeItem("selectedProductId");
    }
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
    <Container sx={{ paddingY: 10, display: "flex", justifyContent: "center", flexDirection: "column"  }}>
      <Typography variant="h4" gutterBottom>
        Shop
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap", 
          gap: 1,         
        }}
      >
        {currentProducts.map((product) => (
          <Box
            key={product.id}
            sx={{
              flexBasis: {
                xs: "100%", // 1 column on extra-small screens
                sm: "100%", // 2 columns on small screens
                md: "32.5%", // 3 columns on medium and up
              },
              boxSizing: "border-box",
            }}
          >
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.image}
              title={product.title}
              price={product.price}
              isSelected={selectedProductId === product.id}
              onClick={() => handleProductClick(product.id)}
            />
          </Box>
        ))}
      </Box>

      <Box sx={{ marginTop: 4, display: "flex", alignItems: "center", gap: 2 }}>
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
         (Page {currentPage} of {totalPages})
      </Box>
    </Container>
  );
}
