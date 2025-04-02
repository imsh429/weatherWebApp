// backend/services/weatherService.js
const axios = require("axios");
const xml2js = require("xml2js");
const dayjs = require("dayjs");
require("dotenv").config();

const SERVICE_KEY = process.env.DATA_API_KEY;
const VILAGE_URL = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst";

// 기상청 문서 기준 base_time 목록
const VALID_BASE_TIMES = ["0200", "0500", "0800", "1100", "1400", "1700", "2000", "2300"];

// 현재 시간에 가장 가까운 base_time 선택
function getClosestBaseTime() {
  const now = dayjs();
  const current = Number(now.format("HHmm"));
  let closest = "0200";

  for (const bt of VALID_BASE_TIMES) {
    if (current >= Number(bt)) closest = bt;
  }

  return {
    base_date: now.format("YYYYMMDD"),
    base_time: closest,
  };
}

async function getForecastTemperature(nx, ny) {
  const { base_date, base_time } = getClosestBaseTime();

  const queryParams = new URLSearchParams({
    serviceKey: SERVICE_KEY,
    pageNo: "1",
    numOfRows: "1000",
    dataType: "XML",
    base_date,
    base_time,
    nx,
    ny,
  });

  try {
    const url = `${VILAGE_URL}?${queryParams.toString()}`;
    const { data } = await axios.get(url);

    const parsed = await xml2js.parseStringPromise(data, { explicitArray: false });

    const items = parsed?.response?.body?.items?.item;
    if (!items) throw new Error("예보 항목이 없습니다.");

    const forecasts = Array.isArray(items) ? items : [items];

    const temps = forecasts
      .filter((item) => item.category === "TMP")
      .map((item) => ({
        date: item.fcstDate,
        time: item.fcstTime,
        value: item.fcstValue,
      }));

    if (temps.length === 0) throw new Error("TMP 항목을 찾을 수 없습니다.");

    return {
      location: { nx, ny },
      baseDate: base_date,
      baseTime: base_time,
      temperatures: temps,
    };
  } catch (error) {
    console.error("🔥 TMP 기온 예보 API 오류:", error.message);
    throw error;
  }
}

// backend/services/weatherService.js (추가)
async function getForecastPrecipitation(nx, ny) {
    const { base_date, base_time } = getClosestBaseTime();
  
    const queryParams = new URLSearchParams({
      serviceKey: SERVICE_KEY,
      pageNo: "1",
      numOfRows: "1000",
      dataType: "XML",
      base_date,
      base_time,
      nx,
      ny,
    });
  
    try {
      const url = `${VILAGE_URL}?${queryParams.toString()}`;
      const { data } = await axios.get(url);
  
      const parsed = await xml2js.parseStringPromise(data, { explicitArray: false });
      const items = parsed?.response?.body?.items?.item;
      if (!items) throw new Error("예보 항목이 없습니다.");
  
      const forecasts = Array.isArray(items) ? items : [items];
  
      const pops = forecasts
        .filter((item) => item.category === "POP")
        .map((item) => ({
          date: item.fcstDate,
          time: item.fcstTime,
          value: item.fcstValue,
        }));
  
      if (pops.length === 0) throw new Error("POP 항목을 찾을 수 없습니다.");
  
      return {
        location: { nx, ny },
        baseDate: base_date,
        baseTime: base_time,
        precipitation: pops,
      };
    } catch (error) {
      console.error("🔥 POP 강수확률 예보 API 오류:", error.message);
      throw error;
    }
  }
async function getForecastPrecipitation(nx, ny) {
    const { base_date, base_time } = getClosestBaseTime();
  
    const queryParams = new URLSearchParams({
      serviceKey: SERVICE_KEY,
      pageNo: "1",
      numOfRows: "1000",
      dataType: "XML",
      base_date,
      base_time,
      nx,
      ny,
    });
  
    try {
      const url = `${VILAGE_URL}?${queryParams.toString()}`;
      const { data } = await axios.get(url);
  
      const parsed = await xml2js.parseStringPromise(data, { explicitArray: false });
      const items = parsed?.response?.body?.items?.item;
      if (!items) throw new Error("예보 항목이 없습니다.");
  
      const forecasts = Array.isArray(items) ? items : [items];
  
      const pops = forecasts
        .filter((item) => item.category === "POP")
        .map((item) => ({
          date: item.fcstDate,
          time: item.fcstTime,
          value: item.fcstValue,
        }));
  
      if (pops.length === 0) throw new Error("POP 항목을 찾을 수 없습니다.");
  
      return {
        location: { nx, ny },
        baseDate: base_date,
        baseTime: base_time,
        precipitation: pops,
      };
    } catch (error) {
      console.error("🔥 POP 강수확률 예보 API 오류:", error.message);
      throw error;
    }
}

async function getForecastWind(nx, ny) {
    const { base_date, base_time } = getClosestBaseTime();
  
    const queryParams = new URLSearchParams({
      serviceKey: SERVICE_KEY,
      pageNo: "1",
      numOfRows: "1000",
      dataType: "XML",
      base_date,
      base_time,
      nx,
      ny,
    });
  
    try {
      const url = `${VILAGE_URL}?${queryParams.toString()}`;
      const { data } = await axios.get(url);
  
      const parsed = await xml2js.parseStringPromise(data, { explicitArray: false });
      const items = parsed?.response?.body?.items?.item;
      if (!items) throw new Error("예보 항목이 없습니다.");
  
      const forecasts = Array.isArray(items) ? items : [items];
  
      const winds = forecasts
        .filter((item) => item.category === "WSD")
        .map((item) => ({
          date: item.fcstDate,
          time: item.fcstTime,
          value: item.fcstValue,
        }));
  
      if (winds.length === 0) throw new Error("WSD 항목을 찾을 수 없습니다.");
  
      return {
        location: { nx, ny },
        baseDate: base_date,
        baseTime: base_time,
        wind: winds,
      };
    } catch (error) {
      console.error("🔥 WSD 풍속 예보 API 오류:", error.message);
      throw error;
    }
}
  
  module.exports = {
    getForecastTemperature,
    getForecastPrecipitation,
    getForecastWind, // ← 이 줄 추가!
  };

