const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "sensordata"
});

db.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});
// All data
app.get("/", (req, res) => {
    const slq = `SELECT
    UTC ,
    DATE_FORMAT(FROM_UNIXTIME(UTC),'%Y-%m-%d %H:%m:%s') as Time,
    Temperature_C,
    Humidity_percent,
    TVOC_ppb,
     eCO2_ppm,
     Raw_H2,
     Raw_Ethanol,
     Pressure_hPa
    FROM
        smoke
    order by UTC desc limit 1000;`;

    db.query(slq, (err, data) => {
        if (err) return res.json("error");
        return res.json(data);
    });
});

// Avrg Temperature for an hour
app.get("/avrgTemp", (req, res) => {
    const slq = `
    (SELECT DATE_FORMAT(FROM_UNIXTIME(UTC), '%Y-%m-%d %H:00:00') as dte_hour,
    ROUND(AVG(Temperature_C), 2) as avrgTemp
FROM
    smoke
GROUP BY
    DATE_FORMAT(FROM_UNIXTIME(UTC), '%Y-%m-%d %H:00:00')
ORDER BY
    dte_hour desc LIMIT 25) ORDER BY dte_hour ASC;`

    db.query(slq, (err, data) => {
        if (err) return res.json("error");
        return res.json(data);
    });
});


// Avrg Humiditv for an hour
app.get("/HumDatas", (req, res) => {
    const slq = `
    (SELECT DATE_FORMAT(FROM_UNIXTIME(UTC), '%Y-%m-%d %H:00:00') as dte_hour,
    ROUND(AVG(Humidity_percent), 2) as avrgHum
FROM
    smoke
GROUP BY
    DATE_FORMAT(FROM_UNIXTIME(UTC), '%Y-%m-%d %H:00:00')
ORDER BY
    dte_hour desc LIMIT 25) ORDER BY dte_hour ASC;`;

    db.query(slq, (err, data) => {
        if (err) return res.json("error");
        return res.json(data);
    });
});

// Avrg TVOC for an hour
app.get("/TVOCDatas", (req, res) => {
    const slq = `
    (SELECT DATE_FORMAT(FROM_UNIXTIME(UTC), '%Y-%m-%d %H:00:00') as dte_hour,
    ROUND(AVG(TVOC_ppb), 2) as avrgTVOC
FROM
    smoke
GROUP BY
    DATE_FORMAT(FROM_UNIXTIME(UTC), '%Y-%m-%d %H:00:00')
ORDER BY
    dte_hour desc LIMIT 25) ORDER BY dte_hour ASC;`;

    db.query(slq, (err, data) => {
        if (err) return res.json("error");
        return res.json(data);
    });
});
 
// Avrg eCO2 for an hour
app.get("/eCO2Datas", (req, res) => {
    const slq = `
    (SELECT DATE_FORMAT(FROM_UNIXTIME(UTC), '%Y-%m-%d %H:00:00') as dte_hour,
    ROUND(AVG(eCO2_ppm), 2) as avrgeCO2
FROM
    smoke
GROUP BY
    DATE_FORMAT(FROM_UNIXTIME(UTC), '%Y-%m-%d %H:00:00')
ORDER BY
    dte_hour desc LIMIT 25) ORDER BY dte_hour ASC;`;

    db.query(slq, (err, data) => {
        if (err) return res.json("error");
        return res.json(data);
    });
});

app.get("/DailyData", (req, res) => {
    const slq = `SELECT DATE_FORMAT(FROM_UNIXTIME(UTC), '%Y-%m-%d') as dte_hour,
    ROUND(AVG(Humidity_percent), 2) as avrgDailyHum,
    ROUND(AVG(Temperature_C),2) as avrgDailyTemp,
    ROUND(AVG(TVOC_ppb),0) as avrgDailyTVOC,
    COUNT(*) as DailyCount
FROM
    smoke
GROUP BY
    DATE_FORMAT(FROM_UNIXTIME(UTC), '%Y-%m-%d')
ORDER BY
    dte_hour desc LIMIT 1;`;

    db.query(slq, (err, data) => {
        if (err) return res.json("error");
        return res.json(data);
    });
});

app.listen(8081, () => {
    console.log("Lisening");
});