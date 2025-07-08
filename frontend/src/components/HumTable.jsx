import axios from "axios";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme, Box } from "@mui/material";
import { tokens } from "../themes";
import DownloadIcon from "@mui/icons-material/Download";
import { CSVLink } from "react-csv";
import IconButton from "@mui/material/IconButton";

const HumTable = () => {
  const IP = process.env.REACT_APP_API_IP || "localhost";

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, setData] = useState([]);

  const UserColoums = [
    {
      field: "dte_hour",
      headerName: "Time",
      type: "string",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    {
      field: "avrgHum",
      headerName: "Humidity(%)",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
  ];

  const getData = async () => {
    await axios.get("http://" + IP + ":8081/HumDatas").then((response) => {
      setData(response.data);
    });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="flex-end" alignItems="center">
        <Box display="flex">
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
          getRowId={(row) => row.dte_hour}
          rows={data}
          columns={UserColoums}
        />
      </Box>
    </Box>
  );
};

export default HumTable;
