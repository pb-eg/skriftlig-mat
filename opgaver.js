// OPGAVEBANK — Matematik B, skriftlig træning
// Matematik skrives i $...$ (LaTeX). String.raw (r`...`) gør, at \ ikke skal fordobles.
// Felter pr. delopgave: kategori (elevens valg), kraever (færdigheder fra pensum.js),
// sv (sværhedsgrad 1–3 efter antal trin), hints (to trin), loesning.

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

window.OPGAVER = [

// ───────────────────────── DELPRØVE 1 ─────────────────────────

{ id: "ag-01", delproeve: 1,
  intro: r`I et koordinatsystem er punkterne $A(1,2)$ og $B(7,10)$ givet.`,
  figur: { vindue: [-1, 9, -1, 11], objekter: [
    { t: "punkt", x: 1, y: 2, navn: "A" }, { t: "punkt", x: 7, y: 10, navn: "B" },
    { t: "stykke", x1: 1, y1: 2, x2: 7, y2: 10 } ] },
  dele: [
  { bogstav: "a", point: 10, kategori: "afstand", kraever: ["afstand-punkter"], sv: 2,
    tekst: r`Bestem afstanden $|AB|$ mellem punktet $A$ og punktet $B$.`,
    hints: [
      r`Find afstandsformlen for to punkter i formelsamlingen.`,
      r`Indsæt $x_1=1$, $y_1=2$, $x_2=7$ og $y_2=10$ i $|AB|=\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}$.`],
    loesning: r`$$|AB|=\sqrt{(7-1)^2+(10-2)^2}=\sqrt{36+64}=\sqrt{100}=10$$ <p><b>Svar:</b> $|AB|=10$.</p>` },
  { bogstav: "b", point: 10, kategori: "midtpunkt", kraever: ["midtpunkt"], sv: 1,
    tekst: r`Bestem koordinatsættet til midtpunktet $M$ af linjestykket $AB$.`,
    hints: [
      r`Midtpunktet ligger "midt imellem" i både $x$- og $y$-retningen.`,
      r`Midtpunktsformlen: $M\left(\frac{x_1+x_2}{2},\frac{y_1+y_2}{2}\right)$.`],
    loesning: r`$$M\left(\frac{1+7}{2},\frac{2+10}{2}\right)=M(4,6)$$ <p><b>Svar:</b> $M(4,6)$.</p>` }
]},

{ id: "ag-02", forlaeg: "Eksamen 11. aug. 2026, opg. 6", delproeve: 1,
  intro: r`I et koordinatsystem er punkterne $P(-2,3)$ og $Q(4,-1)$ givet.`,
  dele: [
  { bogstav: "a", point: 10, kategori: "afstand", kraever: ["afstand-punkter"], sv: 2,
    tekst: r`Bestem afstanden $|PQ|$ mellem punktet $P$ og punktet $Q$.`,
    hints: [
      r`Brug afstandsformlen. Pas på fortegnene, når du trækker et negativt tal fra.`,
      r`$x_2-x_1=4-(-2)=6$. Hvad bliver $y_2-y_1$?`],
    loesning: r`$$|PQ|=\sqrt{(4-(-2))^2+(-1-3)^2}=\sqrt{36+16}=\sqrt{52}$$ <p>Det kan evt. reduceres til $2\sqrt{13}$, men $\sqrt{52}$ er et fint svar.</p><p><b>Svar:</b> $|PQ|=\sqrt{52}$.</p>` },
  { bogstav: "b", point: 10, kategori: "linjens-ligning", kraever: ["linjens-ligning"], sv: 2,
    tekst: r`En linje $l$ går gennem punkterne $P$ og $Q$. Bestem en ligning for linjen $l$.`,
    hints: [
      r`Find først hældningskoefficienten med topunktsformlen $a=\frac{y_2-y_1}{x_2-x_1}$.`,
      r`Når du har $a$, indsætter du et af punkterne i $y=ax+b$ og løser for $b$.`],
    loesning: r`$$a=\frac{-1-3}{4-(-2)}=\frac{-4}{6}=-\frac{2}{3}$$ <p>Punktet $P(-2,3)$ indsættes i $y=ax+b$:</p> $$3=-\frac{2}{3}\cdot(-2)+b \;\Leftrightarrow\; 3=\frac{4}{3}+b \;\Leftrightarrow\; b=\frac{5}{3}$$ <p><b>Svar:</b> $l:\ y=-\frac{2}{3}x+\frac{5}{3}$.</p>` }
]},

{ id: "ag-03", delproeve: 1,
  intro: r`En linje $l$ har ligningen $l:\ y=3x-4$. En linje $m$ er parallel med $l$ og går gennem punktet $P(2,9)$.`,
  dele: [
  { bogstav: "a", point: 10, kategori: "parallelle", kraever: ["parallelle-linjer", "linjens-ligning"], sv: 2,
    tekst: r`Bestem en ligning for linjen $m$.`,
    hints: [
      r`Hvad ved du om hældningskoefficienterne for to parallelle linjer?`,
      r`$m$ har hældningen $3$. Indsæt $P(2,9)$ i $y=3x+b$ og find $b$.`],
    loesning: r`<p>Parallelle linjer har samme hældningskoefficient, så $m$ har $a=3$.</p> $$9=3\cdot 2+b \;\Leftrightarrow\; b=3$$ <p><b>Svar:</b> $m:\ y=3x+3$.</p>` }
]},

{ id: "ag-04", forlaeg: "Eksamen 26. maj 2026, opg. 8", delproeve: 1,
  intro: r`En linje $l$ har ligningen $l:\ y=\frac{1}{2}x+1$. En linje $m$ står vinkelret på linjen $l$ og går gennem punktet $P(4,-2)$. Se figuren.`,
  figur: { vindue: [-2, 7, -4, 6], objekter: [
    { t: "linje", a: 0.5, b: 1, navn: "l" }, { t: "linje", a: -2, b: 6, navn: "m" },
    { t: "punkt", x: 4, y: -2, navn: "P" } ] },
  dele: [
  { bogstav: "a", point: 10, kategori: "ortogonale", kraever: ["ortogonale-linjer", "linjens-ligning"], sv: 2,
    tekst: r`Bestem hældningskoefficienten for linjen $m$. Bestem en ligning for $m$.`,
    hints: [
      r`For to linjer, der står vinkelret på hinanden, gælder $a_l\cdot a_m=-1$.`,
      r`$\frac{1}{2}\cdot a_m=-1$ giver $a_m=-2$. Indsæt nu $P(4,-2)$ i $y=-2x+b$.`],
    loesning: r`$$\tfrac{1}{2}\cdot a_m=-1 \;\Leftrightarrow\; a_m=-2$$ $$-2=-2\cdot 4+b \;\Leftrightarrow\; b=6$$ <p><b>Svar:</b> Hældningskoefficienten er $-2$, og $m:\ y=-2x+6$.</p>` },
  { bogstav: "b", point: 10, kategori: "skaering-linjer", kraever: ["skaering-linjer", "ortogonale-linjer", "linjens-ligning"], sv: 2,
    tekst: r`Bestem koordinatsættet til skæringspunktet mellem linjen $l$ og linjen $m$.`,
    hints: [
      r`I skæringspunktet har de to linjer samme $y$-værdi. Sæt de to forskrifter lig hinanden.`,
      r`Løs $\frac{1}{2}x+1=-2x+6$, og indsæt $x$ i en af ligningerne for at finde $y$.`],
    loesning: r`$$\tfrac{1}{2}x+1=-2x+6 \;\Leftrightarrow\; \tfrac{5}{2}x=5 \;\Leftrightarrow\; x=2$$ $$y=\tfrac{1}{2}\cdot 2+1=2$$ <p><b>Svar:</b> Skæringspunktet er $(2,2)$.</p>` }
]},

{ id: "ag-05", forlaeg: "Eksamen 28. maj 2026, opg. 7", delproeve: 1,
  intro: r`To linjer $l$ og $m$ er givet ved ligningerne $l:\ y=2x-5$ og $m:\ y=-x+7$.`,
  dele: [
  { bogstav: "a", point: 10, kategori: "skaering-linjer", kraever: ["skaering-linjer"], sv: 2,
    tekst: r`Bestem koordinatsættet til skæringspunktet mellem linjen $l$ og linjen $m$.`,
    hints: [
      r`Sæt de to forskrifter lig hinanden.`,
      r`$2x-5=-x+7$. Saml $x$ på den ene side.`],
    loesning: r`$$2x-5=-x+7 \;\Leftrightarrow\; 3x=12 \;\Leftrightarrow\; x=4$$ $$y=2\cdot 4-5=3$$ <p><b>Svar:</b> Skæringspunktet er $(4,3)$.</p>` },
  { bogstav: "b", point: 10, kategori: "ortogonale", kraever: ["ortogonale-linjer"], sv: 1,
    tekst: r`Undersøg, om linjen $l$ og linjen $m$ står vinkelret på hinanden.`,
    hints: [
      r`Hvad skal produktet af hældningskoefficienterne være, hvis linjerne står vinkelret på hinanden?`,
      r`Udregn $a_l\cdot a_m=2\cdot(-1)$ og sammenlign med $-1$.`],
    loesning: r`$$a_l\cdot a_m=2\cdot(-1)=-2\neq -1$$ <p><b>Svar:</b> Linjerne står ikke vinkelret på hinanden.</p>` }
]},

{ id: "ag-06", delproeve: 1,
  intro: r`En trekant $ABC$ har vinkelspidserne $A(1,1)$, $B(5,3)$ og $C(3,7)$. Se figuren.`,
  figur: { vindue: [-1, 7, -1, 8], objekter: [
    { t: "stykke", x1: 1, y1: 1, x2: 5, y2: 3 }, { t: "stykke", x1: 5, y1: 3, x2: 3, y2: 7 }, { t: "stykke", x1: 3, y1: 7, x2: 1, y2: 1 },
    { t: "punkt", x: 1, y: 1, navn: "A" }, { t: "punkt", x: 5, y: 3, navn: "B" }, { t: "punkt", x: 3, y: 7, navn: "C" } ] },
  dele: [
  { bogstav: "a", point: 10, kategori: "ortogonale", kraever: ["ortogonale-linjer", "linjens-ligning"], sv: 3,
    tekst: r`Gør rede for, at vinkel $B$ i trekant $ABC$ er ret.`,
    hints: [
      r`Vinkel $B$ er ret, hvis linjestykkerne $AB$ og $BC$ står vinkelret på hinanden.`,
      r`Find hældningerne for $AB$ og $BC$ med topunktsformlen, og udregn deres produkt.`],
    loesning: r`$$a_{AB}=\frac{3-1}{5-1}=\frac{1}{2},\qquad a_{BC}=\frac{7-3}{3-5}=-2$$ $$a_{AB}\cdot a_{BC}=\tfrac{1}{2}\cdot(-2)=-1$$ <p><b>Svar:</b> Produktet er $-1$, så $AB$ og $BC$ står vinkelret på hinanden, og vinkel $B$ er ret.</p>` },
  { bogstav: "b", point: 10, kategori: "afstand", kraever: ["afstand-punkter", "ortogonale-linjer", "linjens-ligning"], sv: 3,
    tekst: r`Bestem arealet af trekant $ABC$.`,
    hints: [
      r`Trekanten er retvinklet i $B$. Hvilke to sider kan så bruges som grundlinje og højde?`,
      r`Find $|AB|$ og $|BC|$ med afstandsformlen. Arealet er $\frac{1}{2}\cdot|AB|\cdot|BC|$.`],
    loesning: r`$$|AB|=\sqrt{4^2+2^2}=\sqrt{20},\qquad |BC|=\sqrt{(-2)^2+4^2}=\sqrt{20}$$ <p>Da vinkel $B$ er ret, er $AB$ og $BC$ grundlinje og højde:</p> $$T=\tfrac{1}{2}\cdot\sqrt{20}\cdot\sqrt{20}=\tfrac{1}{2}\cdot 20=10$$ <p><b>Svar:</b> Arealet er $10$.</p>` }
]},

{ id: "ag-07", forlaeg: "Vejl. sæt 1, opg. 8 · enkeltopg. 3.D1.32", delproeve: 1,
  intro: r`En cirkel er givet ved ligningen $(x-1)^2+(y-2)^2=25$.`,
  figur: { vindue: [-5, 8, -4, 9], objekter: [
    { t: "cirkel", cx: 1, cy: 2, r: 5 }, { t: "punkt", x: 1, y: 2, navn: "C" }, { t: "punkt", x: 4, y: 6, navn: "P" } ] },
  dele: [
  { bogstav: "a", point: 10, kategori: "cirklens-ligning", kraever: ["cirklens-ligning"], sv: 1,
    tekst: r`Bestem cirklens centrum og radius.`,
    hints: [
      r`Sammenlign med cirklens ligning $(x-a)^2+(y-b)^2=r^2$.`,
      r`Husk at højresiden er $r^2$ og ikke $r$.`],
    loesning: r`<p>Ligningen har formen $(x-a)^2+(y-b)^2=r^2$ med $a=1$, $b=2$ og $r^2=25$.</p> <p><b>Svar:</b> Centrum er $C(1,2)$, og radius er $r=5$.</p>` },
  { bogstav: "b", point: 10, kategori: "cirklens-ligning", kraever: ["cirklens-ligning"], sv: 1,
    tekst: r`Gør rede for, at punktet $P(4,6)$ ligger på cirklen.`,
    hints: [
      r`Et punkt ligger på cirklen, hvis dets koordinater passer i cirklens ligning.`,
      r`Indsæt $x=4$ og $y=6$ i venstresiden og se, om du får $25$.`],
    loesning: r`$$(4-1)^2+(6-2)^2=9+16=25$$ <p><b>Svar:</b> Koordinaterne passer i ligningen, så $P$ ligger på cirklen.</p>` },
  { bogstav: "c", point: 10, kategori: "tangent-cirkel", kraever: ["tangent-cirkel", "cirklens-ligning", "ortogonale-linjer", "linjens-ligning"], sv: 3,
    tekst: r`Bestem en ligning for tangenten til cirklen i punktet $P$.`,
    hints: [
      r`Tangenten i $P$ står vinkelret på radius $CP$.`,
      r`Find hældningen af $CP$ med topunktsformlen. Tangentens hældning $a_t$ opfylder $a_{CP}\cdot a_t=-1$. Indsæt derefter $P$ i $y=a_t x+b$.`],
    loesning: r`$$a_{CP}=\frac{6-2}{4-1}=\frac{4}{3}\quad\Rightarrow\quad a_t=-\frac{3}{4}$$ $$6=-\tfrac{3}{4}\cdot 4+b \;\Leftrightarrow\; b=9$$ <p><b>Svar:</b> Tangenten har ligningen $y=-\frac{3}{4}x+9$.</p>` }
]},

{ id: "ag-08", forlaeg: "Enkeltopg. 3.D1.29", delproeve: 1,
  intro: r`En cirkel har centrum i punktet $C(-3,4)$ og radius $5$.`,
  dele: [
  { bogstav: "a", point: 10, kategori: "cirklens-ligning", kraever: ["cirklens-ligning"], sv: 1,
    tekst: r`Bestem en ligning for cirklen.`,
    hints: [
      r`Brug $(x-a)^2+(y-b)^2=r^2$, hvor $(a,b)$ er centrum.`,
      r`Pas på fortegnet: $x-(-3)=x+3$.`],
    loesning: r`$$(x-(-3))^2+(y-4)^2=5^2$$ <p><b>Svar:</b> $(x+3)^2+(y-4)^2=25$.</p>` },
  { bogstav: "b", point: 10, kategori: "cirklens-ligning", kraever: ["cirklens-ligning"], sv: 2,
    tekst: r`Undersøg, om punktet $Q(0,1)$ ligger på cirklen, inden for cirklen eller uden for cirklen.`,
    hints: [
      r`Indsæt punktet i venstresiden af cirklens ligning og sammenlign med $r^2=25$.`,
      r`Er venstresiden mindre end $25$, ligger punktet tættere på centrum end radius.`],
    loesning: r`$$(0+3)^2+(1-4)^2=9+9=18$$ <p>Da $18<25$, er afstanden fra $Q$ til centrum mindre end radius.</p> <p><b>Svar:</b> $Q$ ligger inden for cirklen.</p>` }
]},

{ id: "ag-09", forlaeg: "Enkeltopg. 3.D1.34", delproeve: 1,
  intro: r`En cirkel er givet ved ligningen $x^2-6x+y^2+4y=12$.`,
  dele: [
  { bogstav: "a", point: 10, kategori: "cirklens-ligning", kraever: ["cirklens-ligning", "kvadratkomplettering"], sv: 3,
    tekst: r`Bestem cirklens centrum og radius.`,
    hints: [
      r`Omskriv ligningen til formen $(x-a)^2+(y-b)^2=r^2$ ved kvadratkomplettering.`,
      r`$x^2-6x=(x-3)^2-9$ og $y^2+4y=(y+2)^2-4$. Indsæt og saml konstanterne på højresiden.`],
    loesning: r`$$x^2-6x+y^2+4y=12$$ $$(x-3)^2-9+(y+2)^2-4=12$$ $$(x-3)^2+(y+2)^2=25$$ <p><b>Svar:</b> Centrum er $(3,-2)$, og radius er $5$.</p>` }
]},

{ id: "ag-10", forlaeg: "Enkeltopg. 3.D1.36", delproeve: 1,
  intro: r`Punkterne $A(-1,2)$ og $B(5,10)$ er endepunkter for en diameter i en cirkel.`,
  figur: { vindue: [-4, 8, -1, 12], objekter: [
    { t: "cirkel", cx: 2, cy: 6, r: 5 }, { t: "stykke", x1: -1, y1: 2, x2: 5, y2: 10 },
    { t: "punkt", x: -1, y: 2, navn: "A" }, { t: "punkt", x: 5, y: 10, navn: "B" } ] },
  dele: [
  { bogstav: "a", point: 10, kategori: "midtpunkt", kraever: ["midtpunkt"], sv: 1,
    tekst: r`Bestem koordinatsættet til cirklens centrum.`,
    hints: [
      r`Centrum ligger midt på enhver diameter.`,
      r`Brug midtpunktsformlen på $A$ og $B$.`],
    loesning: r`$$C\left(\frac{-1+5}{2},\frac{2+10}{2}\right)=C(2,6)$$ <p><b>Svar:</b> Centrum er $C(2,6)$.</p>` },
  { bogstav: "b", point: 10, kategori: "cirklens-ligning", kraever: ["cirklens-ligning", "midtpunkt", "afstand-punkter"], sv: 2,
    tekst: r`Bestem en ligning for cirklen.`,
    hints: [
      r`Du kender centrum fra a). Radius er afstanden fra centrum til $A$ (eller $B$).`,
      r`Find $|CA|$ med afstandsformlen, og indsæt i $(x-a)^2+(y-b)^2=r^2$.`],
    loesning: r`$$r=|CA|=\sqrt{(-1-2)^2+(2-6)^2}=\sqrt{9+16}=5$$ <p><b>Svar:</b> $(x-2)^2+(y-6)^2=25$.</p>` }
]},

{ id: "ag-11", delproeve: 1,
  intro: r`Figuren viser en linje $l$ i et koordinatsystem. Linjen går gennem punkterne $(0,-1)$ og $(3,5)$.`,
  figur: { vindue: [-3, 6, -3, 8], objekter: [
    { t: "linje", a: 2, b: -1, navn: "l" }, { t: "punkt", x: 0, y: -1 }, { t: "punkt", x: 3, y: 5 } ] },
  dele: [
  { bogstav: "a", point: 10, kategori: "linjens-ligning", kraever: ["linjens-ligning"], sv: 1,
    tekst: r`Bestem en ligning for linjen $l$.`,
    hints: [
      r`Det ene punkt ligger på $y$-aksen. Hvad fortæller det om $b$?`,
      r`Hældningen er $a=\frac{5-(-1)}{3-0}$.`],
    loesning: r`$$a=\frac{5-(-1)}{3-0}=\frac{6}{3}=2$$ <p>Linjen skærer $y$-aksen i $(0,-1)$, så $b=-1$.</p> <p><b>Svar:</b> $l:\ y=2x-1$.</p>` }
]},

{ id: "ag-12", forlaeg: "Vejl. sæt 2, opg. 1c · enkeltopg. 1.D1.24", delproeve: 1, opgave1: true,
  intro: "",
  dele: [
  { bogstav: "", point: 5, kategori: "cirklens-ligning", kraever: ["cirklens-ligning"], sv: 1,
    tekst: r`En cirkel er givet ved ligningen $(x+4)^2+(y-1)^2=49$. Bestem cirklens radius.`,
    hints: [
      r`Højresiden i cirklens ligning er $r^2$.`,
      r`Hvilket positivt tal ganget med sig selv giver $49$?`],
    loesning: r`<p>$r^2=49$, så $r=7$.</p> <p><b>Svar:</b> Radius er $7$.</p>` }
]},

{ id: "ag-13", delproeve: 1, opgave1: true,
  intro: "",
  dele: [
  { bogstav: "", point: 5, kategori: "afstand", kraever: ["afstand-punkter"], sv: 2,
    tekst: r`Bestem afstanden mellem punkterne $(2,5)$ og $(6,8)$.`,
    hints: [
      r`Brug afstandsformlen.`,
      r`Forskellene er $4$ og $3$.`],
    loesning: r`$$\sqrt{(6-2)^2+(8-5)^2}=\sqrt{16+9}=\sqrt{25}=5$$ <p><b>Svar:</b> Afstanden er $5$.</p>` }
]},

{ id: "ag-14", forlaeg: "Enkeltopg. 1.D1.22 (variant)", delproeve: 1, opgave1: true,
  intro: "",
  dele: [
  { bogstav: "", point: 5, kategori: "parallelle", kraever: ["parallelle-linjer"], sv: 1,
    tekst: r`En linje $l$ har ligningen $l:\ y=-4x+2$. En linje $m$ er parallel med $l$. Bestem hældningskoefficienten for $m$.`,
    hints: [
      r`Hvad har parallelle linjer til fælles?`,
      r`Aflæs hældningskoefficienten for $l$.`],
    loesning: r`<p>Parallelle linjer har samme hældningskoefficient.</p> <p><b>Svar:</b> Hældningskoefficienten for $m$ er $-4$.</p>` }
]},

{ id: "ag-15", delproeve: 1,
  intro: r`I et koordinatsystem er punkterne $A(-1,1)$ og $B(5,5)$ givet. En linje $m$ står vinkelret på linjestykket $AB$ og går gennem midtpunktet af $AB$.`,
  figur: { vindue: [-3, 7, -1, 8], objekter: [
    { t: "stykke", x1: -1, y1: 1, x2: 5, y2: 5 }, { t: "linje", a: -1.5, b: 6, navn: "m" },
    { t: "punkt", x: -1, y: 1, navn: "A" }, { t: "punkt", x: 5, y: 5, navn: "B" } ] },
  dele: [
  { bogstav: "a", point: 10, kategori: "ortogonale", kraever: ["ortogonale-linjer", "midtpunkt", "linjens-ligning"], sv: 3,
    tekst: r`Bestem en ligning for linjen $m$.`,
    hints: [
      r`Du skal bruge to ting: et punkt på $m$ og hældningen af $m$. Punktet er midtpunktet af $AB$.`,
      r`Find midtpunktet $M$ og hældningen $a_{AB}$. Hældningen af $m$ opfylder $a_{AB}\cdot a_m=-1$.`],
    loesning: r`$$M\left(\frac{-1+5}{2},\frac{1+5}{2}\right)=M(2,3),\qquad a_{AB}=\frac{5-1}{5-(-1)}=\frac{2}{3}$$ $$\tfrac{2}{3}\cdot a_m=-1 \;\Leftrightarrow\; a_m=-\tfrac{3}{2}$$ $$3=-\tfrac{3}{2}\cdot 2+b \;\Leftrightarrow\; b=6$$ <p><b>Svar:</b> $m:\ y=-\frac{3}{2}x+6$.</p>` }
]},

{ id: "ag-16", delproeve: 1,
  intro: r`En linje $l$ har ligningen $l:\ y=-2x+9$. En anden linje $m$ går gennem punkterne $A(0,1)$ og $B(3,7)$.`,
  dele: [
  { bogstav: "a", point: 10, kategori: "linjens-ligning", kraever: ["linjens-ligning"], sv: 1,
    tekst: r`Bestem en ligning for linjen $m$.`,
    hints: [
      r`Find hældningen med topunktsformlen $a=\frac{y_2-y_1}{x_2-x_1}$.`,
      r`$A$ ligger på $y$-aksen, så $b$ kan aflæses direkte.`],
    loesning: r`$$a=\frac{7-1}{3-0}=2$$ <p>$A(0,1)$ ligger på $y$-aksen, så $b=1$.</p> <p><b>Svar:</b> $m:\ y=2x+1$.</p>` },
  { bogstav: "b", point: 10, kategori: "skaering-linjer", kraever: ["skaering-linjer", "linjens-ligning"], sv: 2,
    tekst: r`Bestem koordinatsættet til skæringspunktet mellem linjen $l$ og linjen $m$.`,
    hints: [
      r`Sæt forskrifterne for $l$ og $m$ lig hinanden.`,
      r`Løs $-2x+9=2x+1$ og indsæt $x$ i en af ligningerne.`],
    loesning: r`$$-2x+9=2x+1 \;\Leftrightarrow\; 4x=8 \;\Leftrightarrow\; x=2$$ $$y=2\cdot 2+1=5$$ <p><b>Svar:</b> Skæringspunktet er $(2,5)$.</p>` }
]},

// ───────────── UDVIDELSE: opgave 1-format (5 point) ─────────────

{ id: "ag-40", forlaeg: "Enkeltopg. 1.D1.20", delproeve: 1, opgave1: true,
  intro: r`På figuren ses to linjer $l$ og $m$.`,
  figur: { aflaes: true, vindue: [-2, 6, -2, 8], objekter: [ { t: "linje", a: 1, b: 1, navn: "l" }, { t: "linje", a: -2, b: 7, navn: "m" } ] },
  dele: [
  { bogstav: "", point: 5, kategori: "skaering-linjer", kraever: ["skaering-linjer"], sv: 1,
    tekst: r`Aflæs koordinatsættet til skæringspunktet mellem de to linjer.`,
    hints: [r`Find det sted på figuren, hvor linjerne krydser hinanden.`, r`Følg tern-linjerne ned til $x$-aksen og over til $y$-aksen.`],
    loesning: r`<p>Linjerne krydser hinanden i punktet $(2,3)$.</p><p><b>Svar:</b> $(2,3)$.</p>` }
]},

{ id: "ag-41", forlaeg: "Enkeltopg. 1.D1.21", delproeve: 1, opgave1: true, intro: "",
  dele: [
  { bogstav: "", point: 5, kategori: "midtpunkt", kraever: ["midtpunkt"], sv: 1,
    tekst: r`I et koordinatsystem er punkterne $P(-3,5)$ og $Q(7,1)$ givet. Bestem koordinatsættet til midtpunktet $M$ for linjestykket $PQ$.`,
    hints: [r`Brug midtpunktsformlen.`, r`$M\left(\frac{x_1+x_2}{2},\frac{y_1+y_2}{2}\right)$.`],
    loesning: r`$$M\left(\frac{-3+7}{2},\frac{5+1}{2}\right)=M(2,3)$$ <p><b>Svar:</b> $M(2,3)$.</p>` }
]},

{ id: "ag-42", forlaeg: "Enkeltopg. 1.D1.22", delproeve: 1, opgave1: true, intro: "",
  dele: [
  { bogstav: "", point: 5, kategori: "ortogonale", kraever: ["ortogonale-linjer"], sv: 1,
    tekst: r`En linje $l$ har hældningen $4$, og en linje $m$ har hældningen $-\frac{1}{2}$. Vis, at linjerne $l$ og $m$ ikke er ortogonale.`,
    hints: [r`Hvad skal produktet af hældningerne være for ortogonale linjer?`, r`Udregn $4\cdot\left(-\frac{1}{2}\right)$.`],
    loesning: r`$$4\cdot\left(-\tfrac{1}{2}\right)=-2\neq -1$$ <p><b>Svar:</b> Produktet af hældningerne er ikke $-1$, så linjerne er ikke ortogonale.</p>` }
]},

{ id: "ag-43", forlaeg: "Enkeltopg. 1.D1.23", delproeve: 1, opgave1: true, intro: "",
  dele: [
  { bogstav: "", point: 5, kategori: "cirklens-ligning", kraever: ["cirklens-ligning"], sv: 1,
    tekst: r`En cirkel er givet ved ligningen $(x+2)^2+(y-6)^2=9$. Bestem koordinatsættet til cirklens centrum.`,
    hints: [r`Sammenlign med $(x-a)^2+(y-b)^2=r^2$, hvor centrum er $(a,b)$.`, r`$x+2=x-(-2)$.`],
    loesning: r`<p>$x+2=x-(-2)$ og $y-6$, så centrum er $(-2,6)$.</p><p><b>Svar:</b> $(-2,6)$.</p>` }
]},

{ id: "ag-44", forlaeg: "Enkeltopg. 1.D1.25", delproeve: 1, opgave1: true,
  intro: r`På figuren ses en linje $l$ og en cirkel. Linjen er tangent til cirklen.`,
  figur: { aflaes: true, vindue: [-2, 7, -2, 6], objekter: [ { t: "cirkel", cx: 2, cy: 1, r: 2.2361 }, { t: "linje", a: -2, b: 10, navn: "l" } ] },
  dele: [
  { bogstav: "", point: 5, kategori: "tangent-cirkel", kraever: ["tangent-cirkel", "cirklens-ligning"], sv: 1,
    tekst: r`Aflæs koordinatsættet til det punkt, hvor linjen rører cirklen.`,
    hints: [r`Røringspunktet er det eneste punkt, linjen og cirklen har fælles.`, r`Aflæs punktet på tern-linjerne.`],
    loesning: r`<p>Linjen rører cirklen i punktet $(4,2)$.</p><p><b>Svar:</b> $(4,2)$.</p>` }
]},

{ id: "ag-45", forlaeg: "Enkeltopg. 1.D1.27", delproeve: 1, opgave1: true, intro: "",
  dele: [
  { bogstav: "", point: 5, kategori: "linjens-ligning", kraever: ["linjens-ligning"], sv: 1,
    tekst: r`En linje $l:\ y=a\cdot x+b$ har hældningen $a=-3$ og går gennem punktet $P(2,1)$. Bestem tallet $b$.`,
    hints: [r`Indsæt $a$ og punktets koordinater i $y=ax+b$.`, r`$1=-3\cdot 2+b$.`],
    loesning: r`$$1=-3\cdot 2+b \;\Leftrightarrow\; b=7$$ <p><b>Svar:</b> $b=7$.</p>` }
]},

{ id: "ag-46", forlaeg: "Enkeltopg. 1.D1.28", delproeve: 1, opgave1: true, intro: "",
  dele: [
  { bogstav: "", point: 5, kategori: "linjens-ligning", kraever: ["linjens-ligning"], sv: 1,
    tekst: r`En linje $l$ er givet ved ligningen $y=4x-11$. Undersøg, om punktet $P(5,10)$ ligger på linjen $l$.`,
    hints: [r`Indsæt $x=5$ i ligningen og sammenlign med $y=10$.`, r`$4\cdot 5-11=\,?$`],
    loesning: r`$$4\cdot 5-11=9\neq 10$$ <p><b>Svar:</b> $P$ ligger ikke på linjen $l$.</p>` }
]},

// ───────────── UDVIDELSE: delprøve 1 (10 point) ─────────────

{ id: "ag-47", forlaeg: "Eksamen 11. aug. 2026, opg. 6", delproeve: 1,
  intro: r`I et koordinatsystem er punkterne $P(1,-1)$ og $Q(4,3)$ givet.`,
  dele: [
  { bogstav: "a", point: 10, kategori: "afstand", kraever: ["afstand-punkter"], sv: 2,
    tekst: r`Bestem afstanden $|PQ|$ mellem punktet $P$ og punktet $Q$.`,
    hints: [r`Brug afstandsformlen.`, r`Forskellene er $3$ i $x$-retningen og $4$ i $y$-retningen.`],
    loesning: r`$$|PQ|=\sqrt{(4-1)^2+(3-(-1))^2}=\sqrt{9+16}=5$$ <p><b>Svar:</b> $|PQ|=5$.</p>` },
  { bogstav: "b", point: 10, kategori: "linjens-ligning", kraever: ["linjens-ligning"], sv: 2,
    tekst: r`En linje $l$ går gennem punkterne $P$ og $Q$. Bestem en ligning for linjen $l$.`,
    hints: [r`Find hældningen med topunktsformlen.`, r`$a=\frac{4}{3}$. Indsæt $P(1,-1)$ i $y=\frac{4}{3}x+b$.`],
    loesning: r`$$a=\frac{3-(-1)}{4-1}=\frac{4}{3}$$ $$-1=\tfrac{4}{3}\cdot 1+b \;\Leftrightarrow\; b=-\tfrac{7}{3}$$ <p><b>Svar:</b> $l:\ y=\frac{4}{3}x-\frac{7}{3}$.</p>` }
]},

{ id: "ag-48", forlaeg: "Eksamen 26. maj 2026, opg. 8", delproeve: 1,
  intro: r`En linje $l$ har ligningen $l:\ y=-3x+2$. En linje $m$ står vinkelret på linjen $l$ og går gennem punktet $P(6,5)$. Se figuren.`,
  figur: { vindue: [-3, 9, -3, 9], objekter: [ { t: "linje", a: -3, b: 2, navn: "l" }, { t: "linje", a: 0.3333, b: 3, navn: "m" }, { t: "punkt", x: 6, y: 5, navn: "P" } ] },
  dele: [
  { bogstav: "a", point: 10, kategori: "ortogonale", kraever: ["ortogonale-linjer", "linjens-ligning"], sv: 2,
    tekst: r`Bestem hældningskoefficienten for linjen $m$. Bestem en ligning for $m$.`,
    hints: [r`For ortogonale linjer gælder $a_l\cdot a_m=-1$.`, r`$-3\cdot a_m=-1$ giver $a_m=\frac{1}{3}$. Indsæt $P(6,5)$ i $y=\frac{1}{3}x+b$.`],
    loesning: r`$$-3\cdot a_m=-1 \;\Leftrightarrow\; a_m=\tfrac{1}{3}$$ $$5=\tfrac{1}{3}\cdot 6+b \;\Leftrightarrow\; b=3$$ <p><b>Svar:</b> Hældningskoefficienten er $\frac{1}{3}$, og $m:\ y=\frac{1}{3}x+3$.</p>` }
]},

{ id: "ag-49", forlaeg: "Eksamen 28. maj 2026, opg. 7", delproeve: 1,
  intro: r`To linjer $l$ og $m$ er givet ved ligningerne $l:\ y=3x-2$ og $m:\ y=-2x+13$.`,
  dele: [
  { bogstav: "a", point: 10, kategori: "skaering-linjer", kraever: ["skaering-linjer"], sv: 2,
    tekst: r`Bestem koordinatsættet til skæringspunktet mellem linjen $l$ og linjen $m$.`,
    hints: [r`Sæt de to forskrifter lig hinanden.`, r`$3x-2=-2x+13$.`],
    loesning: r`$$3x-2=-2x+13 \;\Leftrightarrow\; 5x=15 \;\Leftrightarrow\; x=3$$ $$y=3\cdot 3-2=7$$ <p><b>Svar:</b> Skæringspunktet er $(3,7)$.</p>` }
]},

{ id: "ag-50", forlaeg: "Enkeltopg. 3.D1.24", delproeve: 1,
  intro: r`To linjer $l$ og $m$ er givet ved ligningerne $$l:\ y=4x-7\qquad m:\ y=-3x+7$$`,
  dele: [
  { bogstav: "a", point: 10, kategori: "skaering-linjer", kraever: ["skaering-linjer"], sv: 2,
    tekst: r`Bestem koordinatsættet til skæringspunktet mellem $l$ og $m$.`,
    hints: [r`Sæt de to forskrifter lig hinanden.`, r`$4x-7=-3x+7$.`],
    loesning: r`$$4x-7=-3x+7 \;\Leftrightarrow\; 7x=14 \;\Leftrightarrow\; x=2$$ $$y=4\cdot 2-7=1$$ <p><b>Svar:</b> Skæringspunktet er $(2,1)$.</p>` }
]},

{ id: "ag-51", forlaeg: "Vejl. sæt 1, opg. 8", delproeve: 1,
  intro: r`En cirkel er givet ved ligningen $(x+1)^2+(y-2)^2=10$.`,
  dele: [
  { bogstav: "a", point: 10, kategori: "cirklens-ligning", kraever: ["cirklens-ligning"], sv: 1,
    tekst: r`Gør rede for, at punktet $P(2,3)$ ligger på cirklen.`,
    hints: [r`Indsæt punktets koordinater i cirklens ligning.`, r`Udregn $(2+1)^2+(3-2)^2$.`],
    loesning: r`$$(2+1)^2+(3-2)^2=9+1=10$$ <p><b>Svar:</b> Koordinaterne passer i ligningen, så $P$ ligger på cirklen.</p>` },
  { bogstav: "b", point: 10, kategori: "tangent-cirkel", kraever: ["tangent-cirkel", "cirklens-ligning", "ortogonale-linjer"], sv: 2,
    tekst: r`Bestem hældningskoefficienten for tangenten til cirklen i punktet $P$.`,
    hints: [r`Tangenten står vinkelret på radius fra centrum til $P$. Hvad er centrum?`, r`Centrum er $(-1,2)$. Find hældningen af radius og brug $a_r\cdot a_t=-1$.`],
    loesning: r`<p>Centrum er $C(-1,2)$.</p> $$a_{CP}=\frac{3-2}{2-(-1)}=\frac{1}{3}\quad\Rightarrow\quad a_t=-3$$ <p><b>Svar:</b> Tangentens hældningskoefficient er $-3$.</p>` }
]},

{ id: "ag-52", forlaeg: "Enkeltopg. 3.D1.25", delproeve: 1,
  intro: r`En linje $l$ har ligningen $l:\ y=2x+5$, og en anden linje $m$ har ligningen $m:\ y=c\cdot x-3$, hvor $c$ er et tal.`,
  dele: [
  { bogstav: "a", point: 10, kategori: "ortogonale", kraever: ["ortogonale-linjer"], sv: 2,
    tekst: r`Bestem værdien af $c$, så linjerne $l$ og $m$ er ortogonale.`,
    hints: [r`$c$ er hældningen af $m$.`, r`Løs $2\cdot c=-1$.`],
    loesning: r`$$2\cdot c=-1 \;\Leftrightarrow\; c=-\tfrac{1}{2}$$ <p><b>Svar:</b> $c=-\frac{1}{2}$.</p>` }
]},

{ id: "ag-53", forlaeg: "Enkeltopg. 3.D1.26", delproeve: 1,
  intro: r`I et koordinatsystem er givet tre punkter $A(-4,-1)$, $B(0,1)$ og $C(10,7)$.`,
  dele: [
  { bogstav: "a", point: 10, kategori: "linjens-ligning", kraever: ["linjens-ligning"], sv: 3,
    tekst: r`Undersøg, om punkterne $A$, $B$ og $C$ ligger på en ret linje.`,
    hints: [r`Hvis de tre punkter ligger på samme linje, er hældningen fra $A$ til $B$ den samme som fra $B$ til $C$.`, r`Udregn $a_{AB}$ og $a_{BC}$ med topunktsformlen.`],
    loesning: r`$$a_{AB}=\frac{1-(-1)}{0-(-4)}=\frac{2}{4}=\frac{1}{2},\qquad a_{BC}=\frac{7-1}{10-0}=\frac{6}{10}=\frac{3}{5}$$ <p><b>Svar:</b> Hældningerne er forskellige, så $A$, $B$ og $C$ ligger ikke på en ret linje.</p>` }
]},

{ id: "ag-54", forlaeg: "Enkeltopg. 3.D1.27", delproeve: 1,
  intro: r`En linje $l$ er givet ved ligningen $y=-\frac{1}{2}x+3$. Linjen $m$ står vinkelret på $l$ og går gennem punktet $P(0,-4)$.`,
  dele: [
  { bogstav: "a", point: 10, kategori: "ortogonale", kraever: ["ortogonale-linjer", "linjens-ligning"], sv: 2,
    tekst: r`Bestem en ligning for $m$.`,
    hints: [r`Find hældningen af $m$ med $a_l\cdot a_m=-1$.`, r`$P$ ligger på $y$-aksen. Hvad betyder det for $b$?`],
    loesning: r`$$-\tfrac{1}{2}\cdot a_m=-1 \;\Leftrightarrow\; a_m=2$$ <p>$P(0,-4)$ ligger på $y$-aksen, så $b=-4$.</p> <p><b>Svar:</b> $m:\ y=2x-4$.</p>` }
]},

{ id: "ag-55", forlaeg: "Enkeltopg. 3.D1.28", delproeve: 1,
  intro: r`To linjer $l$ og $m$ er givet ved ligningerne $$l:\ y=2x+4\qquad m:\ y=-\tfrac{1}{2}x+4$$`,
  figur: { vindue: [-4, 10, -2, 7], objekter: [ { t: "linje", a: 2, b: 4, navn: "l" }, { t: "linje", a: -0.5, b: 4, navn: "m" } ] },
  dele: [
  { bogstav: "a", point: 10, kategori: "ortogonale", kraever: ["ortogonale-linjer"], sv: 1,
    tekst: r`Undersøg, om linjerne $l$ og $m$ er ortogonale.`,
    hints: [r`Udregn produktet af hældningerne.`, r`$2\cdot\left(-\frac{1}{2}\right)=\,?$`],
    loesning: r`$$2\cdot\left(-\tfrac{1}{2}\right)=-1$$ <p><b>Svar:</b> Linjerne er ortogonale.</p>` },
  { bogstav: "b", point: 10, kategori: "skaering-linjer", kraever: ["skaering-linjer", "linjens-ligning"], sv: 3,
    tekst: r`Sammen med $x$-aksen afgrænser $l$ og $m$ et trekantet område $M$. Se figuren. Bestem arealet af $M$.`,
    hints: [r`Trekantens hjørner er de to linjers skæringspunkter med $x$-aksen og skæringspunktet mellem $l$ og $m$.`, r`Grundlinjen ligger på $x$-aksen. Højden er $y$-værdien i skæringspunktet mellem $l$ og $m$.`],
    loesning: r`<p>Skæring med $x$-aksen ($y=0$):</p> $$2x+4=0 \Leftrightarrow x=-2,\qquad -\tfrac{1}{2}x+4=0 \Leftrightarrow x=8$$ <p>Skæring mellem $l$ og $m$: $2x+4=-\frac{1}{2}x+4 \Leftrightarrow x=0$, og $y=4$.</p> $$T=\tfrac{1}{2}\cdot(8-(-2))\cdot 4=20$$ <p><b>Svar:</b> Arealet af $M$ er $20$.</p>` }
]},

{ id: "ag-56", forlaeg: "Enkeltopg. 3.D1.29", delproeve: 1,
  intro: r`En cirkel har centrum i punktet $C(-1,4)$ og radius $r=3$.`,
  dele: [
  { bogstav: "a", point: 10, kategori: "cirklens-ligning", kraever: ["cirklens-ligning"], sv: 1,
    tekst: r`Bestem en ligning for cirklen.`,
    hints: [r`Brug $(x-a)^2+(y-b)^2=r^2$.`, r`$x-(-1)=x+1$.`],
    loesning: r`<p><b>Svar:</b> $(x+1)^2+(y-4)^2=9$.</p>` },
  { bogstav: "b", point: 10, kategori: "cirklens-ligning", kraever: ["cirklens-ligning"], sv: 2,
    tekst: r`Vis, at punktet $P(2,7)$ ligger uden for cirklen.`,
    hints: [r`Indsæt $P$ i venstresiden af cirklens ligning og sammenlign med $r^2$.`, r`Er venstresiden større end $9$, er $P$ længere fra centrum end radius.`],
    loesning: r`$$(2+1)^2+(7-4)^2=9+9=18>9$$ <p><b>Svar:</b> Afstanden fra $P$ til centrum er større end radius, så $P$ ligger uden for cirklen.</p>` }
]},

{ id: "ag-57", forlaeg: "Enkeltopg. 3.D1.30", delproeve: 1,
  intro: r`En cirkel er givet ved ligningen $(x-4)^2+(y+1)^2=25$.`,
  dele: [
  { bogstav: "a", point: 10, kategori: "cirklens-ligning", kraever: ["cirklens-ligning"], sv: 1,
    tekst: r`Bestem cirklens radius og koordinatsættet til cirklens centrum.`,
    hints: [r`Sammenlign med $(x-a)^2+(y-b)^2=r^2$.`, r`Pas på fortegnet ved $y+1$.`],
    loesning: r`<p><b>Svar:</b> Centrum er $(4,-1)$, og radius er $5$.</p>` },
  { bogstav: "b", point: 10, kategori: "linje-cirkel", kraever: ["cirklens-ligning", "skaering-linje-cirkel"], sv: 2,
    tekst: r`Bestem koordinatsættet til hvert af cirklens skæringspunkter med $y$-aksen.`,
    hints: [r`På $y$-aksen er $x=0$. Indsæt $x=0$ i cirklens ligning.`, r`Du får $16+(y+1)^2=25$, altså $(y+1)^2=9$.`],
    loesning: r`$$(0-4)^2+(y+1)^2=25 \;\Leftrightarrow\; (y+1)^2=9 \;\Leftrightarrow\; y+1=\pm 3$$ <p>Det giver $y=2$ eller $y=-4$.</p> <p><b>Svar:</b> $(0,2)$ og $(0,-4)$.</p>` }
]},

{ id: "ag-58", forlaeg: "Enkeltopg. 3.D1.31", delproeve: 1,
  intro: r`På figuren ses en cirkel givet ved ligningen $x^2-2x+y^2+6y-15=0$ og en lodret linje $l$ givet ved ligningen $l:\ x=4$.`,
  figur: { vindue: [-6, 8, -9, 3], objekter: [ { t: "cirkel", cx: 1, cy: -3, r: 5 }, { t: "lodret", x: 4, navn: "l" } ] },
  dele: [
  { bogstav: "a", point: 10, kategori: "linje-cirkel", kraever: ["cirklens-ligning", "kvadratkomplettering", "skaering-linje-cirkel"], sv: 3,
    tekst: r`Bestem koordinatsættene til hvert af skæringspunkterne mellem cirklen og linjen $l$.`,
    hints: [r`Indsæt $x=4$ i cirklens ligning. Du kan med fordel først omskrive cirklens ligning ved kvadratkomplettering.`, r`$(x-1)^2+(y+3)^2=25$. Med $x=4$ fås $9+(y+3)^2=25$.`],
    loesning: r`$$x^2-2x+y^2+6y-15=0 \;\Leftrightarrow\; (x-1)^2+(y+3)^2=25$$ $$(4-1)^2+(y+3)^2=25 \;\Leftrightarrow\; (y+3)^2=16 \;\Leftrightarrow\; y+3=\pm 4$$ <p>Det giver $y=1$ eller $y=-7$.</p> <p><b>Svar:</b> $(4,1)$ og $(4,-7)$.</p>` }
]},

{ id: "ag-59", forlaeg: "Enkeltopg. 3.D1.32", delproeve: 1,
  intro: r`En cirkel er givet ved ligningen $(x+2)^2+(y-1)^2=25$.`,
  dele: [
  { bogstav: "a", point: 10, kategori: "cirklens-ligning", kraever: ["cirklens-ligning"], sv: 1,
    tekst: r`Vis, at punktet $P(1,5)$ ligger på cirklen.`,
    hints: [r`Indsæt $P$ i cirklens ligning.`, r`$(1+2)^2+(5-1)^2=\,?$`],
    loesning: r`$$(1+2)^2+(5-1)^2=9+16=25$$ <p><b>Svar:</b> $P$ ligger på cirklen.</p>` },
  { bogstav: "b", point: 10, kategori: "tangent-cirkel", kraever: ["tangent-cirkel", "cirklens-ligning", "ortogonale-linjer", "linjens-ligning"], sv: 3,
    tekst: r`Bestem en ligning for tangenten til cirklen i $P$.`,
    hints: [r`Tangenten står vinkelret på radius fra centrum $(-2,1)$ til $P$.`, r`$a_{CP}=\frac{4}{3}$, så tangentens hældning er $-\frac{3}{4}$. Indsæt $P$ i $y=-\frac{3}{4}x+b$.`],
    loesning: r`$$a_{CP}=\frac{5-1}{1-(-2)}=\frac{4}{3}\quad\Rightarrow\quad a_t=-\frac{3}{4}$$ $$5=-\tfrac{3}{4}\cdot 1+b \;\Leftrightarrow\; b=\tfrac{23}{4}$$ <p><b>Svar:</b> $y=-\frac{3}{4}x+\frac{23}{4}$.</p>` }
]},

{ id: "ag-60", forlaeg: "Enkeltopg. 3.D1.33", delproeve: 1,
  intro: r`En cirkel er givet ved ligningen $x^2-8x+y^2+2y+8=0$.`,
  dele: [
  { bogstav: "a", point: 10, kategori: "cirklens-ligning", kraever: ["cirklens-ligning", "kvadratkomplettering"], sv: 3,
    tekst: r`Vis, at cirklen har centrum i $C(4,-1)$.`,
    hints: [r`Omskriv ligningen ved kvadratkomplettering.`, r`$x^2-8x=(x-4)^2-16$ og $y^2+2y=(y+1)^2-1$.`],
    loesning: r`$$(x-4)^2-16+(y+1)^2-1+8=0 \;\Leftrightarrow\; (x-4)^2+(y+1)^2=9$$ <p><b>Svar:</b> Ligningen har formen $(x-4)^2+(y-(-1))^2=3^2$, så centrum er $C(4,-1)$.</p>` }
]},

{ id: "ag-61", forlaeg: "Enkeltopg. 3.D1.35", delproeve: 1,
  intro: r`Figuren viser to punkter $A(-2,5)$ og $B(6,-1)$. $M$ betegner midtpunktet af linjestykket $AB$.`,
  figur: { vindue: [-4, 8, -3, 7], objekter: [ { t: "stykke", x1: -2, y1: 5, x2: 6, y2: -1 }, { t: "punkt", x: -2, y: 5, navn: "A" }, { t: "punkt", x: 6, y: -1, navn: "B" } ] },
  dele: [
  { bogstav: "a", point: 10, kategori: "midtpunkt", kraever: ["midtpunkt"], sv: 1,
    tekst: r`Bestem koordinatsættet til $M$.`,
    hints: [r`Brug midtpunktsformlen.`, r`$M\left(\frac{-2+6}{2},\frac{5+(-1)}{2}\right)$.`],
    loesning: r`$$M\left(\frac{-2+6}{2},\frac{5-1}{2}\right)=M(2,2)$$ <p><b>Svar:</b> $M(2,2)$.</p>` }
]},

{ id: "ag-62", forlaeg: "Enkeltopg. 3.D1.37", delproeve: 1,
  intro: r`En trekant $ABC$ har vinkelspidserne $A(1,2)$, $B(4,6)$ og $C(8,3)$.`,
  dele: [
  { bogstav: "a", point: 10, kategori: "afstand", kraever: ["afstand-punkter"], sv: 3,
    tekst: r`Gør rede for, at trekant $ABC$ har netop to lige lange sider.`,
    hints: [r`Bestem længden af alle tre sider med afstandsformlen.`, r`Udregn $|AB|$, $|BC|$ og $|AC|$ og sammenlign.`],
    loesning: r`$$|AB|=\sqrt{3^2+4^2}=5,\quad |BC|=\sqrt{4^2+(-3)^2}=5,\quad |AC|=\sqrt{7^2+1^2}=\sqrt{50}$$ <p><b>Svar:</b> $|AB|=|BC|=5$, mens $|AC|=\sqrt{50}\neq 5$. Trekanten har altså netop to lige lange sider.</p>` }
]},

{ id: "ag-63", forlaeg: "Enkeltopg. 3.D1.38", delproeve: 1,
  intro: r`Figuren viser to cirkler $C_1$ og $C_2$.`,
  figur: { vindue: [-7, 7, -6, 6], objekter: [ { t: "cirkel", cx: -3, cy: 2, r: 3, navn: "C₁" }, { t: "cirkel", cx: 3, cy: -2, r: 3, navn: "C₂" } ] },
  dele: [
  { bogstav: "a", point: 10, kategori: "cirklens-ligning", kraever: ["cirklens-ligning"], sv: 1,
    tekst: r`Gør rede for, hvilken af cirklerne der har ligningen $(x-3)^2+(y+2)^2=9$.`,
    hints: [r`Find centrum og radius ud fra ligningen.`, r`Centrum er $(3,-2)$. Hvilken cirkel har centrum dér?`],
    loesning: r`<p>Ligningen beskriver en cirkel med centrum $(3,-2)$ og radius $3$. Begge cirkler har radius $3$, men kun $C_2$ har centrum i $(3,-2)$.</p><p><b>Svar:</b> Det er $C_2$.</p>` }
]},

{ id: "ag-64", forlaeg: "Enkeltopg. 3.D1.39", delproeve: 1,
  intro: r`En cirkel er givet ved ligningen $(x+2)^2+(y-1)^2=16$, og en vandret linje $l$ er givet ved ligningen $y=4$.`,
  dele: [
  { bogstav: "a", point: 10, kategori: "linje-cirkel", kraever: ["cirklens-ligning", "skaering-linje-cirkel"], sv: 2,
    tekst: r`Gør rede for, at linjen $l$ og cirklen har to punkter fælles.`,
    hints: [r`Find cirklens centrum og radius. Hvor langt er der fra centrum op til linjen $y=4$?`, r`Eller: indsæt $y=4$ i cirklens ligning og se, hvor mange løsninger der er.`],
    loesning: r`<p>Centrum er $(-2,1)$ og radius $4$. Den lodrette afstand fra centrum til linjen $y=4$ er $4-1=3$.</p><p>Da $3<4$, skærer linjen cirklen i to punkter.</p><p>(Alternativt: $(x+2)^2+9=16 \Leftrightarrow (x+2)^2=7$, som har to løsninger.)</p><p><b>Svar:</b> Linjen og cirklen har to punkter fælles.</p>` }
]},

{ id: "ag-65", forlaeg: "Enkeltopg. 3.D1.40", delproeve: 1,
  intro: r`En cirkel har ligningen $(x+3)^2+(y-5)^2=8$, og en linje $l$ har ligningen $y=-2x+1$.`,
  dele: [
  { bogstav: "a", point: 10, kategori: "parallelle", kraever: ["parallelle-linjer", "cirklens-ligning", "linjens-ligning"], sv: 2,
    tekst: r`Bestem en ligning for den linje $m$, der er parallel med $l$, og som går gennem cirklens centrum.`,
    hints: [r`Find cirklens centrum. $m$ har samme hældning som $l$.`, r`Centrum er $(-3,5)$. Indsæt i $y=-2x+b$.`],
    loesning: r`<p>Centrum er $(-3,5)$, og $m$ har hældningen $-2$.</p> $$5=-2\cdot(-3)+b \;\Leftrightarrow\; b=-1$$ <p><b>Svar:</b> $m:\ y=-2x-1$.</p>` }
]},

{ id: "ag-66", forlaeg: "Enkeltopg. 3.D1.41", delproeve: 1,
  intro: r`En cirkel har ligningen $(x-2)^2+(y+1)^2=4$, og en linje $l$ har ligningen $y=x+3$.`,
  dele: [
  { bogstav: "a", point: 10, kategori: "linje-cirkel", kraever: ["cirklens-ligning", "skaering-linje-cirkel"], sv: 3,
    tekst: r`Gør rede for, at linjen ikke skærer cirklen.`,
    hints: [r`Indsæt $y=x+3$ i cirklens ligning og undersøg, om den andengradsligning, du får, har løsninger.`, r`Du får $(x-2)^2+(x+4)^2=4$. Gang ud, saml leddene og beregn diskriminanten.`],
    loesning: r`$$(x-2)^2+(x+3+1)^2=4 \;\Leftrightarrow\; 2x^2+4x+16=0 \;\Leftrightarrow\; x^2+2x+8=0$$ $$d=2^2-4\cdot 1\cdot 8=-28<0$$ <p><b>Svar:</b> Ligningen har ingen løsninger, så linjen skærer ikke cirklen.</p><p>(Alternativt: afstanden fra centrum $(2,-1)$ til $l$ er $\frac{|2+3+1|}{\sqrt{2}}=\frac{6}{\sqrt 2}\approx 4{,}2$, som er større end radius $2$.)</p>` }
]},

// ───────────────────────── DELPRØVE 2 ─────────────────────────

{ id: "ag-20", forlaeg: "Vejl. sæt 2, opg. 11", delproeve: 2,
  intro: r`Linjen $l$ er givet ved ligningen $l:\ y=2x-3$. Punktet $P$ har koordinatsættet $P(7,1)$.`,
  dele: [
  { bogstav: "a", point: 10, kategori: "punkt-linje", kraever: ["afstand-punkt-linje"], sv: 2,
    tekst: r`Bestem afstanden mellem punktet $P$ og linjen $l$.`,
    hints: [
      r`Find formlen for afstanden fra et punkt til en linje i formelsamlingen.`,
      r`For $y=ax+b$ og punktet $(x_1,y_1)$ er afstanden $\frac{|a x_1+b-y_1|}{\sqrt{a^2+1}}$. Her er $a=2$ og $b=-3$.`],
    loesning: r`$$\text{dist}(P,l)=\frac{|2\cdot 7-3-1|}{\sqrt{2^2+1}}=\frac{10}{\sqrt{5}}\approx 4{,}47$$ <p><b>Svar:</b> Afstanden er ca. $4{,}47$.</p>` },
  { bogstav: "b", point: 10, kategori: "parallelle", kraever: ["parallelle-linjer", "linjens-ligning"], sv: 2,
    tekst: r`Linjen $m$ er parallel med linjen $l$ og går gennem punktet $P$. Bestem en ligning for linjen $m$.`,
    hints: [
      r`Parallelle linjer har samme hældning.`,
      r`Indsæt $P(7,1)$ i $y=2x+b$ og løs for $b$.`],
    loesning: r`$$1=2\cdot 7+b \;\Leftrightarrow\; b=-13$$ <p><b>Svar:</b> $m:\ y=2x-13$.</p>` }
]},

{ id: "ag-21", forlaeg: "Vejl. sæt 1, opg. 11", delproeve: 2,
  intro: r`En linje $l$ er givet ved ligningen $l:\ y=1{,}6x-2$.`,
  dele: [
  { bogstav: "a", point: 10, kategori: "haeldningsvinkel", kraever: ["haeldningsvinkel"], sv: 2,
    tekst: r`Bestem ved beregning hældningsvinklen $v$ for linjen $l$.`,
    hints: [
      r`Hældningsvinklen $v$ og hældningskoefficienten $a$ hænger sammen ved $\tan(v)=a$.`,
      r`Løs $\tan(v)=1{,}6$. Husk at dit værktøj skal regne i grader.`],
    loesning: r`$$\tan(v)=1{,}6 \;\Leftrightarrow\; v=\tan^{-1}(1{,}6)\approx 58{,}0^\circ$$ <p><b>Svar:</b> Hældningsvinklen er ca. $58{,}0^\circ$.</p>` },
  { bogstav: "b", point: 10, kategori: "haeldningsvinkel", kraever: ["haeldningsvinkel", "linjens-ligning"], sv: 2,
    tekst: r`En linje $m$ har hældningsvinklen $30^\circ$ og går gennem punktet $P(1,4)$. Bestem en ligning for linjen $m$.`,
    hints: [
      r`Find først hældningskoefficienten for $m$ ud fra hældningsvinklen.`,
      r`$a=\tan(30^\circ)\approx 0{,}577$. Indsæt derefter $P$ i $y=ax+b$.`],
    loesning: r`$$a=\tan(30^\circ)\approx 0{,}577$$ $$4=0{,}577\cdot 1+b \;\Leftrightarrow\; b\approx 3{,}42$$ <p><b>Svar:</b> $m:\ y=0{,}577x+3{,}42$.</p>` }
]},

{ id: "ag-22", delproeve: 2,
  intro: r`To linjer er givet ved ligningerne $l:\ y=3x+1$ og $m:\ y=\frac{1}{2}x+2$. Linjerne skærer hinanden. Se figuren.`,
  figur: { vindue: [-3, 4, -3, 6], objekter: [
    { t: "linje", a: 3, b: 1, navn: "l" }, { t: "linje", a: 0.5, b: 2, navn: "m" } ] },
  dele: [
  { bogstav: "a", point: 10, kategori: "haeldningsvinkel", kraever: ["haeldningsvinkel"], sv: 3,
    tekst: r`Bestem den spidse vinkel mellem linjen $l$ og linjen $m$.`,
    hints: [
      r`Hver linje danner sin egen vinkel med $x$-aksen. Hvordan kan de to vinkler bruges til at finde vinklen mellem linjerne?`,
      r`Find hældningsvinklerne $v_l$ og $v_m$ med $\tan(v)=a$. Vinklen mellem linjerne er forskellen $v_l-v_m$.`],
    loesning: r`$$v_l=\tan^{-1}(3)\approx 71{,}57^\circ,\qquad v_m=\tan^{-1}\!\left(\tfrac{1}{2}\right)\approx 26{,}57^\circ$$ $$v_l-v_m\approx 45{,}0^\circ$$ <p><b>Svar:</b> Den spidse vinkel mellem linjerne er $45^\circ$.</p>` }
]},

{ id: "ag-23", forlaeg: "Eksamen 11. aug. 2026, opg. 12", delproeve: 2,
  intro: r`En linje $l$ er givet ved ligningen $l:\ y=\frac{1}{2}x+1$. Linjen $l$ er tangent til en cirkel med centrum i punktet $C(6,-1)$. Se figuren.`,
  figur: { vindue: [-2, 12, -7, 7], objekter: [
    { t: "linje", a: 0.5, b: 1, navn: "l" }, { t: "cirkel", cx: 6, cy: -1, r: 4.4721 },
    { t: "punkt", x: 6, y: -1, navn: "C" } ] },
  dele: [
  { bogstav: "a", point: 10, kategori: "punkt-linje", kraever: ["afstand-punkt-linje", "cirklens-ligning"], sv: 2,
    tekst: r`Bestem afstanden mellem $C$ og $l$ ved brug af en formel. Bestem en ligning for cirklen.`,
    hints: [
      r`Når $l$ er tangent, er afstanden fra centrum til $l$ lig med cirklens radius.`,
      r`Brug afstandsformlen for punkt og linje med $a=\frac{1}{2}$, $b=1$ og $C(6,-1)$. Indsæt derefter $r$ i cirklens ligning.`],
    loesning: r`$$r=\text{dist}(C,l)=\frac{|\frac{1}{2}\cdot 6+1-(-1)|}{\sqrt{(\frac{1}{2})^2+1}}=\frac{5}{\sqrt{1{,}25}}\approx 4{,}47$$ <p>Da $r^2=\frac{25}{1{,}25}=20$:</p> <p><b>Svar:</b> Afstanden er ca. $4{,}47$, og cirklen har ligningen $(x-6)^2+(y+1)^2=20$.</p>` },
  { bogstav: "b", point: 10, kategori: "linje-cirkel", kraever: ["skaering-linje-cirkel", "afstand-punkt-linje", "cirklens-ligning"], sv: 2,
    tekst: r`Bestem koordinatsættet til røringspunktet mellem linjen $l$ og cirklen.`,
    hints: [
      r`Røringspunktet er det (eneste) fælles punkt for linjen og cirklen.`,
      r`Løs ligningssystemet bestående af linjens og cirklens ligning. Brug Løs i GeoGebra.`],
    loesning: r`<p>Ligningssystemet løses med CAS (Løs i GeoGebra):</p> $$y=\tfrac{1}{2}x+1,\qquad (x-6)^2+(y+1)^2=20$$ <p>Der er én løsning: $x=4$, $y=3$.</p> <p><b>Svar:</b> Røringspunktet er $(4,3)$.</p>` }
]},

{ id: "ag-24", forlaeg: "Eksamen 26. maj 2026, opg. 10", delproeve: 2,
  intro: r`En cirkel har centrum i $C(10,4)$ og radius $6$.`,
  figur: { vindue: [-4, 18, -4, 12], objekter: [
    { t: "cirkel", cx: 10, cy: 4, r: 6 }, { t: "punkt", x: 10, y: 4, navn: "C" }, { t: "punkt", x: -2, y: 9, navn: "P" } ] },
  dele: [
  { bogstav: "a", point: 10, kategori: "cirklens-ligning", kraever: ["cirklens-ligning"], sv: 1,
    tekst: r`Bestem en ligning for cirklen.`,
    hints: [
      r`Brug $(x-a)^2+(y-b)^2=r^2$.`,
      r`$a=10$, $b=4$ og $r^2=36$.`],
    loesning: r`<p><b>Svar:</b> $(x-10)^2+(y-4)^2=36$.</p>` },
  { bogstav: "b", point: 10, kategori: "cirklens-ligning", kraever: ["cirklens-ligning", "afstand-punkter"], sv: 2,
    tekst: r`Punktet $P$ har koordinatsættet $P(-2,9)$. Bestem ved beregning afstanden $d$ fra punktet $P$ til cirklen. Se figuren.`,
    hints: [
      r`Den korteste vej fra $P$ til cirklen går langs linjen gennem centrum.`,
      r`Find $|PC|$ og træk radius fra.`],
    loesning: r`$$|PC|=\sqrt{(10-(-2))^2+(4-9)^2}=\sqrt{144+25}=13$$ $$d=|PC|-r=13-6=7$$ <p><b>Svar:</b> Afstanden fra $P$ til cirklen er $7$.</p>` }
]},

{ id: "ag-25", forlaeg: "Enkeltopg. 3.D2.3a", delproeve: 2,
  intro: r`En cirkel er givet ved ligningen $(x-3)^2+(y-1)^2=25$, og en linje er givet ved ligningen $l:\ y=x+3$.`,
  figur: { vindue: [-4, 10, -6, 8], objekter: [
    { t: "cirkel", cx: 3, cy: 1, r: 5 }, { t: "linje", a: 1, b: 3, navn: "l" } ] },
  dele: [
  { bogstav: "a", point: 10, kategori: "linje-cirkel", kraever: ["skaering-linje-cirkel", "cirklens-ligning"], sv: 2,
    tekst: r`Bestem koordinatsættene til skæringspunkterne mellem cirklen og linjen $l$.`,
    hints: [
      r`Skæringspunkterne opfylder både cirklens og linjens ligning.`,
      r`Løs ligningssystemet med Løs i GeoGebra – eller indsæt $y=x+3$ i cirklens ligning og løs for $x$.`],
    loesning: r`<p>Med CAS (Løs i GeoGebra) løses</p> $$(x-3)^2+(y-1)^2=25,\qquad y=x+3$$ <p>Løsningerne er $(x,y)=(-2,1)$ og $(x,y)=(3,6)$.</p> <p><b>Svar:</b> Skæringspunkterne er $(-2,1)$ og $(3,6)$.</p>` },
  { bogstav: "b", point: 10, kategori: "afstand", kraever: ["afstand-punkter", "skaering-linje-cirkel", "cirklens-ligning"], sv: 2,
    tekst: r`Bestem afstanden mellem de to skæringspunkter.`,
    hints: [
      r`Brug afstandsformlen på de to punkter fra a).`,
      r`Forskellene i $x$ og $y$ er begge $5$.`],
    loesning: r`$$\sqrt{(3-(-2))^2+(6-1)^2}=\sqrt{50}\approx 7{,}07$$ <p><b>Svar:</b> Afstanden er ca. $7{,}07$.</p>` }
]},

{ id: "ag-26", forlaeg: "Enkeltopg. 3.D2.8b", delproeve: 2,
  intro: r`En cirkel er givet ved ligningen $x^2+y^2=20$. En linje $l$ er givet ved ligningen $l:\ y=2x+b$, hvor $b$ er et tal.`,
  figur: { vindue: [-11, 11, -11, 11], objekter: [
    { t: "cirkel", cx: 0, cy: 0, r: 4.4721 }, { t: "linje", a: 2, b: 10 }, { t: "linje", a: 2, b: -10 } ] },
  dele: [
  { bogstav: "a", point: 10, kategori: "tangent-cirkel", kraever: ["tangent-cirkel", "afstand-punkt-linje", "cirklens-ligning"], sv: 3,
    tekst: r`Bestem de værdier af $b$, for hvilke linjen $l$ er tangent til cirklen.`,
    hints: [
      r`Linjen er tangent, når afstanden fra centrum til linjen er lig med radius. Find centrum og radius.`,
      r`Centrum er $(0,0)$ og $r=\sqrt{20}$. Opstil $\frac{|2\cdot 0+b-0|}{\sqrt{2^2+1}}=\sqrt{20}$ og løs for $b$ med Løs i GeoGebra.`],
    loesning: r`<p>Centrum er $(0,0)$ og radius $\sqrt{20}$. Linjen er tangent, når</p> $$\frac{|b|}{\sqrt{5}}=\sqrt{20} \;\Leftrightarrow\; |b|=\sqrt{100}=10$$ <p><b>Svar:</b> $l$ er tangent til cirklen for $b=-10$ og $b=10$.</p>` }
]},

{ id: "ag-27", forlaeg: "Eksamen 28. maj 2026, opg. 11", delproeve: 2,
  intro: r`En cirkel er givet ved ligningen $(x-2)^2+(y-3)^2=13$. Punktet $P$ har koordinatsættet $P(4,6)$.`,
  figur: { vindue: [-3, 14, -2, 10], objekter: [
    { t: "cirkel", cx: 2, cy: 3, r: 3.6056 }, { t: "punkt", x: 2, y: 3, navn: "C" }, { t: "punkt", x: 4, y: 6, navn: "P" },
    { t: "linje", a: -0.6667, b: 8.6667, navn: "t" } ] },
  dele: [
  { bogstav: "a", point: 10, kategori: "cirklens-ligning", kraever: ["cirklens-ligning"], sv: 1,
    tekst: r`Undersøg ved beregning, om punktet $P$ ligger på cirklen.`,
    hints: [
      r`Indsæt punktets koordinater i cirklens ligning.`,
      r`Udregn $(4-2)^2+(6-3)^2$ og sammenlign med $13$.`],
    loesning: r`$$(4-2)^2+(6-3)^2=4+9=13$$ <p><b>Svar:</b> Koordinaterne passer i ligningen, så $P$ ligger på cirklen.</p>` },
  { bogstav: "b", point: 10, kategori: "tangent-cirkel", kraever: ["tangent-cirkel", "cirklens-ligning", "ortogonale-linjer", "linjens-ligning"], sv: 3,
    tekst: r`Bestem en ligning for tangenten $t$ til cirklen i punktet $P$.`,
    hints: [
      r`Tangenten står vinkelret på radius fra centrum $C(2,3)$ til $P$.`,
      r`$a_{CP}=\frac{6-3}{4-2}=\frac{3}{2}$. Tangentens hældning opfylder $\frac{3}{2}\cdot a_t=-1$.`],
    loesning: r`$$a_{CP}=\frac{3}{2}\quad\Rightarrow\quad a_t=-\frac{2}{3}$$ $$6=-\tfrac{2}{3}\cdot 4+b \;\Leftrightarrow\; b=\tfrac{26}{3}\approx 8{,}67$$ <p><b>Svar:</b> $t:\ y=-\frac{2}{3}x+\frac{26}{3}$, dvs. ca. $y=-0{,}667x+8{,}67$.</p>` },
  { bogstav: "c", point: 10, kategori: "tangent-cirkel", kraever: ["tangent-cirkel", "cirklens-ligning", "ortogonale-linjer", "linjens-ligning", "afstand-punkter"], sv: 2,
    tekst: r`Tangenten $t$ skærer $x$-aksen i punktet $Q$. Bestem afstanden $|PQ|$.`,
    hints: [
      r`På $x$-aksen er $y=0$. Find $Q$ ved at løse $t$'s ligning med $y=0$.`,
      r`Når du har $Q$, bruger du afstandsformlen mellem $P$ og $Q$.`],
    loesning: r`$$0=-\tfrac{2}{3}x+\tfrac{26}{3} \;\Leftrightarrow\; x=13,\qquad Q(13,0)$$ $$|PQ|=\sqrt{(13-4)^2+(0-6)^2}=\sqrt{117}\approx 10{,}8$$ <p><b>Svar:</b> $|PQ|\approx 10{,}8$.</p>` }
]},

{ id: "ag-28", delproeve: 2,
  intro: r`En trekant $ABC$ har vinkelspidserne $A(0,0)$, $B(8,4)$ og $C(2,6)$. Se figuren.`,
  figur: { vindue: [-1, 10, -1, 8], objekter: [
    { t: "stykke", x1: 0, y1: 0, x2: 8, y2: 4 }, { t: "stykke", x1: 8, y1: 4, x2: 2, y2: 6 }, { t: "stykke", x1: 2, y1: 6, x2: 0, y2: 0 },
    { t: "punkt", x: 0, y: 0, navn: "A" }, { t: "punkt", x: 8, y: 4, navn: "B" }, { t: "punkt", x: 2, y: 6, navn: "C" } ] },
  dele: [
  { bogstav: "a", point: 10, kategori: "punkt-linje", kraever: ["afstand-punkt-linje", "linjens-ligning", "afstand-punkter"], sv: 3,
    tekst: r`Bestem arealet af trekant $ABC$ ved at bruge afstanden fra punktet $C$ til linjen gennem $A$ og $B$.`,
    hints: [
      r`Afstanden fra $C$ til linjen $AB$ er trekantens højde, når $AB$ er grundlinje.`,
      r`Linjen gennem $A$ og $B$ har ligningen $y=\frac{1}{2}x$. Find højden med afstandsformlen for punkt og linje, og grundlinjen $|AB|$ med afstandsformlen.`],
    loesning: r`<p>Linjen gennem $A$ og $B$: $a=\frac{4-0}{8-0}=\frac{1}{2}$ og $b=0$, så $y=\frac{1}{2}x$.</p> $$h=\frac{|\frac{1}{2}\cdot 2+0-6|}{\sqrt{(\frac{1}{2})^2+1}}=\frac{5}{\sqrt{1{,}25}}\approx 4{,}47,\qquad |AB|=\sqrt{8^2+4^2}=\sqrt{80}\approx 8{,}94$$ $$T=\tfrac{1}{2}\cdot h\cdot|AB|=20$$ <p><b>Svar:</b> Arealet er $20$.</p>` }
]},
// ───────────── UDVIDELSE: delprøve 2 ─────────────

{ id: "ag-70", forlaeg: "Eksamen 11. aug. 2026, opg. 12", delproeve: 2,
  intro: r`En linje $l$ er givet ved ligningen $l:\ y=-2x+3$. Linjen $l$ er tangent til en cirkel med centrum i punktet $P(5,4)$. Se figuren.`,
  figur: { vindue: [-2, 11, -4, 10], objekter: [ { t: "linje", a: -2, b: 3, navn: "l" }, { t: "cirkel", cx: 5, cy: 4, r: 4.9193 }, { t: "punkt", x: 5, y: 4, navn: "P" } ] },
  dele: [
  { bogstav: "a", point: 10, kategori: "punkt-linje", kraever: ["afstand-punkt-linje", "cirklens-ligning"], sv: 2,
    tekst: r`Bestem afstanden mellem $P$ og $l$ ved brug af en formel. Bestem en ligning for cirklen.`,
    hints: [r`Når $l$ er tangent, er afstanden fra centrum til $l$ lig med radius.`, r`Brug afstandsformlen med $a=-2$, $b=3$ og $P(5,4)$. Husk at cirklens ligning skal bruge $r^2$.`],
    loesning: r`$$r=\text{dist}(P,l)=\frac{|-2\cdot 5+3-4|}{\sqrt{(-2)^2+1}}=\frac{11}{\sqrt{5}}\approx 4{,}92$$ $$r^2=\frac{121}{5}=24{,}2$$ <p><b>Svar:</b> Afstanden er ca. $4{,}92$, og cirklen har ligningen $(x-5)^2+(y-4)^2=24{,}2$.</p>` }
]},

{ id: "ag-71", forlaeg: "Eksamen 26. maj 2026, opg. 10", delproeve: 2,
  intro: r`En cirkel har centrum i $C(-4,2)$ og radius $4$.`,
  figur: { vindue: [-10, 6, -3, 10], objekter: [ { t: "cirkel", cx: -4, cy: 2, r: 4 }, { t: "punkt", x: -4, y: 2, navn: "C" }, { t: "punkt", x: 4, y: 8, navn: "P" } ] },
  dele: [
  { bogstav: "a", point: 10, kategori: "cirklens-ligning", kraever: ["cirklens-ligning"], sv: 1,
    tekst: r`Bestem en ligning for cirklen.`,
    hints: [r`Brug $(x-a)^2+(y-b)^2=r^2$.`, r`$x-(-4)=x+4$ og $r^2=16$.`],
    loesning: r`<p><b>Svar:</b> $(x+4)^2+(y-2)^2=16$.</p>` },
  { bogstav: "b", point: 10, kategori: "cirklens-ligning", kraever: ["cirklens-ligning", "afstand-punkter"], sv: 2,
    tekst: r`Punktet $P$ har koordinatsættet $P(4,8)$. Bestem ved beregning afstanden $d$ fra punktet $P$ til cirklen. Se figuren.`,
    hints: [r`Den korteste vej fra $P$ til cirklen går mod centrum.`, r`Find $|PC|$ og træk radius fra.`],
    loesning: r`$$|PC|=\sqrt{(4-(-4))^2+(8-2)^2}=\sqrt{64+36}=10,\qquad d=10-4=6$$ <p><b>Svar:</b> $d=6$.</p>` }
]},

{ id: "ag-72", forlaeg: "Eksamen 28. maj 2026, opg. 11", delproeve: 2,
  intro: r`En cirkel har centrum i punktet $(5,-3)$ og radius $7$.`,
  dele: [
  { bogstav: "a", point: 10, kategori: "cirklens-ligning", kraever: ["cirklens-ligning"], sv: 1,
    tekst: r`Bestem en ligning for cirklen.`,
    hints: [r`Brug $(x-a)^2+(y-b)^2=r^2$.`, r`$y-(-3)=y+3$ og $r^2=49$.`],
    loesning: r`<p><b>Svar:</b> $(x-5)^2+(y+3)^2=49$.</p>` },
  { bogstav: "b", point: 10, kategori: "cirklens-ligning", kraever: ["cirklens-ligning"], sv: 1,
    tekst: r`Undersøg ved beregning, om punktet $P(11,1)$ ligger på cirklen.`,
    hints: [r`Indsæt $P$ i cirklens ligning.`, r`Udregn $(11-5)^2+(1+3)^2$ og sammenlign med $49$.`],
    loesning: r`$$(11-5)^2+(1+3)^2=36+16=52\neq 49$$ <p><b>Svar:</b> $P$ ligger ikke på cirklen (den ligger lidt uden for, da $52>49$).</p>` }
]},

{ id: "ag-73", forlaeg: "Enkeltopg. 3.D2.4", delproeve: 2,
  intro: r`Linjen $l$ har ligningen $l:\ y=-\frac{1}{2}x+4$.`,
  figur: { vindue: [-2, 12, -2, 10], objekter: [ { t: "linje", a: -0.5, b: 4, navn: "l" }, { t: "cirkel", cx: 6, cy: 5, r: 3.5777 }, { t: "punkt", x: 6, y: 5, navn: "C" } ] },
  dele: [
  { bogstav: "a", point: 10, kategori: "haeldningsvinkel", kraever: ["haeldningsvinkel"], sv: 2,
    tekst: r`Bestem ved beregning hældningsvinklen for linjen.`,
    hints: [r`Hældningsvinklen $v$ opfylder $\tan(v)=a$.`, r`Løs $\tan(v)=-\frac{1}{2}$. Linjen hælder nedad, så vinklen bliver negativ.`],
    loesning: r`$$\tan(v)=-\tfrac{1}{2} \;\Leftrightarrow\; v=\tan^{-1}\!\left(-\tfrac{1}{2}\right)\approx -26{,}6^\circ$$ <p><b>Svar:</b> Hældningsvinklen er ca. $-26{,}6^\circ$ (linjen hælder $26{,}6^\circ$ nedad i forhold til $x$-aksen).</p>` },
  { bogstav: "b", point: 10, kategori: "punkt-linje", kraever: ["afstand-punkt-linje", "cirklens-ligning"], sv: 2,
    tekst: r`En cirkel har centrum i punktet $C(6,5)$ og har linjen $l$ som tangent. Bestem en ligning for cirklen.`,
    hints: [r`Radius er afstanden fra $C$ til $l$.`, r`Brug afstandsformlen med $a=-\frac{1}{2}$, $b=4$ og $C(6,5)$.`],
    loesning: r`$$r=\frac{|-\frac{1}{2}\cdot 6+4-5|}{\sqrt{(-\frac{1}{2})^2+1}}=\frac{4}{\sqrt{1{,}25}}\approx 3{,}58,\qquad r^2=\frac{16}{1{,}25}=12{,}8$$ <p><b>Svar:</b> $(x-6)^2+(y-5)^2=12{,}8$.</p>` }
]},

{ id: "ag-74", forlaeg: "Vejl. sæt 2, opg. 11", delproeve: 2,
  intro: r`Linjen $l$ er givet ved ligningen $l:\ y=-3x+5$. Punktet $P$ har koordinatsættet $P(4,6)$.`,
  dele: [
  { bogstav: "a", point: 10, kategori: "punkt-linje", kraever: ["afstand-punkt-linje"], sv: 2,
    tekst: r`Bestem afstanden mellem punktet $P$ og linjen $l$.`,
    hints: [r`Brug formlen for afstanden fra et punkt til en linje.`, r`$a=-3$, $b=5$, $x_1=4$ og $y_1=6$.`],
    loesning: r`$$\text{dist}(P,l)=\frac{|-3\cdot 4+5-6|}{\sqrt{(-3)^2+1}}=\frac{13}{\sqrt{10}}\approx 4{,}11$$ <p><b>Svar:</b> Afstanden er ca. $4{,}11$.</p>` },
  { bogstav: "b", point: 10, kategori: "parallelle", kraever: ["parallelle-linjer", "linjens-ligning"], sv: 2,
    tekst: r`Linjen $m$ er parallel med linjen $l$ og går gennem punktet $P$. Bestem en ligning for linjen $m$.`,
    hints: [r`Parallelle linjer har samme hældning.`, r`Indsæt $P(4,6)$ i $y=-3x+b$.`],
    loesning: r`$$6=-3\cdot 4+b \;\Leftrightarrow\; b=18$$ <p><b>Svar:</b> $m:\ y=-3x+18$.</p>` }
]},

{ id: "ag-75", forlaeg: "Enkeltopg. 3.D2.1", delproeve: 2,
  intro: r`En linje $l$ er givet ved ligningen $y=0{,}7x-1{,}2$.`,
  dele: [
  { bogstav: "a", point: 10, kategori: "haeldningsvinkel", kraever: ["haeldningsvinkel"], sv: 2,
    tekst: r`Bestem ved beregning hældningsvinklen for linjen $l$.`,
    hints: [r`$\tan(v)=a$.`, r`Løs $\tan(v)=0{,}7$ i grader.`],
    loesning: r`$$v=\tan^{-1}(0{,}7)\approx 35{,}0^\circ$$ <p><b>Svar:</b> Ca. $35{,}0^\circ$.</p>` },
  { bogstav: "b", point: 10, kategori: "punkt-linje", kraever: ["afstand-punkt-linje"], sv: 2,
    tekst: r`Bestem afstanden fra punktet $P(-3,4)$ til linjen $l$.`,
    hints: [r`Brug formlen for afstanden fra et punkt til en linje.`, r`$a=0{,}7$, $b=-1{,}2$, $x_1=-3$ og $y_1=4$.`],
    loesning: r`$$\text{dist}(P,l)=\frac{|0{,}7\cdot(-3)-1{,}2-4|}{\sqrt{0{,}7^2+1}}=\frac{7{,}3}{\sqrt{1{,}49}}\approx 5{,}98$$ <p><b>Svar:</b> Ca. $5{,}98$.</p>` }
]},

{ id: "ag-76", forlaeg: "Enkeltopg. 3.D2.2", delproeve: 2,
  intro: r`Linjen $l$ er givet ved ligningen $y=x-2$.`,
  dele: [
  { bogstav: "a", point: 10, kategori: "punkt-linje", kraever: ["afstand-punkt-linje"], sv: 3,
    tekst: r`Bestem koordinatsættene til hvert af de to punkter på $x$-aksen, hvor afstanden til linjen $l$ er $5$.`,
    hints: [r`Et punkt på $x$-aksen har koordinatsættet $(x,0)$. Opstil afstandsformlen med dette punkt.`, r`Løs $\frac{|1\cdot x-2-0|}{\sqrt{1^2+1}}=5$ med Løs i GeoGebra.`],
    loesning: r`<p>Et punkt på $x$-aksen er $(x,0)$:</p> $$\frac{|x-2-0|}{\sqrt{2}}=5$$ <p>Løs i GeoGebra giver $x\approx -5{,}07$ eller $x\approx 9{,}07$.</p> <p><b>Svar:</b> $(-5{,}07;\ 0)$ og $(9{,}07;\ 0)$.</p>` }
]},

{ id: "ag-77", forlaeg: "Enkeltopg. 3.D2.7", delproeve: 2,
  intro: r`En linje $l$ er givet ved ligningen $y=3x-6$. Punktet $P(x,0)$ ligger på $x$-aksen.`,
  dele: [
  { bogstav: "a", point: 10, kategori: "punkt-linje", kraever: ["afstand-punkt-linje"], sv: 3,
    tekst: r`Bestem de to værdier af $x$, hvor afstanden mellem linjen $l$ og punktet $P$ er lig $\sqrt{10}$.`,
    hints: [r`Opstil afstandsformlen med punktet $(x,0)$ og sæt den lig $\sqrt{10}$.`, r`Løs $\frac{|3x-6-0|}{\sqrt{3^2+1}}=\sqrt{10}$ med Løs i GeoGebra.`],
    loesning: r`$$\frac{|3x-6|}{\sqrt{10}}=\sqrt{10} \;\Leftrightarrow\; |3x-6|=10$$ <p>Det giver $x=\frac{16}{3}\approx 5{,}33$ eller $x=-\frac{4}{3}\approx -1{,}33$.</p> <p><b>Svar:</b> $x=-\frac{4}{3}$ og $x=\frac{16}{3}$.</p>` }
]},

{ id: "ag-78", forlaeg: "Enkeltopg. 3.D2.3", delproeve: 2,
  intro: r`På figuren ses en cirkel givet ved ligningen $(x-2)^2+(y-1)^2=25$ og en linje $l$ givet ved ligningen $y=\frac{1}{3}x+2$.`,
  figur: { vindue: [-5, 9, -6, 8], objekter: [ { t: "cirkel", cx: 2, cy: 1, r: 5 }, { t: "linje", a: 0.3333, b: 2, navn: "l" } ] },
  dele: [
  { bogstav: "a", point: 10, kategori: "linje-cirkel", kraever: ["skaering-linje-cirkel", "cirklens-ligning"], sv: 2,
    tekst: r`Bestem koordinatsættet til hvert af skæringspunkterne mellem cirklen og linjen $l$.`,
    hints: [r`Skæringspunkterne opfylder begge ligninger.`, r`Løs ligningssystemet med Løs i GeoGebra.`],
    loesning: r`<p>Løs i GeoGebra på systemet $(x-2)^2+(y-1)^2=25$, $y=\frac{1}{3}x+2$ giver</p> $$(x,y)=(-3,1)\quad\text{og}\quad(x,y)=(6,4)$$ <p><b>Svar:</b> $(-3,1)$ og $(6,4)$.</p>` },
  { bogstav: "b", point: 10, kategori: "tangent-cirkel", kraever: ["tangent-cirkel", "afstand-punkt-linje", "parallelle-linjer", "cirklens-ligning"], sv: 3,
    tekst: r`Bestem en ligning for hver af de to tangenter til cirklen, som er parallelle med $l$.`,
    hints: [r`En tangent parallel med $l$ har ligningen $y=\frac{1}{3}x+b$. Den er tangent, når afstanden fra centrum til linjen er lig radius.`, r`Løs $\frac{|\frac{1}{3}\cdot 2+b-1|}{\sqrt{(\frac{1}{3})^2+1}}=5$ for $b$ med Løs i GeoGebra.`],
    loesning: r`<p>Centrum $(2,1)$, radius $5$. Tangenterne har formen $y=\frac{1}{3}x+b$:</p> $$\frac{|\frac{1}{3}\cdot 2+b-1|}{\sqrt{(\frac{1}{3})^2+1}}=5$$ <p>Løs i GeoGebra giver $b\approx 5{,}60$ eller $b\approx -4{,}94$.</p> <p><b>Svar:</b> $y=\frac{1}{3}x+5{,}60$ og $y=\frac{1}{3}x-4{,}94$.</p>` }
]},

{ id: "ag-79", forlaeg: "Enkeltopg. 3.D2.5", delproeve: 2,
  intro: r`På figuren vises en cirkel og en linje $l$ med ligningen $y=-\frac{1}{3}x+6$. Linjen $l$ er tangent til cirklen i punktet $P(3,5)$. Punktet $Q$ ligger på $y$-aksen, og linjestykket $PQ$ er diameter i cirklen.`,
  figur: { vindue: [-6, 10, -6, 9], objekter: [ { t: "cirkel", cx: 1.5, cy: 0.5, r: 4.7434 }, { t: "linje", a: -0.3333, b: 6, navn: "l" }, { t: "punkt", x: 3, y: 5, navn: "P" } ] },
  dele: [
  { bogstav: "a", point: 10, kategori: "tangent-cirkel", kraever: ["tangent-cirkel", "ortogonale-linjer", "linjens-ligning"], sv: 3,
    tekst: r`Bestem koordinatsættet til punktet $Q$.`,
    hints: [r`Diameteren $PQ$ går gennem centrum og står derfor vinkelret på tangenten i $P$.`, r`Linjen gennem $P$ og $Q$ har hældningen $3$ (da $-\frac{1}{3}\cdot 3=-1$). Find dens ligning og sæt $x=0$.`],
    loesning: r`<p>$PQ$ står vinkelret på $l$, så $a_{PQ}=3$.</p> $$5=3\cdot 3+b \;\Leftrightarrow\; b=-4,\qquad PQ:\ y=3x-4$$ <p>$Q$ ligger på $y$-aksen, så $x=0$ og $y=-4$.</p> <p><b>Svar:</b> $Q(0,-4)$.</p>` },
  { bogstav: "b", point: 10, kategori: "cirklens-ligning", kraever: ["cirklens-ligning", "midtpunkt", "afstand-punkter", "tangent-cirkel", "ortogonale-linjer"], sv: 2,
    tekst: r`Bestem en ligning for cirklen.`,
    hints: [r`Centrum er midtpunktet af diameteren $PQ$.`, r`Radius er halvdelen af $|PQ|$, eller afstanden fra centrum til $P$.`],
    loesning: r`$$C\left(\tfrac{3+0}{2},\tfrac{5+(-4)}{2}\right)=C(1{,}5;\ 0{,}5),\qquad r=\tfrac{1}{2}|PQ|=\tfrac{1}{2}\sqrt{3^2+9^2}=\tfrac{\sqrt{90}}{2}$$ $$r^2=\tfrac{90}{4}=22{,}5$$ <p><b>Svar:</b> $(x-1{,}5)^2+(y-0{,}5)^2=22{,}5$.</p>` }
]},

{ id: "ag-80", forlaeg: "Enkeltopg. 3.D2.6", delproeve: 2,
  intro: r`I et koordinatsystem er givet to punkter $A(1,6)$ og $B(7,2)$ samt en lodret linje $l$ med ligningen $x=3$. Et punkt $P(3,y)$ ligger på linjen $l$.`,
  figur: { vindue: [-1, 9, -1, 8], objekter: [ { t: "lodret", x: 3, navn: "l" }, { t: "punkt", x: 1, y: 6, navn: "A" }, { t: "punkt", x: 7, y: 2, navn: "B" } ] },
  dele: [
  { bogstav: "a", point: 10, kategori: "afstand", kraever: ["afstand-punkter"], sv: 3,
    tekst: r`Bestem $y$, så $|PA|=|PB|$.`,
    hints: [r`Udtryk $|PA|$ og $|PB|$ med afstandsformlen, hvor $P=(3,y)$.`, r`Løs $\sqrt{(1-3)^2+(6-y)^2}=\sqrt{(7-3)^2+(2-y)^2}$ med Løs i GeoGebra.`],
    loesning: r`$$\sqrt{(1-3)^2+(6-y)^2}=\sqrt{(7-3)^2+(2-y)^2}$$ <p>Løs i GeoGebra giver $y=2{,}5$.</p> <p><b>Svar:</b> $y=2{,}5$.</p>` }
]},

{ id: "ag-81", forlaeg: "Enkeltopg. 3.D2.8", delproeve: 2,
  intro: r`På figuren ses en cirkel givet ved ligningen $(x-3)^2+(y+1)^2=9$ og en linje $l$ givet ved ligningen $y=\frac{1}{2}x+4$.`,
  figur: { vindue: [-3, 9, -5, 9], objekter: [ { t: "cirkel", cx: 3, cy: -1, r: 3 }, { t: "linje", a: 0.5, b: 4, navn: "l" } ] },
  dele: [
  { bogstav: "a", point: 10, kategori: "punkt-linje", kraever: ["afstand-punkt-linje", "cirklens-ligning"], sv: 2,
    tekst: r`Bestem ved brug af en formel afstanden mellem cirklen og linjen $l$.`,
    hints: [r`Find afstanden fra centrum til linjen, og træk radius fra.`, r`Centrum er $(3,-1)$ og radius $3$. Brug afstandsformlen med $a=\frac{1}{2}$ og $b=4$.`],
    loesning: r`$$\text{dist}(C,l)=\frac{|\frac{1}{2}\cdot 3+4-(-1)|}{\sqrt{(\frac{1}{2})^2+1}}=\frac{6{,}5}{\sqrt{1{,}25}}\approx 5{,}81$$ $$5{,}81-3=2{,}81$$ <p><b>Svar:</b> Afstanden mellem cirklen og linjen er ca. $2{,}81$.</p>` },
  { bogstav: "b", point: 10, kategori: "tangent-cirkel", kraever: ["tangent-cirkel", "afstand-punkt-linje", "cirklens-ligning"], sv: 3,
    tekst: r`En anden linje $m$ er givet ved ligningen $y=\frac{1}{2}x+b$, hvor $b>0$. Bestem tallet $b$, så linjen $m$ er tangent til cirklen.`,
    hints: [r`$m$ er tangent, når afstanden fra centrum til $m$ er lig radius.`, r`Løs $\frac{|\frac{1}{2}\cdot 3+b+1|}{\sqrt{1{,}25}}=3$ med Løs i GeoGebra, og vælg løsningen med $b>0$.`],
    loesning: r`$$\frac{|\frac{1}{2}\cdot 3+b-(-1)|}{\sqrt{(\frac{1}{2})^2+1}}=3$$ <p>Løs i GeoGebra giver $b\approx 0{,}854$ eller $b\approx -5{,}85$. Da $b>0$:</p> <p><b>Svar:</b> $b\approx 0{,}854$.</p>` }
]}

];
