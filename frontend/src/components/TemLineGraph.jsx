import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import { useTheme, colors } from "@mui/material";
import { tokens } from "../themes";

const TemLineGraph = () => {
  const IP = process.env.REACT_APP_API_IP || "localhost";

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, setData] = useState([
    {
      id: 0,
      data: [
        { x: "2023-10-01 00:00:00", y: 30 },
        { x: "2023-10-01 01:00:00", y: 28 },
        { x: "2023-10-01 02:00:00", y: 32 },
      ],
    },
  ]);
  const getData = async () => {
    await axios.get("http://" + IP + ":8081/avrgTemp").then((response) => {
      const tempData = response.data.map((item) => ({
        x: item.dte_hour,
        y: item.avrgTemp,
      }));

      setData([
        {
          id: "Average Temp",
          data: tempData,
        },
      ]);
    });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <ResponsiveLine
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
        tooltip: {
          container: {
            color: colors.primary[500],
          },
        },
      }}
      colors={{ scheme: "nivo" }} // added
      margin={{ top: 50, right: 130, bottom: 120, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        legendOffset: 36,
        legendPosition: "middle",
        tickRotation: 59,
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5, // added
        tickSize: 3,
        tickPadding: 5,
        tickRotation: 0,
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={8}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default TemLineGraph;
