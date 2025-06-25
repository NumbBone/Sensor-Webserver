import { Box } from "@mui/material";
import Header from "../../components/Header";
import axios from "axios";
import { useEffect, useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { useTheme } from "@mui/material";
import { tokens } from "../../themes";
import DownloadIcon from "@mui/icons-material/Download";
import { CSVLink } from "react-csv";
import IconButton from "@mui/material/IconButton";

const ECO2Graph = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const IP = process.env.REACT_APP_API_IP || "localhost";

  const [data, setData] = useState([]);
  const getData = async () => {
    await axios.get("http://" + IP + ":8081/eCO2Datas").then((response) => {
      setData(response.data);
    });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="eCO2 Graph" subtitle="CO2 Data Over Time" />
        <Box display="flex" alignItems="center">
          <CSVLink
            data={data}
            filename={"eCO2_data.csv"}
            style={{
              textDecoration: "none",
              color: colors.grey[100],
            }}
          >
            <IconButton>
              <DownloadIcon fontSize="large" />
            </IconButton>
          </CSVLink>
          <Box />
        </Box>
      </Box>
      <Box height="75vh">
        <ResponsiveBar
          data={data}
          theme={{
            axis: {
              domain: {
                line: {
                  stroke: colors.grey[100],
                },
              },
              legend: {
                text: {
                  fill: colors.grey[100],
                },
              },
              ticks: {
                line: {
                  stroke: colors.grey[100],
                  strokeWidth: 1,
                },
                text: {
                  fill: colors.grey[100],
                },
              },
            },
            legends: {
              text: {
                fill: colors.grey[100],
              },
            },
          }}
          indexBy={"dte_hour"}
          keys={["avrgeCO2"]}
          groupMode="grouped"
          enableLabel={false}
          isInteractive={false}
          legends={[
            {
              dataFrom: "keys",
              anchor: "top-right",
              direction: "column",
              translateX: 120,
              itemWidth: 100,
              itemHeight: 20,
              itemsSpacing: 2,
              symbolSize: 20,
            },
          ]}
          axisBottom={{ tickRotation: 59, legend: "Time", legendOffset: 110 }}
          axisLeft={{ legend: "eCO2(ppm)", legendOffset: -50 }}
          colors={{ scheme: "category10" }}
          labelSkipWidth={13}
          labelSkipHeight={12}
          margin={{ top: 50, right: 130, bottom: 120, left: 60 }}
        />
      </Box>
    </Box>
  );
};

export default ECO2Graph;
