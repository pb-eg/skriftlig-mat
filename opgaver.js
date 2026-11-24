// KATEGORIER — stofområder og underkategorier, som eleverne vælger mellem.

const r = String.raw;

window.KATEGORIER = [
  { id: "analytisk", navn: "Analytisk geometri", under: [
    { id: "afstand",          navn: "Afstand mellem to punkter" },
    { id: "midtpunkt",        navn: "Midtpunkt" },
    { id: "linjens-ligning",  navn: "Linjens ligning" },
    { id: "parallelle",       navn: "Parallelle linjer" },
    { id: "ortogonale",       navn: "Ortogonale linjer" },
    { id: "skaering-linjer",  navn: "Skæring mellem linjer" },
    { id: "haeldningsvinkel", navn: "Hældningsvinkel" },
    { id: "punkt-linje",      navn: "Afstand mellem punkt og linje" },
    { id: "cirklens-ligning", navn: "Cirklens ligning" },
    { id: "linje-cirkel",     navn: "Skæring mellem linje og cirkel" },
    { id: "tangent-cirkel",   navn: "Tangent til cirkel" }
  ]},
  { id: "funktioner",   navn: "Funktioner og differentialregning", kommer: true, under: [] },
  { id: "kombinatorik", navn: "Kombinatorik og sandsynlighed",     kommer: true, under: [] },
  { id: "algebra",      navn: "Tal og algebra",                    kommer: true, under: [] },
  { id: "trigonometri", navn: "Trigonometri",                      kommer: true, under: [] },
  { id: "statistik",    navn: "Deskriptiv statistik",              kommer: true, under: [] }
];

// Faste opgaver (uden nye tal). Alle opgaver i analytisk geometri ligger nu som skabeloner i skabeloner.js,
// så "Samme opgave med nye tal" virker overalt. Listen kan bruges til særlige opgaver, der ikke egner sig som skabelon.
window.OPGAVER = [];
