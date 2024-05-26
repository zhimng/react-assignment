import { Box, CircularProgress } from "@mui/material";
import styles from "./Loading.module.css";

const Loading = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress className={styles.loading} />
    </Box>
  );
};

export default Loading