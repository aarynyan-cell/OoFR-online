// OoFR's online version moved to https://aarynyan-cell.github.io/OoFR/. This
// worker replaces the app's old one at /OoFR-online/: it removes itself and
// sends open pages to the new address. Caches belong to the whole site and are
// used by the app at /OoFR/, so none are deleted.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      await self.registration.unregister();
      const windows = await self.clients.matchAll({ type: "window" });
      await Promise.all(windows.map((client) => client.navigate(`https://aarynyan-cell.github.io/OoFR/${new URL(client.url).hash}`).catch(() => undefined)));
    })()
  );
});
