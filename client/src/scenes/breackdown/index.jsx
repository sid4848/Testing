import React from "react";
import { Box } from "@mui/material";
import Header from "components/Header";
import BreakDownChart from "components/BreakDownChart";

const Breackdown = () => {
  return (
    <Box m="1.5rem 2.5rem">
      <Header titel="Breakdown" subtitle="Breackdown of Sales by category" />
      <Box mt="40px" height="75vh">
        <BreakDownChart />
      </Box>
    </Box>
  );
};

export default Breackdown;
