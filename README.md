# Skriftlig træning · Matematik B

Træningsapp til skriftlig matematik B (stx), hvor eleverne øver eksamenslignende opgaver hjemme med hints, løsninger og selvvurdering.

Appen ligger på: `https://DIT-BRUGERNAVN.github.io/skriftlig-mat/`
Lærervisning (alt stof, uanset pensum, og med forlæg på hver opgave): samme adresse med `#alt` til sidst.

## Filer

| Fil | Indhold |
|---|---|
| `index.html` | Selve appen |
| `pensum.js` | Hvilke færdigheder der er gennemgået. **Den eneste fil, der skal rettes i løbet af året** |
| `opgaver.js` | Opgavebanken: kategorier, opgaver, hints og løsninger |
| `temml.min.js`, `temml.css`, `Temml.woff2` | Visning af matematik |

## Opdatér pensum

1. Åbn `pensum.js` her på GitHub.
2. Klik på blyanten (Edit).
3. Ret `gennemgaaet: false` til `gennemgaaet: true` ud for de færdigheder, klassen har været igennem.
4. Klik **Commit changes**.

Eleverne ser ændringen et minut efter. En opgave vises kun, når alle de færdigheder, den kræver, er gennemgået.

## Opdatér opgaver eller appen

Vælg **Add file → Upload files**, og træk de nye filer ind. Filer med samme navn bliver erstattet.

## Elevdata

Der er intet login og ingen server. Elevernes vurderinger gemmes kun lokalt i deres egen browser og kan slettes under **Min oversigt**.
