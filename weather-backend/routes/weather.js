const express = require("express");
const router = express.Router();
const { getForecastTemperature, getForecastPrecipitation, getForecastWind } = require("../services/weatherService");
const { dfs_xy_conv } = require("../utils/convertToGrid");

// 나중에 실제 서비스 로직 연결 예정
router.get("/temperature", async (req, res) => {
    const { lat, lon } = req.query;
  
    if (!lat || !lon) {
      return res.status(400).json({ error: "위도(lat)와 경도(lon)를 모두 입력하세요." });
    }
  
    const { nx, ny } = dfs_xy_conv(Number(lat), Number(lon));
  
    try {
      const result = await getForecastTemperature(nx, ny);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: "기온 예보 데이터를 불러오는 데 실패했습니다." });
    }
  });
  

router.get("/precipitation", async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: "위도(lat), 경도(lon)를 입력해주세요." });
  }

  const { nx, ny } = dfs_xy_conv(Number(lat), Number(lon));

  try {
    const result = await getForecastPrecipitation(nx, ny);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "강수확률 예보 데이터를 불러오는 데 실패했습니다." });
  }
});

router.get("/wind", async (req, res) => {
    const { lat, lon } = req.query;
  
    if (!lat || !lon) {
      return res.status(400).json({ error: "위도(lat), 경도(lon)를 입력해주세요." });
    }
  
    const { nx, ny } = dfs_xy_conv(Number(lat), Number(lon));
  
    try {
      const result = await getForecastWind(nx, ny);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: "풍속 예보 데이터를 불러오는 데 실패했습니다." });
    }
});

module.exports = router;
