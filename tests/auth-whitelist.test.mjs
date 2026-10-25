import test from "node:test";
import assert from "node:assert/strict";
import { isFreeAccessUser, MANAGED_CORPORATE_LICENSES } from "../lib/auth/whitelist.ts";

test("Corporate License & Whitelist Security Policy", async (t) => {
  await t.test("Rejects unauthenticated empty or null emails", () => {
    assert.equal(isFreeAccessUser(null), false);
    assert.equal(isFreeAccessUser(undefined), false);
    assert.equal(isFreeAccessUser(""), false);
  });

  await t.test("Validates authorized founder license with active status", () => {
    assert.equal(isFreeAccessUser("z65gt9@gmail.com"), true);
  });

  await t.test("Rejects unauthorized external emails", () => {
    assert.equal(isFreeAccessUser("attacker@gmail.com"), false);
    assert.equal(isFreeAccessUser("random.student@yahoo.com"), false);
  });

  await t.test("Enforces email verification for corporate domain accounts", () => {
    // Unverified @insyt.bd account must be rejected (SEC-08)
    assert.equal(isFreeAccessUser("unverified.staff@insyt.bd", false), false);
    // Verified @insyt.bd account is accepted
    assert.equal(isFreeAccessUser("verified.staff@insyt.bd", true), true);
  });

  await t.test("Managed licenses have explicit metadata and valid expiration", () => {
    for (const lic of MANAGED_CORPORATE_LICENSES) {
      assert.ok(lic.id, "License must have an ID");
      assert.ok(lic.organization, "License must have an organization");
      assert.ok(lic.expiresAt, "License must have an expiration date");
      assert.ok(new Date(lic.expiresAt).getTime() > Date.now(), "License must not be expired in seed data");
    }
  });
});
