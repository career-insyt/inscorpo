import test from "node:test";
import assert from "node:assert/strict";
import { sha256Sync } from "../lib/utils/sha256.ts";

test("Client-Safe Pure TypeScript SHA-256 Implementation", async (t) => {
  await t.test("Calculates correct SHA-256 for empty string", () => {
    assert.equal(
      sha256Sync(""),
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
    );
  });

  await t.test("Calculates correct SHA-256 for standard ASCII string", () => {
    // NIST test vector for "abc"
    assert.equal(
      sha256Sync("abc"),
      "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad"
    );
  });

  await t.test("Calculates correct SHA-256 for candidate verification payload", () => {
    const payload = "candidate@insyt.bd:test-analytics:85:2026-10-18";
    const hash = sha256Sync(payload);
    assert.equal(hash.length, 64);
    assert.match(hash, /^[0-9a-f]{64}$/);
  });
});
