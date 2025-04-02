// backend/testServiceKey.js

const axios = require("axios");
const xml2js = require("xml2js");
require("dotenv").config();

async function testServiceKey() {
  const serviceKey = process.env.DATA_API_KEY;
  const url = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst`;

  const queryParams = new URLSearchParams({
    serviceKey,
    pageNo: "1",
    numOfRows: "1000",
    dataType: "XML",
    base_date: "20240401",
    base_time: "0500",
    nx: "60",
    ny: "127",
  });

  try {
    const { data } = await axios.get(`${url}?${queryParams.toString()}`);
    const parsed = await xml2js.parseStringPromise(data, { explicitArray: false });

    console.log("✅ 요청 성공! 응답 메시지:", parsed.response.header.resultMsg);
  } catch (err) {
    console.error("❌ 요청 실패", err.response?.data || err.message);
  }
}

testServiceKey();
