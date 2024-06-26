console.log("Bleep Bloop 🤖 - hier spricht der ServiceWorker 🛠️");

self.addEventListener("install", event => {
    console.log("Der ServiceWorker wird installiert 🛠️");
});

self.addEventListener("activate", event => {
    console.log("Der ServiceWorker wird aktiviert 🚀");
});
