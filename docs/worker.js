console.log("Loaded service worker");

self.addEventListener('install', (event) => {
    console.log("Service worker installed");
    window.alert("Service worker installed");
});

self.addEventListener('activate', (event) => {
    console.log("Service worker activated");
    window.alert("Service worker activated");
});