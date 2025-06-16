import { useEffect, useState } from "react";
import axios from "axios";
import { useTheme, Box, Typography } from "@mui/material";
import { tokens } from "../../themes";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import DownloadIcon from "@mui/icons-material/Download";
import { CSVLink } from "react-csv";
import IconButton from "@mui/material/IconButton";

const UserColoums = [
  {
    field: "Time",
    headerName: "Time",
    type: "string",
    headerAlign: "left",
    align: "left",
    flex: 1,
  },
  {
    field: "Temperature_C",
    headerName: "Temperature(°C)",
    type: "number",
    headerAlign: "left",
    align: "left",
  },
  {
    field: "Humidity_percent",
    headerName: "Humidity(%)",
    type: "number",
    headerAlign: "left",
    align: "left",
  },
  {
    field: "TVOC_ppb",
    headerName: "TVOC(ppb)",
    type: "number",
    headerAlign: "left",
    align: "left",
  },
  {
    field: "eCO2_ppm",
    headerName: "eCO2(ppm)",
    type: "number",
    headerAlign: "left",
    align: "left",
  },
  {
    field: "Raw_H2",
    headerName: "Raw H2",
    type: "number",
    headerAlign: "left",
    align: "left",
  },
  {
    field: "Raw_Ethanol",
    headerName: "Raw Ethanol",
    type: "number",
    headerAlign: "left",
    align: "left",
  },
  {
    field: "Pressure_hPa",
    headerName: "Pressure(hPa)",
    type: "number",
    headerAlign: "left",
    align: "left",
  },
];

const SensTable = () => {
  const [data, setData] = useState([]);
  const getData = async () => {
    await axios.get("http://localhost:8081/").then((response) => {
      setData(response.data);
    });
  };
  useEffect(() => {
    getData();
  }, []);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Sensor Data" subtitle="Air Analasys"></Header>
        <Box display="flex" alignItems="center">
          <CSVLink
            data={data}
            filename={"sensor_data.csv"}
            style={{
              textDecoration: "none",
            }}
          >
            <IconButton>
              <DownloadIcon fontSize="large" />
            </IconButton>
          </CSVLink>
        </Box>
      </Box>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          getRowId={(row) => row.UTC}
          rows={data}
          columns={UserColoums}
        />
      </Box>
    </Box>
  );
};

export default SensTable;
