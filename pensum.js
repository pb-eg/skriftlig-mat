// PENSUM — det eneste, læreren behøver at rette i løbet af året.
// Sæt "gennemgaaet: true", når færdigheden er undervist.
// En delopgave vises kun for eleverne, når ALLE de færdigheder, den kræver, er gennemgået.
// Rækkefølgen følger modulplanen for 2a 2026-27.

window.PENSUM = [
  // Analytisk geometri
  { id: "afstand-punkter",     navn: "Afstand mellem to punkter",            modul: "1g",  gennemgaaet: true  },
  { id: "linjens-ligning",     navn: "Linjens ligning (inkl. topunktsformel)", modul: "M21", gennemgaaet: true  },
  { id: "skaering-linjer",     navn: "Skæring mellem linjer",                modul: "M21", gennemgaaet: true  },
  { id: "parallelle-linjer",   navn: "Parallelle linjer",                    modul: "M21", gennemgaaet: true  },
  { id: "haeldningsvinkel",    navn: "Hældningsvinkel",                      modul: "M21", gennemgaaet: true  },
  { id: "ortogonale-linjer",   navn: "Ortogonale linjer",                    modul: "M22", gennemgaaet: true  },
  { id: "afstand-punkt-linje", navn: "Afstand mellem punkt og linje",        modul: "M24", gennemgaaet: true  },
  { id: "cirklens-ligning",    navn: "Cirklens ligning",                     modul: "M45", gennemgaaet: false },
  { id: "kvadratkomplettering",navn: "Kvadratkomplettering",                 modul: "M46", gennemgaaet: false },
  { id: "skaering-linje-cirkel", navn: "Skæring mellem linje og cirkel",     modul: "M47", gennemgaaet: false },
  { id: "tangent-cirkel",      navn: "Tangent til cirkel",                   modul: "M48", gennemgaaet: false },
  { id: "midtpunkt",           navn: "Midtpunktsformel",                     modul: "M49", gennemgaaet: false }
];
