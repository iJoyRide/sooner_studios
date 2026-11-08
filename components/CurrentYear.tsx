import { cacheLife } from "next/cache";

// cacheComponents is on, so reading the clock (new Date()) has to happen inside
// "use cache". The cached year is refreshed daily, so it rolls over on its own in January.
export default async function CurrentYear() {
  "use cache";
  cacheLife("days");

  return <>{new Date().getFullYear()}</>;
}
