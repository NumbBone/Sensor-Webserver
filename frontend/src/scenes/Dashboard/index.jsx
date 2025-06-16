import { Box, useTheme, Typography, colors, IconButton } from "@mui/material";
import { tokens } from "../../themes";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import ThermostatOutlinedIcon from "@mui/icons-material/ThermostatOutlined";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";
import MasksOutlinedIcon from "@mui/icons-material/MasksOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import { useState, useEffect } from "react";
import axios from "axios";
import TemLineGraph from "../../components/TemLineGraph";
import DownloadIcon from "@mui/icons-material/Download";
import { CSVLink } from "react-csv";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, setData] = useState([
    {
      avrgDailyTemp: "Loading",
      avrgDailyHum: "Loading",
      avrgDailyTVOC: "Loading",
      dailyMeasurementsCount: "Loading",
    },
  ]);
  const [csvData, setCsvData] = useState([]);

  const getData = async () => {
    await axios.get("http://localhost:8081/DailyData").then((response) => {
      setData(response.data);
    });
  };
  useEffect(() => {
    getData();
    axios.get("http://localhost:8081/avrgTemp").then((response) => {
      setCsvData(response.data);
    });
  }, []);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Dashboard" subtitle="Welcome to your dashboard" />
      </Box>
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap="20px">
        {/* Row 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={data[0].avrgDailyTemp + " °C"}
            subtitle="Daily Temperature"
            icon={
              <ThermostatOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "90px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={data[0].avrgDailyHum + " %"}
            subtitle="Daily Humidity"
            icon={
              <WaterDropOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "90px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={data[0].avrgDailyTVOC + " ppb"}
            subtitle="Daily TVOC"
            icon={
              <MasksOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "90px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={data[0].DailyCount}
            subtitle="Daily mesurements"
            icon={
              <AssessmentOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "90px" }}
              />
            }
          />
        </Box>

        {/* Row 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
        >
          <Box mt="25px" p="0 30px" alignItems="center">
            <Box display="flex" justifyContent="space-between">
              <Typography
                display="flex"
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Temparature
              </Typography>
              <Box display="flex" alignItems="center">
                <CSVLink
                  data={csvData}
                  filename={"temparature_data.csv"}
                  style={{
                    textDecoration: "none",
                    color: colors.greenAccent[500],
                  }}
                >
                  <IconButton>
                    <DownloadIcon fontSize="large" />
                  </IconButton>
                </CSVLink>
              </Box>
            </Box>
          </Box>

          <Box height="380px" m="-20px 0 0 0">
            <TemLineGraph />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
