if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register("./serviceWorker.js").then((registration) => {
        console.log('ServiceWorker registered with scope:', registration.scope);
    })
}
