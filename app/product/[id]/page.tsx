'use client';

import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useGetProductByIdQuery } from "@/app/lib/productsApi";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  CircularProgress,
  Paper,
} from "@mui/material";

export default function ProductDetailPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const productId = parseInt(id as string, 10);
  const { data: product, error, isLoading } = useGetProductByIdQuery(productId);

  const backPage = searchParams.get("page") || localStorage.getItem("currentPage") || "1";
  const selected = searchParams.get("selected") || localStorage.getItem("selectedProductId") || "";
  
  // const backPage = searchParams.get("page") || sessionStorage.getItem("currentPage") || "1";
  // const selected = searchParams.get("selected") || sessionStorage.getItem("selectedProductId") || "";

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
        variant="outlined"
        onClick={() => router.push(`/?page=${backPage}&selected=${selected}`)}
        sx={{ mb: 3 }}
      >
        ← Back to Product List
      </Button>

      <Paper elevation={3} sx={{ padding: 3 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={5}>
            <Box
              component="img"
              src={product.image}
              alt={product.title}
              sx={{
                width: "100%",
                maxHeight: 400,
                objectFit: "contain",
                borderRadius: 4,
              }}
            />
          </Grid>

          <Grid item xs={12} md={7}>
            <Typography variant="h4" gutterBottom>
              {product.title}
            </Typography>
            <Typography variant="h6" color="red" fontWeight={600} gutterBottom>
              ${product.price.toFixed(2)}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Rating:</strong> ⭐ {product.rating?.rate} ({product.rating?.count} reviews)
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              <strong>Description:</strong> {product.description}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
