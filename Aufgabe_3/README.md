# Aufgabe 3 - Eigener Install-Button (Nur Android/Desktop Chrome, sorry 🙄)

In Chromium basierten Browsern kann das `beforeinstallprompt` Event genutzt werden, um eine eigene Installations-UI zu erstellen.
Darauf kann man in JS reagieren und selbst entscheiden, wann und wie die Installation angeboten wird.

> Safari und Firefox unterstützen das `beforeinstallprompt` Event nicht.
> Und da alle Browser unter iOS auf Safari basieren, ist das Ganze auf iPhones nicht möglich.

## Aufgabenstellung

1. Kopiert `FAB.css´ in euren `docs` Ordner.
2. Kopiert den Inhalt von `FAB.html` ans Ende eurer `index.html` Datei und bindet `FAB.css` im head als Stylesheet ein.
3. Kopiert die `FAB.js` in euren `docs` Ordner und bindet sie im head als Script ein.
4. Implementiert einen Event listener, der auf das `beforeinstallprompt` Event reagiert und einen Button einblendet (`showInstallButton(event)`) der die Installation anbietet.

## Ziel

Nach dieser Aufgabe kann die App den Nutzer im eigenen UI auffordern die App zu installieren.

> **Hinweis:** Die Installation über die Browser UI aus Aufgabe 2 ist natürlich weiterhin möglich.
