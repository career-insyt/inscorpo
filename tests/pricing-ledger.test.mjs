import test from "node:test";
import assert from "node:assert/strict";
import { BKASH_CONFIG } from "../lib/payments/bkash-config.ts";

test("bKash MFS Pricing & Financial Rules", async (t) => {
  await t.test("Enforces production pricing for Excel modeling (no 0.01 testing price)", () => {
    assert.equal(BKASH_CONFIG.EXCEL_PRICE_BDT, 990);
    assert.notEqual(BKASH_CONFIG.EXCEL_PRICE_BDT, 0.01);
  });

  await t.test("Configures official bKash Send Money account details", () => {
    assert.equal(BKASH_CONFIG.ACCOUNT_NUMBER, "01771047033");
    assert.ok(BKASH_CONFIG.ACCOUNT_TYPE.includes("Send Money"));
  });

  await t.test("Validates subscription tier pricing structure", () => {
    assert.equal(BKASH_CONFIG.SUBSCRIPTION_PRICES.pro, 799);
    assert.equal(BKASH_CONFIG.SUBSCRIPTION_PRICES.single_course, 499);
    assert.equal(BKASH_CONFIG.SUBSCRIPTION_PRICES.flagship_path, 1999);
    assert.equal(BKASH_CONFIG.SUBSCRIPTION_PRICES.pro_annual, 4999);
  });
});
