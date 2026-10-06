import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2026.5.2:14',
  releaseNotes: {
    en_US: `Deleting the transaction index or test network data no longer stops partway through on a large data directory.

- Node Info shows each value in its own labelled field.
- The Network and Allowed Networks settings explain each of their options.
- Tor's description among the dependencies says when Flowee needs it.`,
    es_ES: `Eliminar el índice de transacciones o los datos de las redes de prueba ya no se detiene a medias en un directorio de datos grande.

- Información del nodo muestra cada valor en su propio campo con nombre.
- Los ajustes Red y Redes permitidas explican cada una de sus opciones.
- La descripción de Tor entre las dependencias indica cuándo lo necesita Flowee.`,
    de_DE: `Das Löschen des Transaktionsindex oder von Testnetzdaten bricht bei einem großen Datenverzeichnis nicht mehr mittendrin ab.

- Knoten-Info zeigt jeden Wert in einem eigenen, beschrifteten Feld.
- Die Einstellungen Netzwerk und Erlaubte Netzwerke erklären jede ihrer Optionen.
- Die Beschreibung von Tor unter den Abhängigkeiten sagt, wann Flowee es braucht.`,
    pl_PL: `Usuwanie indeksu transakcji lub danych sieci testowych nie zatrzymuje się już w połowie przy dużym katalogu danych.

- Informacje o węźle pokazują każdą wartość w osobnym, podpisanym polu.
- Ustawienia Sieć i Dozwolone sieci objaśniają każdą ze swoich opcji.
- Opis Tora na liście zależności mówi, kiedy Flowee go potrzebuje.`,
    fr_FR: `La suppression de l'index des transactions ou des données des réseaux de test ne s'arrête plus en cours de route sur un répertoire de données volumineux.

- Infos du nœud affiche chaque valeur dans son propre champ nommé.
- Les réglages Réseau et Réseaux autorisés expliquent chacune de leurs options.
- La description de Tor parmi les dépendances indique quand Flowee en a besoin.`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
