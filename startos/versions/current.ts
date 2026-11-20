import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2026.5.2:18',
  releaseNotes: {
    en_US:
      'Requires StartOS 0.4.2 or later. The package now verifies that the Flowee the Hub source it builds is the exact 2026.05.2 release commit.',
    es_ES:
      'Requiere StartOS 0.4.2 o posterior. El paquete ahora verifica que el código fuente de Flowee the Hub que compila es exactamente el commit de la versión 2026.05.2.',
    de_DE:
      'Erfordert StartOS 0.4.2 oder neuer. Das Paket prüft jetzt, dass der gebaute Quellcode von Flowee the Hub genau dem Release-Commit von 2026.05.2 entspricht.',
    pl_PL:
      'Wymaga StartOS 0.4.2 lub nowszego. Pakiet sprawdza teraz, czy budowany kod źródłowy Flowee the Hub to dokładnie commit wydania 2026.05.2.',
    fr_FR:
      'Nécessite StartOS 0.4.2 ou ultérieur. Le paquet vérifie désormais que le code source de Flowee the Hub qu’il compile correspond exactement au commit de la version 2026.05.2.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
