# Aufgabe 3 - Einfacher Service Worker

Service Worker sind der Schlüssel zu coolen PWAs die sehr nah an native Apps herankommen.
Mit ihnen werden Features wie Offline-Verfügbarkeit, Push-Benachrichtigungen und Hintergrund-Sync möglich.

Doch erstmal wollen wir einen einfachen Service Worker registrieren und installieren.

## Aufgabenstellung

1. Erstellt eine Datei `serviceWorker.js` im `docs` Ordner.
2. Implementiert einen einfachen Service Worker, der beim _Laden_, der _Installieren_ und _Aktivieren_ eine Nachricht in der Konsole ausgibt.
3. Erstellt eine `registerServiceWorker.js` Datei im `docs` Ordner und bindet sie in eurer `index.html` Datei ein.
4. Hier implementiert ihr dann die Registrierung des Service Workers aus der `serviceWorker.js` Datei.
5. Pusht das Ganze und wartet auf den Deploy.
6. Öffnet Seite auf eurem Desktop und schaut euch die Konsole! Ihr solltet die Nachrichten sehen, die der Service Worker ausgibt.

> **Hinweis:** Falls ihr die Seite schon mal besucht habt, müsst ihr den Service Worker manuell über den "Application" Tab löschen, damit er neu installiert wird und ihr die Logs seht.

## Ziel

Nach dieser Aufgabe registriert, installiert und aktiviert eure App einen Service Worker!
