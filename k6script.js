import http from 'k6/http';
import { sleep } from 'k6';
export const options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 1500,
      timeUnit: '1s',
      duration: '15s',
      preAllocatedVUs: 100,
      maxVUs: 1000
    }
  }
}
const id = Math.floor(Math.random() * 1000011);
const urlProduct = `http://localhost:3000/reviews/?product_id=${id}`;

export default function () {
  http.get(urlProduct);
  sleep(1);
}
// Test: k6 run k6script.js
// docs: https://k6.io/blog/how-to-generate-a-constant-request-rate-with-the-new-scenarios-api/