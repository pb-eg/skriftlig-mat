// SKABELONER — analytisk geometri. Hver opgave laver nye tal ved hver visning.
// Metadata (delprøve, kategori, krav, sværhedsgrad, forlæg) er fast; lav() returnerer intro, figur og
// tekst/hints/løsning til hver delopgave. _t og tjek() bruges kun til automatisk test.
// Delprøve 1: tallene vælges baglæns, så facit bliver pænt. Delprøve 2: decimaltal som til eksamen.
(function () {
const r = String.raw;
const LR = r`\;\Leftrightarrow\;`;
const NEQ = r`\neq `, APPROX = r`\approx `;

// ───────── hjælpere ─────────
const int = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
const pick = arr => arr[Math.floor(Math.random() * arr.length)];
const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
const ikkeNul = (a, b) => { let v; do { v = int(a, b); } while (v === 0); return v; };
const tegn = () => (Math.random() < 0.5 ? 1 : -1);
function gen(f) { for (let i = 0; i < 4000; i++) { const v = f(); if (v) return v; } throw new Error("gen gav op"); }

class Q {
  constructor(n, d = 1) { if (d < 0) { n = -n; d = -d; } const g = gcd(n, d) || 1; this.n = n / g; this.d = d / g; }
  static of(x) { return x instanceof Q ? x : new Q(x, 1); }
  add(o) { o = Q.of(o); return new Q(this.n * o.d + o.n * this.d, this.d * o.d); }
  sub(o) { return this.add(Q.of(o).neg()); }
  mul(o) { o = Q.of(o); return new Q(this.n * o.n, this.d * o.d); }
  div(o) { o = Q.of(o); return new Q(this.n * o.d, this.d * o.n); }
  neg() { return new Q(-this.n, this.d); }
  get v() { return this.n / this.d; }
  tex() { return this.d === 1 ? String(this.n) : (this.n < 0 ? "-" : "") + r`\frac{` + Math.abs(this.n) + "}{" + this.d + "}"; }
}
const val = x => (x instanceof Q ? x.v : x);
const rund = (x, n = 4) => Math.round(x * 10 ** n) / 10 ** n;
const dec = (x, n = 2) => rund(x, n).toFixed(n).replace(".", "{,}");          // fast antal decimaler
const num = x => (x instanceof Q ? x.tex() : Number.isInteger(x) ? String(x) : String(rund(x)).replace(".", "{,}"));
const sgn = x => Math.sign(val(x));
const neg = x => (x instanceof Q ? x.neg() : -x);
const par = x => (sgn(x) < 0 ? "(" + num(x) + ")" : num(x));
const ax = (a, v = "x") => { if (sgn(a) === 0) return ""; const A = num(a); if (A === "1") return v; if (A === "-1") return "-" + v; return A + v; };
const plus = b => (sgn(b) === 0 ? "" : sgn(b) > 0 ? "+" + num(b) : "-" + num(neg(b)));
const rhs = (a, b) => { const A = ax(a); if (!A) return num(b); return A + plus(b); };
const lin = (a, b) => "y=" + rhs(a, b);
const gange = (a, x0) => { const A = num(a); if (A === "1") return par(x0); if (A === "-1") return "-" + par(x0); return A + r`\cdot ` + par(x0); };
const faktor = a => { const A = num(a); return A === "1" ? "" : A === "-1" ? "-" : A + r`\cdot`; };
const xminus = (v, c) => (sgn(c) === 0 ? v : v + (sgn(c) > 0 ? "-" + num(c) : "+" + num(neg(c))));
const kvad = (v, c) => (sgn(c) === 0 ? v + "^2" : "(" + xminus(v, c) + ")^2");
const cirkel = (a, b, r2) => kvad("x", a) + "+" + kvad("y", b) + "=" + num(r2);
const pt = (x, y) => { const d = !Number.isInteger(val(x)) && !(x instanceof Q) || !Number.isInteger(val(y)) && !(y instanceof Q); return "(" + num(x) + (d ? r`;\ ` : ",") + num(y) + ")"; };
const led = (k, v) => (k === 0 ? "" : (k > 0 ? "+" : "-") + (Math.abs(k) === 1 ? "" : Math.abs(k)) + v);   // +6x, -y
function udfoldet(a, b, r2, nulForm) { // x^2-2ax+y^2-2by ...
  const venstre = "x^2" + led(-2 * a, "x") + "+y^2" + led(-2 * b, "y");
  const c = a * a + b * b - r2;
  if (nulForm) return venstre + (c === 0 ? "" : (c > 0 ? "+" : "-") + Math.abs(c)) + "=0";
  return venstre + "=" + (-c);
}
function poly2(A, B, C) { let s = (A === 1 ? "" : A === -1 ? "-" : A) + "x^2"; if (B) s += led(B, "x"); if (C) s += (C > 0 ? "+" : "-") + Math.abs(C); return s; }
function vindue(pts, pad = 2) {
  const xs = pts.map(p => p[0]).concat(0), ys = pts.map(p => p[1]).concat(0);
  let x0 = Math.floor(Math.min(...xs)) - pad, x1 = Math.ceil(Math.max(...xs)) + pad;
  let y0 = Math.floor(Math.min(...ys)) - pad, y1 = Math.ceil(Math.max(...ys)) + pad;
  const w = x1 - x0, h = y1 - y0;
  if (w < h * 0.75) { const e = Math.ceil((h * 0.75 - w) / 2); x0 -= e; x1 += e; }
  if (h < w * 0.6) { const e = Math.ceil((w * 0.6 - h) / 2); y0 -= e; y1 += e; }
  return [x0, x1, y0, y1];
}
const dist = (x1, y1, x2, y2) => Math.hypot(x2 - x1, y2 - y1);
const L5 = [[3, 4], [4, 3], [-3, 4], [-4, 3], [3, -4], [4, -3], [-3, -4], [-4, -3], [5, 0], [0, 5], [-5, 0], [0, -5]];
const TRIPEL = [[3, 4], [4, 3], [6, 8], [8, 6], [5, 12], [12, 5]];
const SMAA = [[1, 2], [2, 1], [1, 3], [3, 1], [2, 3], [3, 2]];
const medTegn = ([p, q]) => [p * tegn(), q * tegn()];
const afstTex = d2 => { const s = Math.round(Math.sqrt(d2)); return s * s === d2 ? String(s) : r`\sqrt{${d2}}`; };
const HLD = [new Q(2), new Q(3), new Q(-2), new Q(-3), new Q(4), new Q(-4), new Q(1, 2), new Q(-1, 2), new Q(1, 3), new Q(-1, 3), new Q(1, 4), new Q(-1, 4)];
const HLDheltal = [1, 2, 3, 4, -1, -2, -3, -4];

// To løsningsmetoder for en linje med hældning a gennem (x1,y1). a: brøk (D1) eller decimaltal (D2)
function toMetoder(a, x1, y1, navn, decimaler) {
  const b = a instanceof Q ? Q.of(y1).sub(a.mul(x1)) : rund(y1 - a * x1, decimaler || 4);
  const B = decimaler ? dec(b, decimaler) : num(b);
  const bVis = decimaler ? Number(rund(b, decimaler)) : b;
  const pkt = sgn(x1) === 0 ? faktor(a) + "x" : faktor(a) + "(" + xminus("x", x1) + ")";
  const html = r`<p><i>Metode 1 – punkthældningsformlen</i> $y=a\cdot(x-x_1)+y_1$ med $a=${num(a)}$ og $${pt(x1, y1)}$:</p>
    $$y=${pkt}${plus(y1)}$$
    <p><b>Svar:</b> $${navn}:\ y=${pkt}${plus(y1)}$.</p>
    <p><i>Metode 2 – beregn $b$:</i> Punktet $${pt(x1, y1)}$ indsættes i $y=${ax(a)}+b$:</p>
    $$${num(y1)}=${gange(a, x1)}+b ${LR} b=${B}$$
    <p><b>Svar:</b> $${navn}:\ ${lin(a, bVis)}$.</p>`;
  return { b, html };
}
const hintTo = (a, x1, y1) => r`Brug punkthældningsformlen $y=a\cdot(x-x_1)+y_1$ med $a=${num(a)}$ og punktet $${pt(x1, y1)}$ – eller indsæt punktet i $y=${ax(a)}+b$ og løs for $b$.`;

const AG = ["linjens-ligning"];
window.SKABELONER = [

// ═════════════════════ DELPRØVE 1 · OPGAVE 1-FORMAT (5 point) ═════════════════════

{ id: "o1-aflaes-skaering", delproeve: 1, opgave1: true, forlaeg: "Enkeltopg. 1.D1.20",
  dele: [{ bogstav: "", point: 5, kategori: "skaering-linjer", kraever: ["skaering-linjer"], sv: 1 }],
  lav() {
    const g = gen(() => { const sx = int(-2, 4), sy = int(-1, 5), a1 = pick([1, 2, 3, -1, -2, -3]), a2 = pick([1, 2, -1, -2, 3, -3]);
      const b1 = sy - a1 * sx, b2 = sy - a2 * sx; return a1 !== a2 && Math.abs(b1) <= 8 && Math.abs(b2) <= 8 && { sx, sy, a1, a2, b1, b2 }; });
    return { _t: g, intro: r`På figuren ses to linjer $l$ og $m$.`,
      figur: { aflaes: true, vindue: vindue([[g.sx, g.sy]], 3), objekter: [{ t: "linje", a: g.a1, b: g.b1, navn: "l" }, { t: "linje", a: g.a2, b: g.b2, navn: "m" }] },
      dele: [{ tekst: r`Aflæs koordinatsættet til skæringspunktet mellem de to linjer.`,
        hints: [r`Find det sted på figuren, hvor linjerne krydser hinanden.`, r`Følg tern-linjerne lodret ned til $x$-aksen og vandret over til $y$-aksen.`],
        loesning: r`<p>Linjerne krydser hinanden i punktet $(${g.sx},${g.sy})$.</p><p><b>Svar:</b> $(${g.sx},${g.sy})$.</p>` }] };
  }, tjek: g => g.a1 * g.sx + g.b1 === g.sy && g.a2 * g.sx + g.b2 === g.sy },

{ id: "o1-midtpunkt", delproeve: 1, opgave1: true, forlaeg: "Enkeltopg. 1.D1.21",
  dele: [{ bogstav: "", point: 5, kategori: "midtpunkt", kraever: ["midtpunkt"], sv: 1 }],
  lav() {
    const g = gen(() => { const x1 = int(-6, 6), y1 = int(-6, 8), x2 = x1 + 2 * ikkeNul(-5, 5), y2 = y1 + 2 * int(-5, 5);
      return Math.abs(x2) <= 10 && Math.abs(y2) <= 10 && { x1, y1, x2, y2, mx: (x1 + x2) / 2, my: (y1 + y2) / 2 }; });
    return { _t: g, intro: "", dele: [{
      tekst: r`I et koordinatsystem er punkterne $P(${g.x1},${g.y1})$ og $Q(${g.x2},${g.y2})$ givet. Bestem koordinatsættet til midtpunktet $M$ for linjestykket $PQ$.`,
      hints: [r`Brug midtpunktsformlen.`, r`$M\left(\frac{x_1+x_2}{2},\frac{y_1+y_2}{2}\right)$.`],
      loesning: r`$$M\left(\frac{${g.x1}+${par(g.x2)}}{2},\frac{${g.y1}+${par(g.y2)}}{2}\right)=M(${g.mx},${g.my})$$ <p><b>Svar:</b> $M(${g.mx},${g.my})$.</p>` }] };
  }, tjek: g => 2 * g.mx === g.x1 + g.x2 && 2 * g.my === g.y1 + g.y2 },

{ id: "o1-ikke-ortogonal", delproeve: 1, opgave1: true, forlaeg: "Enkeltopg. 1.D1.22",
  dele: [{ bogstav: "", point: 5, kategori: "ortogonale", kraever: ["ortogonale-linjer"], sv: 1 }],
  lav() {
    const g = gen(() => { const a1 = pick(HLD), a2 = pick(HLD), p = a1.mul(a2); return a1.v !== a2.v && p.v !== -1 && { a1, a2, p }; });
    return { _t: { p: g.p.v }, intro: "", dele: [{
      tekst: r`En linje $l$ har hældningen $${g.a1.tex()}$, og en linje $m$ har hældningen $${g.a2.tex()}$. Vis, at linjerne $l$ og $m$ ikke er ortogonale.`,
      hints: [r`Hvad skal produktet af hældningerne være for ortogonale linjer?`, r`Udregn $${par(g.a1)}\cdot${par(g.a2)}$.`],
      loesning: r`$$${par(g.a1)}\cdot${par(g.a2)}=${g.p.tex()}\neq -1$$ <p><b>Svar:</b> Produktet af hældningerne er ikke $-1$, så linjerne er ikke ortogonale.</p>` }] };
  }, tjek: g => g.p !== -1 },

{ id: "o1-centrum", delproeve: 1, opgave1: true, forlaeg: "Enkeltopg. 1.D1.23",
  dele: [{ bogstav: "", point: 5, kategori: "cirklens-ligning", kraever: ["cirklens-ligning"], sv: 1 }],
  lav() {
    const a = ikkeNul(-7, 7), b = ikkeNul(-7, 7), r2 = pick([4, 9, 16, 25, 36, 49]);
    return { _t: { a, b }, intro: "", dele: [{
      tekst: r`En cirkel er givet ved ligningen $${cirkel(a, b, r2)}$. Bestem koordinatsættet til cirklens centrum.`,
      hints: [r`Sammenlign med $(x-a)^2+(y-b)^2=r^2$, hvor centrum er $(a,b)$.`, r`Pas på fortegnet: $x+3$ betyder $x-(-3)$.`],
      loesning: r`<p>Ligningen kan skrives $(x-${par(a)})^2+(y-${par(b)})^2=${r2}$, så centrum er $(${a},${b})$.</p><p><b>Svar:</b> $(${a},${b})$.</p>` }] };
  }, tjek: () => true },

{ id: "o1-radius", delproeve: 1, opgave1: true, forlaeg: "Vejl. sæt 2, opg. 1c · enkeltopg. 1.D1.24",
  dele: [{ bogstav: "", point: 5, kategori: "cirklens-ligning", kraever: ["cirklens-ligning"], sv: 1 }],
  lav() {
    const a = ikkeNul(-7, 7), b = ikkeNul(-7, 7), rr = int(2, 9);
    return { _t: { rr }, intro: "", dele: [{
      tekst: r`En cirkel er givet ved ligningen $${cirkel(a, b, rr * rr)}$. Bestem cirklens radius.`,
      hints: [r`Højresiden i cirklens ligning er $r^2$.`, r`Hvilket positivt tal ganget med sig selv giver $${rr * rr}$?`],
      loesning: r`<p>$r^2=${rr * rr}$, så $r=${rr}$.</p><p><b>Svar:</b> Radius er $${rr}$.</p>` }] };
  }, tjek: () => true },

{ id: "o1-aflaes-roering", delproeve: 1, opgave1: true, forlaeg: "Enkeltopg. 1.D1.25",
  dele: [{ bogstav: "", point: 5, kategori: "tangent-cirkel", kraever: ["tangent-cirkel", "cirklens-ligning"], sv: 1 }],
  lav() {
    const cx = int(-1, 3), cy = int(-1, 3), [dx, dy] = medTegn(pick([[1, 2], [2, 1]])), tx = cx + dx, ty = cy + dy;
    const at = new Q(-dx, dy), bt = Q.of(ty).sub(at.mul(tx)), rr = Math.sqrt(dx * dx + dy * dy);
    return { _t: { cx, cy, tx, ty, at: at.v, bt: bt.v },
      intro: r`På figuren ses en linje $l$ og en cirkel. Linjen er tangent til cirklen.`,
      figur: { aflaes: true, vindue: vindue([[cx - 3, cy - 3], [cx + 3, cy + 3]], 1), objekter: [{ t: "cirkel", cx, cy, r: rr }, { t: "linje", a: at.v, b: bt.v, navn: "l" }] },
      dele: [{ tekst: r`Aflæs koordinatsættet til det punkt, hvor linjen rører cirklen.`,
        hints: [r`Røringspunktet er det eneste punkt, linjen og cirklen har fælles.`, r`Aflæs punktet på tern-linjerne.`],
        loesning: r`<p>Linjen rører cirklen i punktet $(${tx},${ty})$.</p><p><b>Svar:</b> $(${tx},${ty})$.</p>` }] };
  }, tjek: g => Math.abs(g.at * g.tx + g.bt - g.ty) < 1e-9 && Math.abs(g.at * (g.ty - g.cy) / (g.tx - g.cx) + 1) < 1e-9 },

{ id: "o1-bestem-b", delproeve: 1, opgave1: true, forlaeg: "Enkeltopg. 1.D1.27",
  dele: [{ bogstav: "", point: 5, kategori: "linjens-ligning", kraever: AG, sv: 1 }],
  lav() {
    const a = ikkeNul(-6, 6), px = ikkeNul(-5, 5), py = int(-8, 10), b = py - a * px;
    return { _t: { a, px, py, b }, intro: "", dele: [{
      tekst: r`En linje $l:\ y=a\cdot x+b$ har hældningen $a=${a}$ og går gennem punktet $P(${px},${py})$. Bestem tallet $b$.`,
      hints: [r`Indsæt $a$ og punktets koordinater i $y=ax+b$.`, r`$${py}=${gange(a, px)}+b$.`],
      loesning: r`$$${py}=${gange(a, px)}+b ${LR} b=${b}$$ <p><b>Svar:</b> $b=${b}$.</p>` }] };
  }, tjek: g => g.a * g.px + g.b === g.py },

{ id: "o1-punkt-paa-linje", delproeve: 1, opgave1: true, forlaeg: "Enkeltopg. 1.D1.28",
  dele: [{ bogstav: "", point: 5, kategori: "linjens-ligning", kraever: AG, sv: 1 }],
  lav() {
    const a = ikkeNul(-6, 6), b = ikkeNul(-30, 30), px = int(2, 9), paa = Math.random() < 0.5;
    const py = a * px + b + (paa ? 0 : pick([-2, -1, 1, 2])), v = a * px + b;
    return { _t: { paa, v, py }, intro: "", dele: [{
      tekst: r`En linje $l$ er givet ved ligningen $${lin(a, b)}$. Undersøg, om punktet $P(${px},${py})$ ligger på linjen $l$.`,
      hints: [r`Indsæt $x=${px}$ i ligningen og sammenlign med $y=${py}$.`, r`$${gange(a, px)}${plus(b)}=\,?$`],
      loesning: r`$$${gange(a, px)}${plus(b)}=${v}${paa ? "" : NEQ + py}$$ <p><b>Svar:</b> $P$ ${paa ? "ligger på" : "ligger ikke på"} linjen $l$.</p>` }] };
  }, tjek: g => (g.v === g.py) === g.paa },

{ id: "o1-afstand", delproeve: 1, opgave1: true, forlaeg: "Egen variant",
  dele: [{ bogstav: "", point: 5, kategori: "afstand", kraever: ["afstand-punkter"], sv: 2 }],
  lav() {
    const [dx, dy] = medTegn(pick(TRIPEL.slice(0, 4))), x1 = int(-5, 5), y1 = int(-5, 5), x2 = x1 + dx, y2 = y1 + dy, d = Math.hypot(dx, dy);
    return { _t: { d }, intro: "", dele: [{
      tekst: r`Bestem afstanden mellem punkterne $(${x1},${y1})$ og $(${x2},${y2})$.`,
      hints: [r`Brug afstandsformlen.`, r`Forskellene er $${Math.abs(dx)}$ og $${Math.abs(dy)}$.`],
      loesning: r`$$\sqrt{(${x2}-${par(x1)})^2+(${y2}-${par(y1)})^2}=\sqrt{${dx * dx}+${dy * dy}}=${d}$$ <p><b>Svar:</b> Afstanden er $${d}$.</p>` }] };
  }, tjek: g => Number.isInteger(g.d) },

{ id: "o1-parallel-haeldning", delproeve: 1, opgave1: true, forlaeg: "Egen variant",
  dele: [{ bogstav: "", point: 5, kategori: "parallelle", kraever: ["parallelle-linjer"], sv: 1 }],
  lav() {
    const a = pick(HLD), b = ikkeNul(-8, 8);
    return { _t: {}, intro: "", dele: [{
      tekst: r`En linje $l$ har ligningen $l:\ ${lin(a, b)}$. En linje $m$ er parallel med $l$. Bestem hældningskoefficienten for $m$.`,
      hints: [r`Hvad har parallelle linjer til fælles?`, r`Aflæs hældningskoefficienten for $l$.`],
      loesning: r`<p>Parallelle linjer har samme hældningskoefficient.</p> <p><b>Svar:</b> Hældningskoefficienten for $m$ er $${a.tex()}$.</p>` }] };
  }, tjek: () => true },

// ═════════════════════ DELPRØVE 1 · 10 POINT ═════════════════════

{ id: "afstand-midtpunkt", delproeve: 1, forlaeg: "Egen variant",
  dele: [{ bogstav: "a", point: 10, kategori: "afstand", kraever: ["afstand-punkter"], sv: 2 },
         { bogstav: "b", point: 10, kategori: "midtpunkt", kraever: ["midtpunkt"], sv: 1 }],
  lav() {
    const g = gen(() => { const [dx, dy] = medTegn(pick([[6, 8], [8, 6], [2, 4], [4, 2], [2, 6], [6, 2], [4, 6], [6, 4]])); const x1 = int(-5, 5), y1 = int(-5, 5);
      return Math.abs(x1 + dx) <= 10 && Math.abs(y1 + dy) <= 10 && { x1, y1, x2: x1 + dx, y2: y1 + dy, dx, dy }; });
    const d2 = g.dx * g.dx + g.dy * g.dy, mx = (g.x1 + g.x2) / 2, my = (g.y1 + g.y2) / 2;
    return { _t: { ...g, mx, my }, intro: r`I et koordinatsystem er punkterne $A(${g.x1},${g.y1})$ og $B(${g.x2},${g.y2})$ givet.`,
      figur: { vindue: vindue([[g.x1, g.y1], [g.x2, g.y2]], 2), objekter: [{ t: "stykke", x1: g.x1, y1: g.y1, x2: g.x2, y2: g.y2 }, { t: "punkt", x: g.x1, y: g.y1, navn: "A" }, { t: "punkt", x: g.x2, y: g.y2, navn: "B" }] },
      dele: [{ tekst: r`Bestem afstanden $|AB|$ mellem punktet $A$ og punktet $B$.`,
        hints: [r`Brug afstandsformlen $|AB|=\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}$.`, r`Indsæt $x_1=${g.x1}$, $y_1=${g.y1}$, $x_2=${g.x2}$ og $y_2=${g.y2}$.`],
        loesning: r`$$|AB|=\sqrt{(${g.x2}-${par(g.x1)})^2+(${g.y2}-${par(g.y1)})^2}=\sqrt{${g.dx * g.dx}+${g.dy * g.dy}}=${afstTex(d2)}$$ <p><b>Svar:</b> $|AB|=${afstTex(d2)}$.</p>` },
      { tekst: r`Bestem koordinatsættet til midtpunktet $M$ af linjestykket $AB$.`,
        hints: [r`Midtpunktet ligger "midt imellem" i både $x$- og $y$-retningen.`, r`Midtpunktsformlen: $M\left(\frac{x_1+x_2}{2},\frac{y_1+y_2}{2}\right)$.`],
        loesning: r`$$M\left(\frac{${g.x1}+${par(g.x2)}}{2},\frac{${g.y1}+${par(g.y2)}}{2}\right)=M(${mx},${my})$$ <p><b>Svar:</b> $M(${mx},${my})$.</p>` }] };
  }, tjek: g => Number.isInteger(g.mx) && Number.isInteger(g.my) },

{ id: "topunkt", delproeve: 1, forlaeg: "Eksamen 11. aug. 2026, opg. 6",
  dele: [{ bogstav: "a", point: 10, kategori: "afstand", kraever: ["afstand-punkter"], sv: 2 },
         { bogstav: "b", point: 10, kategori: "linjens-ligning", kraever: AG, sv: 2 }],
  lav() {
    const g = gen(() => { let [dx, dy] = Math.random() < 0.65 ? pick(TRIPEL.slice(0, 4)) : [int(1, 6), int(1, 6)]; if (Math.random() < 0.5) dy = -dy;
      const x1 = int(-5, 5), y1 = int(-5, 6), x2 = x1 + dx, y2 = y1 + dy, a = new Q(dy, dx), b = Q.of(y1).sub(a.mul(x1));
      return Math.abs(x2) <= 12 && Math.abs(y2) <= 12 && a.d <= 4 && b.d <= 3 && { x1, y1, x2, y2, dx, dy, a }; });
    const d2 = g.dx * g.dx + g.dy * g.dy, m = toMetoder(g.a, g.x1, g.y1, "l");
    return { _t: { ...g, a: g.a.v, b: m.b.v }, intro: r`I et koordinatsystem er punkterne $P(${g.x1},${g.y1})$ og $Q(${g.x2},${g.y2})$ givet.`,
      dele: [{ tekst: r`Bestem afstanden $|PQ|$ mellem punktet $P$ og punktet $Q$.`,
        hints: [r`Brug afstandsformlen $|PQ|=\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}$.`, r`Indsæt $x_1=${g.x1}$, $y_1=${g.y1}$, $x_2=${g.x2}$ og $y_2=${g.y2}$. Pas på fortegnene.`],
        loesning: r`$$|PQ|=\sqrt{(${g.x2}-${par(g.x1)})^2+(${g.y2}-${par(g.y1)})^2}=\sqrt{${g.dx * g.dx}+${g.dy * g.dy}}=${afstTex(d2)}$$ <p><b>Svar:</b> $|PQ|=${afstTex(d2)}$.</p>` },
      { tekst: r`En linje $l$ går gennem punkterne $P$ og $Q$. Bestem en ligning for linjen $l$.`,
        hints: [r`Find først hældningskoefficienten med topunktsformlen $a=\frac{y_2-y_1}{x_2-x_1}$.`, r`Når du har $a$, bruger du punkthældningsformlen – eller indsætter et af punkterne i $y=ax+b$ og løser for $b$.`],
        loesning: r`$$a=\frac{${g.y2}-${par(g.y1)}}{${g.x2}-${par(g.x1)}}=\frac{${g.dy}}{${g.dx}}${gcd(g.dy, g.dx) === 1 && g.dx > 1 && g.dy > 0 ? "" : "=" + g.a.tex()}$$ ${m.html}` }] };
  }, tjek: g => Math.abs(g.a * g.x1 + g.b - g.y1) < 1e-9 && Math.abs(g.a * g.x2 + g.b - g.y2) < 1e-9 },

{ id: "parallel-punkt", delproeve: 1, forlaeg: "Egen variant (som vejl. sæt 2, opg. 11b)",
  dele: [{ bogstav: "a", point: 10, kategori: "parallelle", kraever: ["parallelle-linjer", "linjens-ligning"], sv: 2 }],
  lav() {
    const g = gen(() => { const a = pick(HLD), bl = ikkeNul(-6, 8), px = a.d * int(Math.ceil(-6 / a.d), Math.floor(8 / a.d)), py = int(-5, 9);
      const bm = Q.of(py).sub(a.mul(px)); return px !== 0 && bm.v !== bl && Math.abs(bm.v) <= 15 && { a, bl, px, py }; });
    const m = toMetoder(g.a, g.px, g.py, "m");
    return { _t: { a: g.a.v, bm: m.b.v, px: g.px, py: g.py }, intro: r`En linje $l$ har ligningen $l:\ ${lin(g.a, g.bl)}$. En linje $m$ er parallel med $l$ og går gennem punktet $P(${g.px},${g.py})$.`,
      dele: [{ tekst: r`Bestem en ligning for linjen $m$.`,
        hints: [r`Hvad ved du om hældningskoefficienterne for to parallelle linjer?`, r`$m$ har hældningen $${g.a.tex()}$. ` + hintTo(g.a, g.px, g.py)],
        loesning: r`<p>Parallelle linjer har samme hældningskoefficient, så $m$ har $a=${g.a.tex()}$.</p> ${m.html}` }] };
  }, tjek: g => Math.abs(g.a * g.px + g.bm - g.py) < 1e-9 && Number.isInteger(g.bm) },

{ id: "ortogonal-punkt", delproeve: 1, forlaeg: "Eksamen 26. maj 2026, opg. 8",
  dele: [{ bogstav: "a", point: 10, kategori: "ortogonale", kraever: ["ortogonale-linjer", "linjens-ligning"], sv: 2 }],
  lav() {
    const g = gen(() => { const al = pick(HLD), am = new Q(-1).div(al), bl = int(-6, 8), px = am.d * int(Math.ceil(-6 / am.d), Math.floor(8 / am.d)), py = int(-5, 8);
      const bm = Q.of(py).sub(am.mul(px)); return px !== 0 && al.mul(px).add(bl).v !== py && Math.abs(bm.v) <= 14 && { al, am, bl, px, py, bm }; });
    const m = toMetoder(g.am, g.px, g.py, "m"), xs = (g.bm.v - g.bl) / (g.al.v - g.am.v);
    return { _t: { al: g.al.v, am: g.am.v, bm: m.b.v, px: g.px, py: g.py },
      intro: r`En linje $l$ har ligningen $l:\ ${lin(g.al, g.bl)}$. En linje $m$ står vinkelret på linjen $l$ og går gennem punktet $P(${g.px},${g.py})$. Se figuren.`,
      figur: { vindue: vindue([[g.px, g.py], [xs, g.al.v * xs + g.bl]], 3), objekter: [{ t: "linje", a: g.al.v, b: g.bl, navn: "l" }, { t: "linje", a: g.am.v, b: g.bm.v, navn: "m" }, { t: "punkt", x: g.px, y: g.py, navn: "P" }] },
      dele: [{ tekst: r`Bestem hældningskoefficienten for linjen $m$. Bestem en ligning for $m$.`,
        hints: [r`For to linjer, der står vinkelret på hinanden, gælder $a_l\cdot a_m=-1$.`, r`$${par(g.al)}\cdot a_m=-1$ giver $a_m=${g.am.tex()}$. ` + hintTo(g.am, g.px, g.py)],
        loesning: r`$$${par(g.al)}\cdot a_m=-1 ${LR} a_m=${g.am.tex()}$$ <p>Hældningskoefficienten for $m$ er $${g.am.tex()}$.</p> ${m.html}` }] };
  }, tjek: g => Math.abs(g.al * g.am + 1) < 1e-9 && Math.abs(g.am * g.px + g.bm - g.py) < 1e-9 && Number.isInteger(g.bm) },

{ id: "ortogonal-skaering", delproeve: 1, forlaeg: "Egen variant (som eksamen 26. maj 2026, opg. 8)",
  dele: [{ bogstav: "a", point: 10, kategori: "ortogonale", kraever: ["ortogonale-linjer", "linjens-ligning"], sv: 2 },
         { bogstav: "b", point: 10, kategori: "skaering-linjer", kraever: ["skaering-linjer", "ortogonale-linjer", "linjens-ligning"], sv: 2, afh: ["a"] }],
  lav() {
    const g = gen(() => { const al = pick(HLD.slice(0, 10)), am = new Q(-1).div(al), Lc = al.d * am.d;
      const sx = Lc * int(Math.ceil(-4 / Lc), Math.floor(5 / Lc)), sy = int(-3, 6), k = pick([1, 2, -1, -2]);
      const px = sx + k * am.d, py = sy + k * am.n, bl = Q.of(sy).sub(al.mul(sx)), bm = Q.of(sy).sub(am.mul(sx));
      return bl.d === 1 && bm.d === 1 && Math.abs(bl.v) <= 12 && Math.abs(bm.v) <= 12 && Math.abs(px) <= 10 && Math.abs(py) <= 10 && px !== 0 && { al, am, sx, sy, px, py, bl, bm }; });
    const m = toMetoder(g.am, g.px, g.py, "m"), k = g.al.sub(g.am), h = g.bm.sub(g.bl);
    return { _t: { al: g.al.v, am: g.am.v, bl: g.bl.v, bm: m.b.v, sx: g.sx, sy: g.sy, px: g.px, py: g.py },
      intro: r`En linje $l$ har ligningen $l:\ ${lin(g.al, g.bl)}$. En linje $m$ står vinkelret på linjen $l$ og går gennem punktet $P(${g.px},${g.py})$. Se figuren.`,
      figur: { vindue: vindue([[g.px, g.py], [g.sx, g.sy]], 3), objekter: [{ t: "linje", a: g.al.v, b: g.bl.v, navn: "l" }, { t: "linje", a: g.am.v, b: g.bm.v, navn: "m" }, { t: "punkt", x: g.px, y: g.py, navn: "P" }] },
      dele: [{ tekst: r`Bestem hældningskoefficienten for linjen $m$. Bestem en ligning for $m$.`,
        hints: [r`For to linjer, der står vinkelret på hinanden, gælder $a_l\cdot a_m=-1$.`, r`$a_m=${g.am.tex()}$. ` + hintTo(g.am, g.px, g.py)],
        loesning: r`$$${par(g.al)}\cdot a_m=-1 ${LR} a_m=${g.am.tex()}$$ ${m.html}` },
      { tekst: r`Bestem koordinatsættet til skæringspunktet mellem linjen $l$ og linjen $m$.`,
        hints: [r`I skæringspunktet har de to linjer samme $y$-værdi. Sæt de to forskrifter lig hinanden.`, r`Løs $${rhs(g.al, g.bl)}=${rhs(g.am, g.bm)}$, og indsæt $x$ i en af ligningerne.`],
        loesning: r`$$${rhs(g.al, g.bl)}=${rhs(g.am, g.bm)} ${LR} ${ax(k)}=${h.tex()} ${LR} x=${g.sx}$$ $$y=${gange(g.al, g.sx)}${plus(g.bl)}=${g.sy}$$ <p><b>Svar:</b> Skæringspunktet er $(${g.sx},${g.sy})$.</p>` }] };
  }, tjek: g => Math.abs(g.al * g.sx + g.bl - g.sy) < 1e-9 && Math.abs(g.am * g.sx + g.bm - g.sy) < 1e-9 && Math.abs(g.am * g.px + g.bm - g.py) < 1e-9 && Math.abs(g.al * g.am + 1) < 1e-9 },

{ id: "skaering", delproeve: 1, forlaeg: "Eksamen 28. maj 2026, opg. 7 · enkeltopg. 3.D1.24",
  dele: [{ bogstav: "a", point: 10, kategori: "skaering-linjer", kraever: ["skaering-linjer"], sv: 2 }],
  lav() {
    const g = gen(() => { const x0 = ikkeNul(-4, 6), y0 = int(-4, 8), a1 = ikkeNul(-4, 4), a2 = ikkeNul(-4, 4), b1 = y0 - a1 * x0, b2 = y0 - a2 * x0;
      return a1 !== a2 && b1 !== 0 && b2 !== 0 && Math.abs(b1) <= 14 && Math.abs(b2) <= 14 && { x0, y0, a1, a2, b1, b2 }; });
    const k = g.a1 - g.a2, h = g.b2 - g.b1;
    return { _t: g, intro: r`To linjer $l$ og $m$ er givet ved ligningerne $$l:\ ${lin(g.a1, g.b1)}\qquad m:\ ${lin(g.a2, g.b2)}$$`,
      dele: [{ tekst: r`Bestem koordinatsættet til skæringspunktet mellem linjen $l$ og linjen $m$.`,
        hints: [r`I skæringspunktet har de to linjer samme $y$-værdi. Sæt de to forskrifter lig hinanden.`, r`Løs $${rhs(g.a1, g.b1)}=${rhs(g.a2, g.b2)}$ ved at samle $x$ på den ene side. Indsæt derefter $x$ i en af ligningerne.`],
        loesning: r`$$${rhs(g.a1, g.b1)}=${rhs(g.a2, g.b2)} ${LR} ${k === 1 ? "" : ax(k) + "=" + h + " " + LR + " "}x=${g.x0}$$ $$y=${gange(g.a1, g.x0)}${plus(g.b1)}=${g.y0}$$ <p><b>Svar:</b> Skæringspunktet er $(${g.x0},${g.y0})$.</p>` }] };
  }, tjek: g => g.a1 * g.x0 + g.b1 === g.y0 && g.a2 * g.x0 + g.b2 === g.y0 },

{ id: "skaering-ortogonal", delproeve: 1, forlaeg: "Egen variant (som eksamen 28. maj 2026, opg. 7)",
  dele: [{ bogstav: "a", point: 10, kategori: "skaering-linjer", kraever: ["skaering-linjer"], sv: 2 },
         { bogstav: "b", point: 10, kategori: "ortogonale", kraever: ["ortogonale-linjer"], sv: 1 }],
  lav() {
    const orto = Math.random() < 0.45;
    const g = gen(() => { const a1 = pick([new Q(1), new Q(-1), new Q(2), new Q(-2), new Q(3), new Q(-3)]);
      const a2 = orto ? new Q(-1).div(a1) : pick([new Q(1), new Q(-1), new Q(2), new Q(-2), new Q(3), new Q(-3), new Q(4)]);
      const x0 = a2.d * ikkeNul(Math.ceil(-5 / a2.d), Math.floor(6 / a2.d)), y0 = int(-4, 8);
      const b1 = Q.of(y0).sub(a1.mul(x0)), b2 = Q.of(y0).sub(a2.mul(x0));
      return a1.v !== a2.v && (orto || a1.v * a2.v !== -1) && b1.v !== 0 && b2.v !== 0 && Math.abs(b1.v) <= 14 && Math.abs(b2.v) <= 14 && { a1, a2, x0, y0, b1, b2 }; });
    const k = g.a1.sub(g.a2), h = g.b2.sub(g.b1), p = g.a1.mul(g.a2);
    return { _t: { a1: g.a1.v, a2: g.a2.v, b1: g.b1.v, b2: g.b2.v, x0: g.x0, y0: g.y0, orto, p: p.v },
      intro: r`To linjer $l$ og $m$ er givet ved ligningerne $l:\ ${lin(g.a1, g.b1)}$ og $m:\ ${lin(g.a2, g.b2)}$.`,
      dele: [{ tekst: r`Bestem koordinatsættet til skæringspunktet mellem linjen $l$ og linjen $m$.`,
        hints: [r`Sæt de to forskrifter lig hinanden.`, r`Løs $${rhs(g.a1, g.b1)}=${rhs(g.a2, g.b2)}$ og indsæt $x$ i en af ligningerne.`],
        loesning: r`$$${rhs(g.a1, g.b1)}=${rhs(g.a2, g.b2)} ${LR} ${ax(k)}=${h.tex()} ${LR} x=${g.x0}$$ $$y=${gange(g.a1, g.x0)}${plus(g.b1)}=${g.y0}$$ <p><b>Svar:</b> Skæringspunktet er $(${g.x0},${g.y0})$.</p>` },
      { tekst: r`Undersøg, om linjen $l$ og linjen $m$ står vinkelret på hinanden.`,
        hints: [r`Hvad skal produktet af hældningskoefficienterne være, hvis linjerne står vinkelret på hinanden?`, r`Udregn $a_l\cdot a_m=${par(g.a1)}\cdot${par(g.a2)}$ og sammenlign med $-1$.`],
        loesning: r`$$a_l\cdot a_m=${par(g.a1)}\cdot${par(g.a2)}=${p.tex()}${orto ? "" : NEQ + "-1"}$$ <p><b>Svar:</b> Linjerne står ${orto ? "" : "ikke "}vinkelret på hinanden.</p>` }] };
  }, tjek: g => Math.abs(g.a1 * g.x0 + g.b1 - g.y0) < 1e-9 && Math.abs(g.a2 * g.x0 + g.b2 - g.y0) < 1e-9 && (Math.abs(g.p + 1) < 1e-9) === g.orto },

{ id: "ret-vinkel-areal", delproeve: 1, forlaeg: "Egen variant",
  dele: [{ bogstav: "a", point: 10, kategori: "ortogonale", kraever: ["ortogonale-linjer", "linjens-ligning"], sv: 3 },
         { bogstav: "b", point: 10, kategori: "afstand", kraever: ["afstand-punkter", "ortogonale-linjer", "linjens-ligning"], sv: 3, afh: ["a"] }],
  lav() {
    const g = gen(() => { const [p, q] = medTegn(pick([[2, 1], [1, 2], [3, 1], [1, 3], [2, 3], [3, 2]])), k = pick([1, 2]), s = tegn();
      const bx = int(-2, 4), by = int(-2, 4), ax_ = bx + p, ay = by + q, cx = bx - s * k * q, cy = by + s * k * p;
      return [ax_, ay, cx, cy].every(v => v >= -6 && v <= 10) && { p, q, k, bx, by, ax: ax_, ay, cx, cy }; });
    const s2 = g.p * g.p + g.q * g.q, aAB = new Q(g.by - g.ay, g.bx - g.ax), aBC = new Q(g.cy - g.by, g.cx - g.bx), T = new Q(g.k * s2, 2);
    return { _t: { ...g, prod: aAB.mul(aBC).v, T: T.v },
      intro: r`En trekant $ABC$ har vinkelspidserne $A(${g.ax},${g.ay})$, $B(${g.bx},${g.by})$ og $C(${g.cx},${g.cy})$. Se figuren.`,
      figur: { vindue: vindue([[g.ax, g.ay], [g.bx, g.by], [g.cx, g.cy]], 1), objekter: [{ t: "stykke", x1: g.ax, y1: g.ay, x2: g.bx, y2: g.by }, { t: "stykke", x1: g.bx, y1: g.by, x2: g.cx, y2: g.cy }, { t: "stykke", x1: g.cx, y1: g.cy, x2: g.ax, y2: g.ay },
        { t: "punkt", x: g.ax, y: g.ay, navn: "A" }, { t: "punkt", x: g.bx, y: g.by, navn: "B" }, { t: "punkt", x: g.cx, y: g.cy, navn: "C" }] },
      dele: [{ tekst: r`Gør rede for, at vinkel $B$ i trekant $ABC$ er ret.`,
        hints: [r`Vinkel $B$ er ret, hvis linjestykkerne $AB$ og $BC$ står vinkelret på hinanden.`, r`Find hældningerne for $AB$ og $BC$ med topunktsformlen, og udregn deres produkt.`],
        loesning: r`$$a_{AB}=\frac{${g.by}-${par(g.ay)}}{${g.bx}-${par(g.ax)}}=${aAB.tex()},\qquad a_{BC}=\frac{${g.cy}-${par(g.by)}}{${g.cx}-${par(g.bx)}}=${aBC.tex()}$$ $$a_{AB}\cdot a_{BC}=${par(aAB)}\cdot${par(aBC)}=-1$$ <p><b>Svar:</b> Produktet er $-1$, så $AB$ og $BC$ står vinkelret på hinanden, og vinkel $B$ er ret.</p>` },
      { tekst: r`Bestem arealet af trekant $ABC$.`,
        hints: [r`Trekanten er retvinklet i $B$. Hvilke to sider kan så bruges som grundlinje og højde?`, r`Find $|AB|$ og $|BC|$ med afstandsformlen. Arealet er $\frac{1}{2}\cdot|AB|\cdot|BC|$.`],
        loesning: r`$$|AB|=\sqrt{${g.p * g.p}+${g.q * g.q}}=\sqrt{${s2}},\qquad |BC|=\sqrt{${g.k * g.k * g.q * g.q}+${g.k * g.k * g.p * g.p}}=\sqrt{${g.k * g.k * s2}}$$ <p>Da vinkel $B$ er ret, er $AB$ og $BC$ grundlinje og højde:</p> $$T=\tfrac{1}{2}\cdot\sqrt{${s2}}\cdot\sqrt{${g.k * g.k * s2}}=\tfrac{1}{2}\cdot ${g.k * s2}=${T.tex()}$$ <p><b>Svar:</b> Arealet er $${T.tex()}$.</p>` }] };
  }, tjek: g => Math.abs(g.prod + 1) < 1e-9 && Math.abs(g.T - Math.abs((g.ax - g.bx) * (g.cy - g.by) - (g.cx - g.bx) * (g.ay - g.by)) / 2) < 1e-9 },

...["cirkel-tangent", "cirkel-tangenthaeldning", "cirkel-tangentligning"].map(id => ({
  id, delproeve: 1,
  forlaeg: { "cirkel-tangent": "Vejl. sæt 1, opg. 8 · enkeltopg. 3.D1.32", "cirkel-tangenthaeldning": "Vejl. sæt 1, opg. 8", "cirkel-tangentligning": "Enkeltopg. 3.D1.32" }[id],
  dele: id === "cirkel-tangent" ? [
      { bogstav: "a", point: 10, kategori: "cirklens-ligning", kraever: ["cirklens-ligning"], sv: 1 },
      { bogstav: "b", point: 10, kategori: "cirklens-ligning", kraever: ["cirklens-ligning"], sv: 1 },
      { bogstav: "c", point: 10, kategori: "tangent-cirkel", kraever: ["tangent-cirkel", "cirklens-ligning", "ortogonale-linjer", "linjens-ligning"], sv: 3 }]
    : [{ bogstav: "a", point: 10, kategori: "cirklens-ligning", kraever: ["cirklens-ligning"], sv: 1 },
       id === "cirkel-tangenthaeldning" ? { bogstav: "b", point: 10, kategori: "tangent-cirkel", kraever: ["tangent-cirkel", "cirklens-ligning", "ortogonale-linjer"], sv: 2 }
         : { bogstav: "b", point: 10, kategori: "tangent-cirkel", kraever: ["tangent-cirkel", "cirklens-ligning", "ortogonale-linjer", "linjens-ligning"], sv: 3 }],
  lav() {
    const g = gen(() => { const [dx, dy] = medTegn(pick(Math.random() < 0.6 ? [[3, 4], [4, 3]] : SMAA)), a = ikkeNul(-5, 5), b = ikkeNul(-5, 5);
      const px = a + dx, py = b + dy, at = new Q(-dx, dy), bt = Q.of(py).sub(at.mul(px));
      return at.d <= 4 && bt.d <= 4 && Math.abs(px) <= 10 && Math.abs(py) <= 10 && { a, b, dx, dy, px, py, at }; });
    const r2 = g.dx * g.dx + g.dy * g.dy, ar = new Q(g.dy, g.dx), m = toMetoder(g.at, g.px, g.py, "t");
    const paaL = r`$$(${g.px}-${par(g.a)})^2+(${g.py}-${par(g.b)})^2=${g.dx * g.dx}+${g.dy * g.dy}=${r2}$$ <p><b>Svar:</b> Koordinaterne passer i cirklens ligning, så $P$ ligger på cirklen.</p>`;
    const paa = { tekst: r`${id === "cirkel-tangent" ? "Gør rede for" : "Vis"}, at punktet $P$ ligger på cirklen.`,
      hints: [r`Et punkt ligger på cirklen, hvis dets koordinater passer i cirklens ligning.`, r`Indsæt $x=${g.px}$ og $y=${g.py}$ i venstresiden og se, om du får $${r2}$.`], loesning: paaL };
    const radiusHint = r`Tangenten i $P$ står vinkelret på radius fra centrum $C(${g.a},${g.b})$ til $P$.`;
    const haeldL = r`<p>Centrum er $C(${g.a},${g.b})$.</p> $$a_{CP}=\frac{${g.py}-${par(g.b)}}{${g.px}-${par(g.a)}}=${ar.tex()}\quad\Rightarrow\quad ${par(ar)}\cdot a_t=-1 ${LR} a_t=${g.at.tex()}$$`;
    const tangentLigning = { tekst: r`Bestem en ligning for tangenten til cirklen i punktet $P$.`,
      hints: [radiusHint, r`Find hældningen af $CP$ med topunktsformlen. Tangentens hældning $a_t$ opfylder $a_{CP}\cdot a_t=-1$. Brug derefter punkthældningsformlen eller indsæt $P$ i $y=a_t x+b$.`],
      loesning: haeldL + m.html };
    const dele = id === "cirkel-tangent" ? [
      { tekst: r`Bestem cirklens centrum og radius.`, hints: [r`Sammenlign med cirklens ligning $(x-a)^2+(y-b)^2=r^2$.`, r`Husk at højresiden er $r^2$ og ikke $r$.`],
        loesning: r`<p>Ligningen har formen $(x-a)^2+(y-b)^2=r^2$ med $a=${g.a}$, $b=${g.b}$ og $r^2=${r2}$.</p> <p><b>Svar:</b> Centrum er $C(${g.a},${g.b})$, og radius er $r=${afstTex(r2)}$.</p>` },
      paa, tangentLigning ]
      : id === "cirkel-tangenthaeldning" ? [paa, { tekst: r`Bestem hældningskoefficienten for tangenten til cirklen i punktet $P$.`,
          hints: [r`Tangenten står vinkelret på radius fra centrum til $P$. Hvad er centrum?`, r`Centrum er $(${g.a},${g.b})$. Find hældningen af radius og brug $a_{CP}\cdot a_t=-1$.`],
          loesning: haeldL + r`<p><b>Svar:</b> Tangentens hældningskoefficient er $${g.at.tex()}$.</p>` }]
      : [paa, tangentLigning];
    return { _t: { ...g, at: g.at.v, bt: m.b.v, r2 },
      intro: r`En cirkel er givet ved ligningen $${cirkel(g.a, g.b, r2)}$. Punktet $P$ har koordinatsættet $P(${g.px},${g.py})$.`,
      figur: id === "cirkel-tangent" ? { vindue: vindue([[g.a - Math.sqrt(r2), g.b - Math.sqrt(r2)], [g.a + Math.sqrt(r2), g.b + Math.sqrt(r2)]], 1), objekter: [{ t: "cirkel", cx: g.a, cy: g.b, r: Math.sqrt(r2) }, { t: "punkt", x: g.a, y: g.b, navn: "C" }, { t: "punkt", x: g.px, y: g.py, navn: "P" }] } : undefined,
      dele };
  }, tjek: g => (g.px - g.a) ** 2 + (g.py - g.b) ** 2 === g.r2 && Math.abs(g.at * g.px + g.bt - g.py) < 1e-9 && Math.abs(g.at * (g.py - g.b) / (g.px - g.a) + 1) < 1e-9 })),

{ id: "cirkel-placering", delproeve: 1, forlaeg: "Enkeltopg. 3.D1.29",
  dele: [{ bogstav: "a", point: 10, kategori: "cirklens-ligning", kraever: ["cirklens-ligning"], sv: 1 },
         { bogstav: "b", point: 10, kategori: "cirklens-ligning", kraever: ["cirklens-ligning"], sv: 2 }],
  lav() {
    const a = ikkeNul(-6, 7), b = ikkeNul(-6, 7), typ = pick(["paa", "inden", "uden"]);
    let rr, dx, dy;
    if (typ === "paa") { [dx, dy, rr] = pick([[3, 4, 5], [4, 3, 5], [6, 8, 10], [8, 6, 10], [0, 5, 5], [5, 0, 5]]); dx *= tegn(); dy *= tegn(); }
    else { rr = int(3, 8); const ok = l => (typ === "inden" ? l < rr * rr && l > 0 : l > rr * rr); do { dx = int(-rr - 3, rr + 3); dy = int(-rr - 3, rr + 3); } while (!ok(dx * dx + dy * dy)); }
    const qx = a + dx, qy = b + dy, l = dx * dx + dy * dy, r2 = rr * rr;
    const svar = l === r2 ? "ligger på cirklen" : l < r2 ? "ligger inden for cirklen" : "ligger uden for cirklen";
    const forkl = l === r2 ? r`Venstresiden er lig $${r2}$, så koordinaterne passer i cirklens ligning.` : l < r2 ? r`Da $${l}<${r2}$, er afstanden fra $Q$ til centrum mindre end radius.` : r`Da $${l}>${r2}$, er afstanden fra $Q$ til centrum større end radius.`;
    return { _t: { a, b, rr, qx, qy, svar }, intro: r`En cirkel har centrum i punktet $C(${a},${b})$ og radius $${rr}$.`,
      dele: [{ tekst: r`Bestem en ligning for cirklen.`,
        hints: [r`Brug cirklens ligning $(x-a)^2+(y-b)^2=r^2$, hvor $(a,b)$ er centrum.`, r`Pas på fortegnene: $x-${par(a)}$ og $y-${par(b)}$. Husk at højresiden er $r^2$.`],
        loesning: r`$$(x-${par(a)})^2+(y-${par(b)})^2=${rr}^2$$ <p><b>Svar:</b> $${cirkel(a, b, r2)}$.</p>` },
      { tekst: r`Undersøg, om punktet $Q(${qx},${qy})$ ligger på cirklen, inden for cirklen eller uden for cirklen.`,
        hints: [r`Indsæt punktets koordinater i venstresiden af cirklens ligning og sammenlign med $r^2=${r2}$.`, r`Udregn $(${qx}-${par(a)})^2+(${qy}-${par(b)})^2$.`],
        loesning: r`$$(${qx}-${par(a)})^2+(${qy}-${par(b)})^2=${dx * dx}+${dy * dy}=${l}$$ <p>${forkl}</p> <p><b>Svar:</b> $Q$ ${svar}.</p>` }] };
  }, tjek: g => { const l = (g.qx - g.a) ** 2 + (g.qy - g.b) ** 2, r2 = g.rr * g.rr; return g.svar === (l === r2 ? "ligger på cirklen" : l < r2 ? "ligger inden for cirklen" : "ligger uden for cirklen"); } },

...["kvadratkomp", "kvadratkomp-vis"].map(id => ({
  id, delproeve: 1, forlaeg: id === "kvadratkomp" ? "Enkeltopg. 3.D1.34" : "Enkeltopg. 3.D1.33",
  dele: [{ bogstav: "a", point: 10, kategori: "cirklens-ligning", kraever: ["cirklens-ligning", "kvadratkomplettering"], sv: 3 }],
  lav() {
    const g = gen(() => { const a = ikkeNul(-5, 5), b = ikkeNul(-5, 5), rr = int(2, 7), c = a * a + b * b - rr * rr; return c !== 0 && { a, b, rr, c }; });
    const r2 = g.rr * g.rr, nulForm = id === "kvadratkomp-vis" || g.c > 0 && Math.random() < 0.5;
    const lign = udfoldet(g.a, g.b, r2, nulForm);
    const xs = r`${kvad("x", g.a)}-${g.a * g.a}`, ys = r`${kvad("y", g.b)}-${g.b * g.b}`;
    const trin = nulForm ? r`$$${xs}+${ys}${g.c === 0 ? "" : (g.c > 0 ? "+" : "-") + Math.abs(g.c)}=0$$` : r`$$${xs}+${ys}=${-g.c}$$`;
    const hint2 = r`$${"x^2" + led(-2 * g.a, "x")}=${kvad("x", g.a)}-${g.a * g.a}$ og $${"y^2" + led(-2 * g.b, "y")}=${kvad("y", g.b)}-${g.b * g.b}$. Indsæt og saml konstanterne på højresiden.`;
    return { _t: { ...g, lign },
      intro: r`En cirkel er givet ved ligningen $${lign}$.`,
      dele: [{ tekst: id === "kvadratkomp" ? r`Bestem cirklens centrum og radius.` : r`Vis, at cirklen har centrum i $C(${g.a},${g.b})$.`,
        hints: [r`Omskriv ligningen til formen $(x-a)^2+(y-b)^2=r^2$ ved kvadratkomplettering.`, hint2],
        loesning: r`$$${lign}$$ ${trin} $$${cirkel(g.a, g.b, r2)}$$ <p><b>Svar:</b> ${id === "kvadratkomp" ? r`Centrum er $(${g.a},${g.b})$, og radius er $${g.rr}$.` : r`Ligningen har formen $(x-${par(g.a)})^2+(y-${par(g.b)})^2=${g.rr}^2$, så centrum er $C(${g.a},${g.b})$.`}</p>` }] };
  }, tjek: g => true })),

{ id: "diameter", delproeve: 1, forlaeg: "Enkeltopg. 3.D1.36",
  dele: [{ bogstav: "a", point: 10, kategori: "midtpunkt", kraever: ["midtpunkt"], sv: 1 },
         { bogstav: "b", point: 10, kategori: "cirklens-ligning", kraever: ["cirklens-ligning", "midtpunkt", "afstand-punkter"], sv: 2 }],
  lav() {
    const g = gen(() => { const [dx, dy] = medTegn(pick([[3, 4], [4, 3], [1, 2], [2, 1], [2, 3], [3, 1], [5, 0], [0, 5]])), cx = int(-4, 5), cy = int(-3, 7);
      return { cx, cy, ax: cx - dx, ay: cy - dy, bx: cx + dx, by: cy + dy, dx, dy }; });
    const r2 = g.dx * g.dx + g.dy * g.dy, rr = Math.sqrt(r2);
    return { _t: g, intro: r`Punkterne $A(${g.ax},${g.ay})$ og $B(${g.bx},${g.by})$ er endepunkter for en diameter i en cirkel.`,
      figur: { vindue: vindue([[g.cx - rr, g.cy - rr], [g.cx + rr, g.cy + rr]], 1), objekter: [{ t: "cirkel", cx: g.cx, cy: g.cy, r: rr }, { t: "stykke", x1: g.ax, y1: g.ay, x2: g.bx, y2: g.by }, { t: "punkt", x: g.ax, y: g.ay, navn: "A" }, { t: "punkt", x: g.bx, y: g.by, navn: "B" }] },
      dele: [{ tekst: r`Bestem koordinatsættet til cirklens centrum.`, hints: [r`Centrum ligger midt på enhver diameter.`, r`Brug midtpunktsformlen på $A$ og $B$.`],
        loesning: r`$$C\left(\frac{${g.ax}+${par(g.bx)}}{2},\frac{${g.ay}+${par(g.by)}}{2}\right)=C(${g.cx},${g.cy})$$ <p><b>Svar:</b> Centrum er $C(${g.cx},${g.cy})$.</p>` },
      { tekst: r`Bestem en ligning for cirklen.`, hints: [r`Du kender centrum fra a). Radius er afstanden fra centrum til $A$ (eller $B$).`, r`Find $|CA|$ med afstandsformlen, og indsæt i $(x-a)^2+(y-b)^2=r^2$.`],
        loesning: r`$$r=|CA|=\sqrt{(${g.ax}-${par(g.cx)})^2+(${g.ay}-${par(g.cy)})^2}=\sqrt{${r2}}${afstTex(r2) === String(rr) ? "=" + rr : ""}$$ <p><b>Svar:</b> $${cirkel(g.cx, g.cy, r2)}$.</p>` }] };
  }, tjek: g => 2 * g.cx === g.ax + g.bx && 2 * g.cy === g.ay + g.by },

{ id: "linje-figur", delproeve: 1, forlaeg: "Egen variant",
  dele: [{ bogstav: "a", point: 10, kategori: "linjens-ligning", kraever: AG, sv: 1 }],
  lav() {
    const a = pick([1, 2, 3, -1, -2, -3]), b = ikkeNul(-4, 5), xb = int(1, 4), yb = a * xb + b;
    return { _t: { a, b, xb, yb }, intro: r`Figuren viser en linje $l$ i et koordinatsystem. Linjen går gennem punkterne $(0,${b})$ og $(${xb},${yb})$.`,
      figur: { vindue: vindue([[0, b], [xb, yb]], 2), objekter: [{ t: "linje", a, b, navn: "l" }, { t: "punkt", x: 0, y: b }, { t: "punkt", x: xb, y: yb }] },
      dele: [{ tekst: r`Bestem en ligning for linjen $l$.`,
        hints: [r`Det ene punkt ligger på $y$-aksen. Hvad fortæller det om $b$?`, r`Hældningen er $a=\frac{${yb}-${par(b)}}{${xb}-0}$.`],
        loesning: r`$$a=\frac{${yb}-${par(b)}}{${xb}-0}=\frac{${yb - b}}{${xb}}=${a}$$ <p>Linjen skærer $y$-aksen i $(0,${b})$, så $b=${b}$.</p> <p><b>Svar:</b> $l:\ ${lin(a, b)}$.</p>` }] };
  }, tjek: g => g.a * g.xb + g.b === g.yb },

{ id: "midtnormal", delproeve: 1, forlaeg: "Egen variant",
  dele: [{ bogstav: "a", point: 10, kategori: "ortogonale", kraever: ["ortogonale-linjer", "midtpunkt", "linjens-ligning"], sv: 3 }],
  lav() {
    const g = gen(() => { const dx = 2 * ikkeNul(-4, 4), dy = 2 * ikkeNul(-4, 4), ax_ = int(-5, 4), ay = int(-4, 5), bx = ax_ + dx, by = ay + dy;
      const mx = (ax_ + bx) / 2, my = (ay + by) / 2, aAB = new Q(dy, dx), an = new Q(-1).div(aAB), bn = Q.of(my).sub(an.mul(mx));
      return an.d <= 4 && bn.d <= 3 && Math.abs(bx) <= 10 && Math.abs(by) <= 10 && { ax: ax_, ay, bx, by, mx, my, aAB, an }; });
    const m = toMetoder(g.an, g.mx, g.my, "m");
    return { _t: { ...g, an: g.an.v, bn: m.b.v, aAB: g.aAB.v },
      intro: r`I et koordinatsystem er punkterne $A(${g.ax},${g.ay})$ og $B(${g.bx},${g.by})$ givet. En linje $m$ står vinkelret på linjestykket $AB$ og går gennem midtpunktet af $AB$.`,
      figur: { vindue: vindue([[g.ax, g.ay], [g.bx, g.by]], 2), objekter: [{ t: "stykke", x1: g.ax, y1: g.ay, x2: g.bx, y2: g.by }, { t: "linje", a: g.an.v, b: m.b.v, navn: "m" }, { t: "punkt", x: g.ax, y: g.ay, navn: "A" }, { t: "punkt", x: g.bx, y: g.by, navn: "B" }] },
      dele: [{ tekst: r`Bestem en ligning for linjen $m$.`,
        hints: [r`Du skal bruge et punkt på $m$ og hældningen af $m$. Punktet er midtpunktet af $AB$.`, r`Find midtpunktet $M$ og hældningen $a_{AB}$. Hældningen af $m$ opfylder $a_{AB}\cdot a_m=-1$.`],
        loesning: r`$$M\left(\frac{${g.ax}+${par(g.bx)}}{2},\frac{${g.ay}+${par(g.by)}}{2}\right)=M(${g.mx},${g.my}),\qquad a_{AB}=\frac{${g.by}-${par(g.ay)}}{${g.bx}-${par(g.ax)}}=${g.aAB.tex()}$$ $$${par(g.aAB)}\cdot a_m=-1 ${LR} a_m=${g.an.tex()}$$ ${m.html}` }] };
  }, tjek: g => Math.abs(g.an * g.aAB + 1) < 1e-9 && Math.abs(g.an * g.mx + g.bn - g.my) < 1e-9 },

{ id: "to-punkter-skaering", delproeve: 1, forlaeg: "Egen variant",
  dele: [{ bogstav: "a", point: 10, kategori: "linjens-ligning", kraever: AG, sv: 1 },
         { bogstav: "b", point: 10, kategori: "skaering-linjer", kraever: ["skaering-linjer", "linjens-ligning"], sv: 2, afh: ["a"] }],
  lav() {
    const g = gen(() => { const sx = ikkeNul(-3, 5), sy = int(-3, 7), am = pick([1, 2, 3, -1, -2]), al = pick([1, 2, 3, -1, -2, -3]), bm = sy - am * sx, bl = sy - al * sx, xb = int(1, 4);
      return al !== am && bm !== 0 && Math.abs(bm) <= 10 && Math.abs(bl) <= 12 && xb !== sx && { sx, sy, am, al, bm, bl, xb, yb: am * xb + bm }; });
    return { _t: g, intro: r`En linje $l$ har ligningen $l:\ ${lin(g.al, g.bl)}$. En anden linje $m$ går gennem punkterne $A(0,${g.bm})$ og $B(${g.xb},${g.yb})$.`,
      dele: [{ tekst: r`Bestem en ligning for linjen $m$.`,
        hints: [r`Find hældningen med topunktsformlen $a=\frac{y_2-y_1}{x_2-x_1}$.`, r`$A$ ligger på $y$-aksen, så $b$ kan aflæses direkte.`],
        loesning: r`$$a=\frac{${g.yb}-${par(g.bm)}}{${g.xb}-0}=${g.am}$$ <p>$A(0,${g.bm})$ ligger på $y$-aksen, så $b=${g.bm}$.</p> <p><b>Svar:</b> $m:\ ${lin(g.am, g.bm)}$.</p>` },
      { tekst: r`Bestem koordinatsættet til skæringspunktet mellem linjen $l$ og linjen $m$.`,
        hints: [r`Sæt forskrifterne for $l$ og $m$ lig hinanden.`, r`Løs $${rhs(g.al, g.bl)}=${rhs(g.am, g.bm)}$ og indsæt $x$ i en af ligningerne.`],
        loesning: r`$$${rhs(g.al, g.bl)}=${rhs(g.am, g.bm)} ${LR} ${ax(g.al - g.am)}=${g.bm - g.bl} ${LR} x=${g.sx}$$ $$y=${gange(g.am, g.sx)}${plus(g.bm)}=${g.sy}$$ <p><b>Svar:</b> Skæringspunktet er $(${g.sx},${g.sy})$.</p>` }] };
  }, tjek: g => g.al * g.sx + g.bl === g.sy && g.am * g.sx + g.bm === g.sy },

{ id: "ortogonal-c", delproeve: 1, forlaeg: "Enkeltopg. 3.D1.25",
  dele: [{ bogstav: "a", point: 10, kategori: "ortogonale", kraever: ["ortogonale-linjer"], sv: 2 }],
  lav() {
    const al = pick(HLD), bl = ikkeNul(-8, 8), k = ikkeNul(-8, 8), c = new Q(-1).div(al);
    return { _t: { al: al.v, c: c.v }, intro: r`En linje $l$ har ligningen $l:\ ${lin(al, bl)}$, og en anden linje $m$ har ligningen $m:\ y=c\cdot x${plus(k)}$, hvor $c$ er et tal.`,
      dele: [{ tekst: r`Bestem værdien af $c$, så linjerne $l$ og $m$ er ortogonale.`,
        hints: [r`$c$ er hældningen af $m$.`, r`Løs $${par(al)}\cdot c=-1$.`],
        loesning: r`$$${par(al)}\cdot c=-1 ${LR} c=${c.tex()}$$ <p><b>Svar:</b> $c=${c.tex()}$.</p>` }] };
  }, tjek: g => Math.abs(g.al * g.c + 1) < 1e-9 },

{ id: "tre-punkter", delproeve: 1, forlaeg: "Enkeltopg. 3.D1.26",
  dele: [{ bogstav: "a", point: 10, kategori: "linjens-ligning", kraever: AG, sv: 3 }],
  lav() {
    const paa = Math.random() < 0.5;
    const g = gen(() => { const dx = int(1, 5), dy = ikkeNul(-4, 4), bx = int(-2, 2), by = int(-3, 4), t = pick([2, 3, 4, 5]);
      const ax_ = bx - dx, ay = by - dy, cx = bx + t * dx, cy = by + t * dy + (paa ? 0 : pick([-1, 1]));
      return Math.abs(cx) <= 30 && Math.abs(cy) <= 30 && { ax: ax_, ay, bx, by, cx, cy }; });
    const a1 = new Q(g.by - g.ay, g.bx - g.ax), a2 = new Q(g.cy - g.by, g.cx - g.bx), ens = a1.v === a2.v;
    return { _t: { ...g, ens, paa }, intro: r`I et koordinatsystem er givet tre punkter $A(${g.ax},${g.ay})$, $B(${g.bx},${g.by})$ og $C(${g.cx},${g.cy})$.`,
      dele: [{ tekst: r`Undersøg, om punkterne $A$, $B$ og $C$ ligger på en ret linje.`,
        hints: [r`Hvis de tre punkter ligger på samme linje, er hældningen fra $A$ til $B$ den samme som fra $B$ til $C$.`, r`Udregn $a_{AB}$ og $a_{BC}$ med topunktsformlen.`],
        loesning: r`$$a_{AB}=\frac{${g.by}-${par(g.ay)}}{${g.bx}-${par(g.ax)}}=${a1.tex()},\qquad a_{BC}=\frac{${g.cy}-${par(g.by)}}{${g.cx}-${par(g.bx)}}=${a2.tex()}$$ <p><b>Svar:</b> ${ens ? "Hældningerne er ens, og linjestykkerne har punktet $B$ fælles, så $A$, $B$ og $C$ ligger på en ret linje." : "Hældningerne er forskellige, så $A$, $B$ og $C$ ligger ikke på en ret linje."}</p>` }] };
  }, tjek: g => g.ens === g.paa },

{ id: "ortogonal-yakse", delproeve: 1, forlaeg: "Enkeltopg. 3.D1.27",
  dele: [{ bogstav: "a", point: 10, kategori: "ortogonale", kraever: ["ortogonale-linjer", "linjens-ligning"], sv: 2 }],
  lav() {
    const al = pick(HLD), bl = ikkeNul(-6, 8), p = ikkeNul(-8, 9), am = new Q(-1).div(al);
    return { _t: { al: al.v, am: am.v }, intro: r`En linje $l$ er givet ved ligningen $${lin(al, bl)}$. Linjen $m$ står vinkelret på $l$ og går gennem punktet $P(0,${p})$.`,
      dele: [{ tekst: r`Bestem en ligning for $m$.`,
        hints: [r`Find hældningen af $m$ med $a_l\cdot a_m=-1$.`, r`$P$ ligger på $y$-aksen. Hvad betyder det for $b$?`],
        loesning: r`$$${par(al)}\cdot a_m=-1 ${LR} a_m=${am.tex()}$$ <p>$P(0,${p})$ ligger på $y$-aksen, så $b=${p}$.</p> <p><b>Svar:</b> $m:\ ${lin(am, p)}$.</p>` }] };
  }, tjek: g => Math.abs(g.al * g.am + 1) < 1e-9 },

{ id: "trekant-xakse", delproeve: 1, forlaeg: "Enkeltopg. 3.D1.28",
  dele: [{ bogstav: "a", point: 10, kategori: "ortogonale", kraever: ["ortogonale-linjer"], sv: 1 },
         { bogstav: "b", point: 10, kategori: "skaering-linjer", kraever: ["skaering-linjer", "linjens-ligning"], sv: 3 }],
  lav() {
    const orto = Math.random() < 0.5;
    const g = gen(() => { let p, q, h; if (orto) [p, q, h] = pick([[1, 4, 2], [4, 1, 2], [2, 8, 4], [8, 2, 4], [1, 9, 3], [9, 1, 3], [2, 2, 2], [3, 3, 3], [4, 9, 6], [9, 4, 6]]); else { p = int(1, 6); q = int(1, 6); h = int(2, 6); }
      const x1 = int(-6, 0), sx = x1 + p, x2 = sx + q, s1 = new Q(h, p), s2 = new Q(-h, q), b1 = s1.mul(-x1), b2 = s2.mul(-x2);
      return (orto || h * h !== p * q) && s1.d <= 3 && s2.d <= 3 && b1.d <= 3 && b2.d <= 3 && { p, q, h, x1, x2, sx, s1, s2, b1, b2 }; });
    const prod = g.s1.mul(g.s2), T = new Q((g.x2 - g.x1) * g.h, 2);
    return { _t: { orto, prod: prod.v, x1: g.x1, x2: g.x2, sx: g.sx, h: g.h, s1: g.s1.v, s2: g.s2.v, b1: g.b1.v, b2: g.b2.v, T: T.v },
      intro: r`To linjer $l$ og $m$ er givet ved ligningerne $$l:\ ${lin(g.s1, g.b1)}\qquad m:\ ${lin(g.s2, g.b2)}$$`,
      figur: { vindue: vindue([[g.x1, 0], [g.x2, 0], [g.sx, g.h]], 2), objekter: [{ t: "linje", a: g.s1.v, b: g.b1.v, navn: "l" }, { t: "linje", a: g.s2.v, b: g.b2.v, navn: "m" }] },
      dele: [{ tekst: r`Undersøg, om linjerne $l$ og $m$ er ortogonale.`,
        hints: [r`Udregn produktet af hældningerne.`, r`$${par(g.s1)}\cdot${par(g.s2)}=\,?$`],
        loesning: r`$$${par(g.s1)}\cdot${par(g.s2)}=${prod.tex()}${orto ? "" : NEQ + "-1"}$$ <p><b>Svar:</b> Linjerne er ${orto ? "" : "ikke "}ortogonale.</p>` },
      { tekst: r`Sammen med $x$-aksen afgrænser $l$ og $m$ et trekantet område $M$. Se figuren. Bestem arealet af $M$.`,
        hints: [r`Trekantens hjørner er de to linjers skæringspunkter med $x$-aksen og skæringspunktet mellem $l$ og $m$.`, r`Grundlinjen ligger på $x$-aksen. Højden er $y$-værdien i skæringspunktet mellem $l$ og $m$.`],
        loesning: r`<p>Skæring med $x$-aksen ($y=0$):</p> $$${rhs(g.s1, g.b1)}=0 ${LR} x=${g.x1},\qquad ${rhs(g.s2, g.b2)}=0 ${LR} x=${g.x2}$$ <p>Skæring mellem $l$ og $m$: $${rhs(g.s1, g.b1)}=${rhs(g.s2, g.b2)} ${LR} x=${g.sx}$, og $y=${g.h}$.</p> $$T=\tfrac{1}{2}\cdot(${g.x2}-${par(g.x1)})\cdot ${g.h}=${T.tex()}$$ <p><b>Svar:</b> Arealet af $M$ er $${T.tex()}$.</p>` }] };
  }, tjek: g => (Math.abs(g.prod + 1) < 1e-9) === g.orto && Math.abs(g.s1 * g.x1 + g.b1) < 1e-9 && Math.abs(g.s2 * g.x2 + g.b2) < 1e-9 && Math.abs(g.s1 * g.sx + g.b1 - g.h) < 1e-9 && Math.abs(g.s2 * g.sx + g.b2 - g.h) < 1e-9 },

{ id: "cirkel-yakse", delproeve: 1, forlaeg: "Enkeltopg. 3.D1.30",
  dele: [{ bogstav: "a", point: 10, kategori: "cirklens-ligning", kraever: ["cirklens-ligning"], sv: 1 },
         { bogstav: "b", point: 10, kategori: "linje-cirkel", kraever: ["cirklens-ligning", "skaering-linje-cirkel"], sv: 2 }],
  lav() {
    const [a0, dy, rr] = pick([[3, 4, 5], [4, 3, 5], [6, 8, 10], [8, 6, 10]]), a = a0 * tegn(), b = int(-5, 5), r2 = rr * rr;
    return { _t: { a, b, rr, y1: b + dy, y2: b - dy }, intro: r`En cirkel er givet ved ligningen $${cirkel(a, b, r2)}$.`,
      dele: [{ tekst: r`Bestem cirklens radius og koordinatsættet til cirklens centrum.`, hints: [r`Sammenlign med $(x-a)^2+(y-b)^2=r^2$.`, r`Pas på fortegnene, og husk at højresiden er $r^2$.`],
        loesning: r`<p><b>Svar:</b> Centrum er $(${a},${b})$, og radius er $${rr}$.</p>` },
      { tekst: r`Bestem koordinatsættet til hvert af cirklens skæringspunkter med $y$-aksen.`,
        hints: [r`På $y$-aksen er $x=0$. Indsæt $x=0$ i cirklens ligning.`, r`Du får $${a * a}+${kvad("y", b)}=${r2}$, altså $${kvad("y", b)}=${r2 - a * a}$.`],
        loesning: r`$$(0-${par(a)})^2+${kvad("y", b)}=${r2} ${LR} ${kvad("y", b)}=${dy * dy} ${LR} ${xminus("y", b)}=\pm ${dy}$$ <p>Det giver $y=${b + dy}$ eller $y=${b - dy}$.</p> <p><b>Svar:</b> $(0,${b + dy})$ og $(0,${b - dy})$.</p>` }] };
  }, tjek: g => g.a ** 2 + (g.y1 - g.b) ** 2 === g.rr ** 2 && g.a ** 2 + (g.y2 - g.b) ** 2 === g.rr ** 2 },

{ id: "cirkel-lodret", delproeve: 1, forlaeg: "Enkeltopg. 3.D1.31",
  dele: [{ bogstav: "a", point: 10, kategori: "linje-cirkel", kraever: ["cirklens-ligning", "kvadratkomplettering", "skaering-linje-cirkel"], sv: 3 }],
  lav() {
    const g = gen(() => { const a = ikkeNul(-4, 4), b = ikkeNul(-4, 4), [dx0, dy] = pick([[3, 4], [4, 3]]), dx = dx0 * tegn(), c = a * a + b * b - 25; return c !== 0 && a + dx !== 0 && { a, b, dx, dy, x0: a + dx }; });
    const lign = udfoldet(g.a, g.b, 25, true);
    return { _t: { ...g, y1: g.b + g.dy, y2: g.b - g.dy }, intro: r`På figuren ses en cirkel givet ved ligningen $${lign}$ og en lodret linje $l$ givet ved ligningen $l:\ x=${g.x0}$.`,
      figur: { vindue: vindue([[g.a - 5, g.b - 5], [g.a + 5, g.b + 5]], 1), objekter: [{ t: "cirkel", cx: g.a, cy: g.b, r: 5 }, { t: "lodret", x: g.x0, navn: "l" }] },
      dele: [{ tekst: r`Bestem koordinatsættene til hvert af skæringspunkterne mellem cirklen og linjen $l$.`,
        hints: [r`Indsæt $x=${g.x0}$ i cirklens ligning. Du kan med fordel først omskrive cirklens ligning ved kvadratkomplettering.`, r`$${cirkel(g.a, g.b, 25)}$. Med $x=${g.x0}$ fås $${g.dx * g.dx}+${kvad("y", g.b)}=25$.`],
        loesning: r`$$${lign} ${LR} ${cirkel(g.a, g.b, 25)}$$ $$(${g.x0}-${par(g.a)})^2+${kvad("y", g.b)}=25 ${LR} ${kvad("y", g.b)}=${g.dy * g.dy} ${LR} ${xminus("y", g.b)}=\pm ${g.dy}$$ <p>Det giver $y=${g.b + g.dy}$ eller $y=${g.b - g.dy}$.</p> <p><b>Svar:</b> $(${g.x0},${g.b + g.dy})$ og $(${g.x0},${g.b - g.dy})$.</p>` }] };
  }, tjek: g => (g.x0 - g.a) ** 2 + (g.y1 - g.b) ** 2 === 25 && (g.x0 - g.a) ** 2 + (g.y2 - g.b) ** 2 === 25 },

{ id: "midtpunkt-figur", delproeve: 1, forlaeg: "Enkeltopg. 3.D1.35",
  dele: [{ bogstav: "a", point: 10, kategori: "midtpunkt", kraever: ["midtpunkt"], sv: 1 }],
  lav() {
    const g = gen(() => { const x1 = int(-5, 3), y1 = int(-3, 7), x2 = x1 + 2 * int(2, 5), y2 = y1 + 2 * ikkeNul(-4, 4); return Math.abs(y2) <= 10 && { x1, y1, x2, y2, mx: (x1 + x2) / 2, my: (y1 + y2) / 2 }; });
    return { _t: g, intro: r`Figuren viser to punkter $A(${g.x1},${g.y1})$ og $B(${g.x2},${g.y2})$. $M$ betegner midtpunktet af linjestykket $AB$.`,
      figur: { vindue: vindue([[g.x1, g.y1], [g.x2, g.y2]], 2), objekter: [{ t: "stykke", x1: g.x1, y1: g.y1, x2: g.x2, y2: g.y2 }, { t: "punkt", x: g.x1, y: g.y1, navn: "A" }, { t: "punkt", x: g.x2, y: g.y2, navn: "B" }] },
      dele: [{ tekst: r`Bestem koordinatsættet til $M$.`, hints: [r`Brug midtpunktsformlen.`, r`$M\left(\frac{x_1+x_2}{2},\frac{y_1+y_2}{2}\right)$.`],
        loesning: r`$$M\left(\frac{${g.x1}+${par(g.x2)}}{2},\frac{${g.y1}+${par(g.y2)}}{2}\right)=M(${g.mx},${g.my})$$ <p><b>Svar:</b> $M(${g.mx},${g.my})$.</p>` }] };
  }, tjek: g => Number.isInteger(g.mx) && Number.isInteger(g.my) },

{ id: "ligebenet", delproeve: 1, forlaeg: "Enkeltopg. 3.D1.37",
  dele: [{ bogstav: "a", point: 10, kategori: "afstand", kraever: ["afstand-punkter"], sv: 3 }],
  lav() {
    const g = gen(() => { const u = pick(L5), v = pick(L5), bx = int(-3, 4), by = int(-3, 4), ac2 = (u[0] - v[0]) ** 2 + (u[1] - v[1]) ** 2;
      return ac2 !== 25 && ac2 !== 0 && ac2 !== 100 && { bx, by, ax: bx + u[0], ay: by + u[1], cx: bx + v[0], cy: by + v[1], u, v, ac2 }; });
    return { _t: g, intro: r`En trekant $ABC$ har vinkelspidserne $A(${g.ax},${g.ay})$, $B(${g.bx},${g.by})$ og $C(${g.cx},${g.cy})$.`,
      dele: [{ tekst: r`Gør rede for, at trekant $ABC$ har netop to lige lange sider.`,
        hints: [r`Bestem længden af alle tre sider med afstandsformlen.`, r`Udregn $|AB|$, $|BC|$ og $|AC|$ og sammenlign.`],
        loesning: r`$$|AB|=\sqrt{${g.u[0] ** 2}+${g.u[1] ** 2}}=5,\quad |BC|=\sqrt{${g.v[0] ** 2}+${g.v[1] ** 2}}=5,\quad |AC|=\sqrt{${(g.cx - g.ax) ** 2}+${(g.cy - g.ay) ** 2}}=${afstTex(g.ac2)}$$ <p><b>Svar:</b> $|AB|=|BC|=5$, mens $|AC|=${afstTex(g.ac2)}\neq 5$. Trekanten har altså netop to lige lange sider.</p>` }] };
  }, tjek: g => dist(g.ax, g.ay, g.bx, g.by) === 5 && dist(g.bx, g.by, g.cx, g.cy) === 5 && g.ac2 !== 25 },

{ id: "hvilken-cirkel", delproeve: 1, forlaeg: "Enkeltopg. 3.D1.38",
  dele: [{ bogstav: "a", point: 10, kategori: "cirklens-ligning", kraever: ["cirklens-ligning"], sv: 1 }],
  lav() {
    const g = gen(() => { const rr = pick([2, 3]), a = ikkeNul(-4, 4), b = ikkeNul(-4, 4), [oa, ob] = pick([[-a, -b], [a, -b], [-a, b]]);
      return dist(a, b, oa, ob) >= 2 * rr + 1 && { rr, a, b, oa, ob, maal: pick([1, 2]) }; });
    const c1 = g.maal === 1 ? [g.a, g.b] : [g.oa, g.ob], c2 = g.maal === 1 ? [g.oa, g.ob] : [g.a, g.b];
    return { _t: g, intro: r`Figuren viser to cirkler $C_1$ og $C_2$.`,
      figur: { vindue: vindue([[g.a - g.rr, g.b - g.rr], [g.a + g.rr, g.b + g.rr], [g.oa - g.rr, g.ob - g.rr], [g.oa + g.rr, g.ob + g.rr]], 1),
        objekter: [{ t: "cirkel", cx: c1[0], cy: c1[1], r: g.rr, navn: "C₁" }, { t: "cirkel", cx: c2[0], cy: c2[1], r: g.rr, navn: "C₂" }] },
      dele: [{ tekst: r`Gør rede for, hvilken af cirklerne der har ligningen $${cirkel(g.a, g.b, g.rr * g.rr)}$.`,
        hints: [r`Find centrum og radius ud fra ligningen.`, r`Centrum er $(${g.a},${g.b})$. Hvilken cirkel har centrum dér?`],
        loesning: r`<p>Ligningen beskriver en cirkel med centrum $(${g.a},${g.b})$ og radius $${g.rr}$. Begge cirkler har radius $${g.rr}$, men kun $C_${g.maal}$ har centrum i $(${g.a},${g.b})$.</p><p><b>Svar:</b> Det er $C_${g.maal}$.</p>` }] };
  }, tjek: g => true },

{ id: "vandret-to-punkter", delproeve: 1, forlaeg: "Enkeltopg. 3.D1.39",
  dele: [{ bogstav: "a", point: 10, kategori: "linje-cirkel", kraever: ["cirklens-ligning", "skaering-linje-cirkel"], sv: 2 }],
  lav() {
    const a = ikkeNul(-5, 5), b = int(-4, 6), rr = int(3, 7), k = ikkeNul(-(rr - 1), rr - 1), yl = b + k;
    return { _t: { a, b, rr, yl }, intro: r`En cirkel er givet ved ligningen $${cirkel(a, b, rr * rr)}$, og en vandret linje $l$ er givet ved ligningen $y=${yl}$.`,
      dele: [{ tekst: r`Gør rede for, at linjen $l$ og cirklen har to punkter fælles.`,
        hints: [r`Find cirklens centrum og radius. Hvor langt er der fra centrum lodret til linjen $y=${yl}$?`, r`Eller: indsæt $y=${yl}$ i cirklens ligning og se, hvor mange løsninger der er.`],
        loesning: r`<p>Centrum er $(${a},${b})$ og radius $${rr}$. Den lodrette afstand fra centrum til linjen $y=${yl}$ er $|${yl}-${par(b)}|=${Math.abs(k)}$.</p><p>Da $${Math.abs(k)}<${rr}$, skærer linjen cirklen i to punkter.</p><p>(Alternativt: $${kvad("x", a)}+${k * k}=${rr * rr} ${LR} ${kvad("x", a)}=${rr * rr - k * k}$, som har to løsninger.)</p><p><b>Svar:</b> Linjen og cirklen har to punkter fælles.</p>` }] };
  }, tjek: g => Math.abs(g.yl - g.b) < g.rr },

{ id: "parallel-centrum", delproeve: 1, forlaeg: "Enkeltopg. 3.D1.40",
  dele: [{ bogstav: "a", point: 10, kategori: "parallelle", kraever: ["parallelle-linjer", "cirklens-ligning", "linjens-ligning"], sv: 2 }],
  lav() {
    const g = gen(() => { const s = pick(HLD), a = s.d * ikkeNul(Math.ceil(-5 / s.d), Math.floor(5 / s.d)), b = ikkeNul(-5, 6), t = ikkeNul(-8, 8), r2 = int(3, 20);
      const bm = Q.of(b).sub(s.mul(a)); return bm.v !== t && Math.abs(bm.v) <= 14 && { s, a, b, t, r2 }; });
    const m = toMetoder(g.s, g.a, g.b, "m");
    return { _t: { s: g.s.v, a: g.a, b: g.b, bm: m.b.v }, intro: r`En cirkel har ligningen $${cirkel(g.a, g.b, g.r2)}$, og en linje $l$ har ligningen $${lin(g.s, g.t)}$.`,
      dele: [{ tekst: r`Bestem en ligning for den linje $m$, der er parallel med $l$, og som går gennem cirklens centrum.`,
        hints: [r`Find cirklens centrum. $m$ har samme hældning som $l$.`, r`Centrum er $(${g.a},${g.b})$. ` + hintTo(g.s, g.a, g.b)],
        loesning: r`<p>Centrum er $(${g.a},${g.b})$, og $m$ har hældningen $${g.s.tex()}$.</p> ${m.html}` }] };
  }, tjek: g => Math.abs(g.s * g.a + g.bm - g.b) < 1e-9 && Number.isInteger(g.bm) },

{ id: "skaerer-ikke", delproeve: 1, forlaeg: "Enkeltopg. 3.D1.41",
  dele: [{ bogstav: "a", point: 10, kategori: "linje-cirkel", kraever: ["cirklens-ligning", "skaering-linje-cirkel"], sv: 3 }],
  lav() {
    const g = gen(() => { const a = ikkeNul(-4, 4), b = ikkeNul(-4, 4), rr = int(1, 4), k = pick([1, -1, 2, -2]), m = ikkeNul(-8, 8), e = m - b;
      const A = 1 + k * k, B = 2 * (k * e - a), C = a * a + e * e - rr * rr, d = B * B - 4 * A * C;
      return d < 0 && Math.abs(k * a + m - b) / Math.sqrt(k * k + 1) > rr + 0.5 && { a, b, rr, k, m, e, A, B, C }; });
    const f = gcd(gcd(g.A, Math.abs(g.B)), Math.abs(g.C)) || 1, A = g.A / f, B = g.B / f, C = g.C / f, d = B * B - 4 * A * C;
    return { _t: { ...g, d }, intro: r`En cirkel har ligningen $${cirkel(g.a, g.b, g.rr * g.rr)}$, og en linje $l$ har ligningen $${lin(g.k, g.m)}$.`,
      dele: [{ tekst: r`Gør rede for, at linjen ikke skærer cirklen.`,
        hints: [r`Indsæt $y=${rhs(g.k, g.m)}$ i cirklens ligning og undersøg, om den andengradsligning, du får, har løsninger.`, r`Du får $${kvad("x", g.a)}+(${rhs(g.k, g.e)})^2=${g.rr * g.rr}$. Gang ud, saml leddene og beregn diskriminanten.`],
        loesning: r`$$${kvad("x", g.a)}+(${rhs(g.k, g.e)})^2=${g.rr * g.rr} ${LR} ${poly2(g.A, g.B, g.C)}=0${f > 1 ? " " + LR + " " + poly2(A, B, C) + "=0" : ""}$$ $$d=${par(B)}^2-4\cdot ${A}\cdot ${par(C)}=${d}<0$$ <p><b>Svar:</b> Diskriminanten er negativ, så ligningen har ingen løsninger, og linjen skærer ikke cirklen.</p>` }] };
  }, tjek: g => g.d < 0 && g.B * g.B - 4 * g.A * g.C < 0 },

// ═════════════════════ DELPRØVE 2 ═════════════════════

{ id: "punktlinje-parallel", delproeve: 2, forlaeg: "Vejl. sæt 2, opg. 11",
  dele: [{ bogstav: "a", point: 10, kategori: "punkt-linje", kraever: ["afstand-punkt-linje"], sv: 2 },
         { bogstav: "b", point: 10, kategori: "parallelle", kraever: ["parallelle-linjer", "linjens-ligning"], sv: 2, ikkeAlene: true }],
  lav() {
    const g = gen(() => { const a = pick([2, 3, -2, -3, 0.5, -0.5, 1.5, -1.5, 0.4, -0.4, 2.5, -1.2]), b = int(-6, 8), px = int(-5, 8), py = int(-5, 8), t = a * px + b - py;
      return Math.abs(t) >= 2 && Math.abs(t) <= 25 && { a, b, px, py, t }; });
    const n = Math.abs(g.t), q = g.a * g.a + 1, d = n / Math.sqrt(q), m = toMetoder(g.a, g.px, g.py, "m");
    return { _t: { ...g, d, bm: m.b }, intro: r`Linjen $l$ er givet ved ligningen $l:\ ${lin(g.a, g.b)}$. Punktet $P$ har koordinatsættet $P(${g.px},${g.py})$.`,
      dele: [{ tekst: r`Bestem afstanden mellem punktet $P$ og linjen $l$.`,
        hints: [r`Find formlen for afstanden fra et punkt til en linje i formelsamlingen.`, r`For $y=ax+b$ og punktet $(x_1,y_1)$ er afstanden $\frac{|a x_1+b-y_1|}{\sqrt{a^2+1}}$. Her er $a=${num(g.a)}$ og $b=${num(g.b)}$.`],
        loesning: r`$$\text{dist}(P,l)=\frac{|${gange(g.a, g.px)}${plus(g.b)}-${par(g.py)}|}{\sqrt{${par(g.a)}^2+1}}=\frac{${num(rund(n))}}{\sqrt{${num(rund(q))}}}\approx ${dec(d)}$$ <p><b>Svar:</b> Afstanden er ca. $${dec(d)}$.</p>` },
      { tekst: r`Linjen $m$ er parallel med linjen $l$ og går gennem punktet $P$. Bestem en ligning for linjen $m$.`,
        hints: [r`Parallelle linjer har samme hældningskoefficient.`, hintTo(g.a, g.px, g.py)],
        loesning: r`<p>$m$ har samme hældning som $l$, altså $${num(g.a)}$.</p> ${m.html}` }] };
  }, tjek: g => { const x = (g.px + g.a * (g.py - g.b)) / (1 + g.a * g.a); return Math.abs(Math.hypot(g.px - x, g.py - (g.a * x + g.b)) - g.d) < 1e-9 && Math.abs(g.a * g.px + g.bm - g.py) < 1e-6; } },

{ id: "vinkel-linje", delproeve: 2, forlaeg: "Vejl. sæt 1, opg. 11",
  dele: [{ bogstav: "a", point: 10, kategori: "haeldningsvinkel", kraever: ["haeldningsvinkel"], sv: 2 },
         { bogstav: "b", point: 10, kategori: "haeldningsvinkel", kraever: ["haeldningsvinkel", "linjens-ligning"], sv: 2 }],
  lav() {
    const a = pick([0.4, 0.6, 0.75, 0.8, 1.2, 1.6, 1.8, 2.5, 3.2]), b = ikkeNul(-5, 5), v = Math.atan(a) * 180 / Math.PI;
    const w = pick([20, 25, 30, 35, 40, 50, 55, 60, 65, 70]), px = ikkeNul(-4, 5), py = int(-3, 7), aw = rund(Math.tan(w * Math.PI / 180), 3);
    const m = toMetoder(aw, px, py, "m", 2);
    return { _t: { a, v, w, aw, px, py, bm: m.b }, intro: r`En linje $l$ er givet ved ligningen $l:\ ${lin(a, b)}$.`,
      dele: [{ tekst: r`Bestem ved beregning hældningsvinklen $v$ for linjen $l$.`,
        hints: [r`Hældningsvinklen $v$ og hældningskoefficienten $a$ hænger sammen ved $\tan(v)=a$.`, r`Løs $\tan(v)=${num(a)}$. Husk at dit værktøj skal regne i grader.`],
        loesning: r`$$\tan(v)=${num(a)} ${LR} v=\tan^{-1}(${num(a)})\approx ${dec(v, 1)}^\circ$$ <p><b>Svar:</b> Hældningsvinklen er ca. $${dec(v, 1)}^\circ$.</p>` },
      { tekst: r`En linje $m$ har hældningsvinklen $${w}^\circ$ og går gennem punktet $P(${px},${py})$. Bestem en ligning for linjen $m$.`,
        hints: [r`Find først hældningskoefficienten for $m$ ud fra hældningsvinklen.`, r`$a=\tan(${w}^\circ)\approx ${num(aw)}$. ` + hintTo(aw, px, py)],
        loesning: r`$$a=\tan(${w}^\circ)\approx ${num(aw)}$$ ${m.html}` }] };
  }, tjek: g => Math.abs(Math.tan(g.v * Math.PI / 180) - g.a) < 1e-9 && Math.abs(g.aw * g.px + g.bm - g.py) < 0.01 },

{ id: "vinkel-mellem", delproeve: 2, forlaeg: "Egen variant",
  dele: [{ bogstav: "a", point: 10, kategori: "haeldningsvinkel", kraever: ["haeldningsvinkel"], sv: 3 }],
  lav() {
    const g = gen(() => { const a1 = pick([3, 2, 1.5, 4, 0.5, -0.5, -2, 1]), a2 = pick([0.5, 0.25, 1, -1, -3, 2, 0.2]), b1 = ikkeNul(-3, 4), b2 = ikkeNul(-3, 4);
      const v1 = Math.atan(a1) * 180 / Math.PI, v2 = Math.atan(a2) * 180 / Math.PI; let w = Math.abs(v1 - v2); if (w > 90) w = 180 - w;
      return a1 !== a2 && b1 !== b2 && w > 8 && w < 88 && { a1, a2, b1, b2, v1, v2, w }; });
    const xs = (g.b2 - g.b1) / (g.a1 - g.a2);
    const forskel = Math.abs(g.v1 - g.v2) > 90 ? r`$$|v_l-v_m|\approx ${dec(Math.abs(g.v1 - g.v2), 2)}^\circ,\ \text{så den spidse vinkel er } 180^\circ-${dec(Math.abs(g.v1 - g.v2), 2)}^\circ\approx ${dec(g.w, 1)}^\circ$$` : r`$$|v_l-v_m|\approx ${dec(g.w, 1)}^\circ$$`;
    return { _t: g, intro: r`To linjer er givet ved ligningerne $l:\ ${lin(g.a1, g.b1)}$ og $m:\ ${lin(g.a2, g.b2)}$. Linjerne skærer hinanden. Se figuren.`,
      figur: { vindue: vindue([[xs - 3, g.a1 * xs + g.b1 - 3], [xs + 3, g.a1 * xs + g.b1 + 3]], 1), objekter: [{ t: "linje", a: g.a1, b: g.b1, navn: "l" }, { t: "linje", a: g.a2, b: g.b2, navn: "m" }] },
      dele: [{ tekst: r`Bestem den spidse vinkel mellem linjen $l$ og linjen $m$.`,
        hints: [r`Hver linje danner sin egen vinkel med $x$-aksen. Hvordan kan de to vinkler bruges til at finde vinklen mellem linjerne?`, r`Find hældningsvinklerne $v_l$ og $v_m$ med $\tan(v)=a$. Vinklen mellem linjerne er forskellen – er den over $90^\circ$, trækkes den fra $180^\circ$.`],
        loesning: r`$$v_l=\tan^{-1}(${num(g.a1)})\approx ${dec(g.v1, 2)}^\circ,\qquad v_m=\tan^{-1}(${num(g.a2)})\approx ${dec(g.v2, 2)}^\circ$$ ${forskel} <p><b>Svar:</b> Den spidse vinkel mellem linjerne er ca. $${dec(g.w, 1)}^\circ$.</p>` }] };
  }, tjek: g => g.w > 0 && g.w < 90 },

...["tangent-cirkel-ligning", "tangent-cirkel-roering"].map(id => ({
  id, delproeve: 2, forlaeg: id === "tangent-cirkel-ligning" ? "Eksamen 11. aug. 2026, opg. 12" : "Egen variant (som eksamen 11. aug. 2026, opg. 12)",
  dele: [{ bogstav: "a", point: 10, kategori: "punkt-linje", kraever: ["afstand-punkt-linje", "cirklens-ligning"], sv: 2 }].concat(id === "tangent-cirkel-roering" ?
    [{ bogstav: "b", point: 10, kategori: "linje-cirkel", kraever: ["skaering-linje-cirkel", "afstand-punkt-linje", "cirklens-ligning"], sv: 2, afh: ["a"] }] : []),
  lav() {
    const g = gen(() => { const a = pick([-3, -2, 2, 3, 0.5, -0.5, 1, -1]), b = int(-4, 8), cx = int(-2, 8), cy = int(-3, 8), t = a * cx + b - cy;
      return Math.abs(t) >= 3 && Math.abs(t) <= 16 && { a, b, cx, cy, t }; });
    const q = g.a * g.a + 1, rr = Math.abs(g.t) / Math.sqrt(q), r2 = g.t * g.t / q;
    const fx = (g.cx + g.a * (g.cy - g.b)) / q, fy = g.a * fx + g.b, r2tex = Number.isInteger(rund(r2, 6)) ? String(rund(r2, 6)) : dec(r2, 2);
    const dele = [{ tekst: r`Bestem afstanden mellem $C$ og $l$ ved brug af en formel. Bestem en ligning for cirklen.`,
      hints: [r`Når $l$ er tangent, er afstanden fra centrum til $l$ lig med cirklens radius.`, r`Brug afstandsformlen med $a=${num(g.a)}$, $b=${g.b}$ og $C(${g.cx},${g.cy})$. Husk at cirklens ligning skal bruge $r^2$.`],
      loesning: r`$$r=\text{dist}(C,l)=\frac{|${gange(g.a, g.cx)}${plus(g.b)}-${par(g.cy)}|}{\sqrt{${par(g.a)}^2+1}}=\frac{${Math.abs(rund(g.t))}}{\sqrt{${num(q)}}}\approx ${dec(rr)}$$ $$r^2=\frac{${num(rund(g.t * g.t))}}{${num(q)}}${Number.isInteger(rund(r2, 6)) ? "=" : APPROX}${r2tex}$$ <p><b>Svar:</b> Afstanden er ca. $${dec(rr)}$, og cirklen har ligningen $${cirkel(g.cx, g.cy, 0).replace(/=0$/, "")}=${r2tex}$.</p>` }];
    if (id === "tangent-cirkel-roering") dele.push({ tekst: r`Bestem koordinatsættet til røringspunktet mellem linjen $l$ og cirklen.`,
      hints: [r`Røringspunktet er det (eneste) fælles punkt for linjen og cirklen.`, r`Løs ligningssystemet bestående af linjens og cirklens ligning. Brug Løs i GeoGebra.`],
      loesning: r`<p>Ligningssystemet løses med CAS (Løs i GeoGebra):</p> $$${lin(g.a, g.b)},\qquad ${cirkel(g.cx, g.cy, 0).replace(/=0$/, "")}=${r2tex}$$ <p>Der er én løsning: $x\approx ${dec(fx)}$, $y\approx ${dec(fy)}$.</p> <p><b>Svar:</b> Røringspunktet er ca. $${pt(rund(fx, 2), rund(fy, 2))}$.</p>` });
    return { _t: { ...g, rr, fx, fy }, intro: r`En linje $l$ er givet ved ligningen $l:\ ${lin(g.a, g.b)}$. Linjen $l$ er tangent til en cirkel med centrum i punktet $C(${g.cx},${g.cy})$. Se figuren.`,
      figur: { vindue: vindue([[g.cx - rr, g.cy - rr], [g.cx + rr, g.cy + rr]], 1), objekter: [{ t: "linje", a: g.a, b: g.b, navn: "l" }, { t: "cirkel", cx: g.cx, cy: g.cy, r: rr }, { t: "punkt", x: g.cx, y: g.cy, navn: "C" }] },
      dele };
  }, tjek: g => Math.abs(Math.hypot(g.fx - g.cx, g.fy - g.cy) - g.rr) < 1e-9 && Math.abs(g.a * g.fx + g.b - g.fy) < 1e-9 })),

{ id: "cirkel-afstand-punkt", delproeve: 2, forlaeg: "Eksamen 26. maj 2026, opg. 10",
  dele: [{ bogstav: "a", point: 10, kategori: "cirklens-ligning", kraever: ["cirklens-ligning"], sv: 1, ikkeAlene: true },
         { bogstav: "b", point: 10, kategori: "cirklens-ligning", kraever: ["cirklens-ligning", "afstand-punkter"], sv: 2 }],
  lav() {
    const g = gen(() => { const cx = ikkeNul(-6, 12), cy = ikkeNul(-5, 15), rr = int(3, 7), [dx, dy] = medTegn(pick([[6, 8], [8, 6], [5, 12], [12, 5], [9, 12], [12, 9]])), L = Math.hypot(dx, dy);
      return L > rr + 2 && { cx, cy, rr, px: cx + dx, py: cy + dy, dx, dy, L }; });
    return { _t: g, intro: r`En cirkel har centrum i $C(${g.cx},${g.cy})$ og radius $${g.rr}$.`,
      figur: { vindue: vindue([[g.cx - g.rr, g.cy - g.rr], [g.cx + g.rr, g.cy + g.rr], [g.px, g.py]], 1), objekter: [{ t: "cirkel", cx: g.cx, cy: g.cy, r: g.rr }, { t: "punkt", x: g.cx, y: g.cy, navn: "C" }, { t: "punkt", x: g.px, y: g.py, navn: "P" }] },
      dele: [{ tekst: r`Bestem en ligning for cirklen.`, hints: [r`Brug $(x-a)^2+(y-b)^2=r^2$.`, r`$a=${g.cx}$, $b=${g.cy}$ og $r^2=${g.rr * g.rr}$.`],
        loesning: r`<p><b>Svar:</b> $${cirkel(g.cx, g.cy, g.rr * g.rr)}$.</p>` },
      { tekst: r`Punktet $P$ har koordinatsættet $P(${g.px},${g.py})$. Bestem ved beregning afstanden $d$ fra punktet $P$ til cirklen. Se figuren.`,
        hints: [r`Den korteste vej fra $P$ til cirklen går langs linjen gennem centrum.`, r`Find $|PC|$ og træk radius fra.`],
        loesning: r`$$|PC|=\sqrt{(${g.cx}-${par(g.px)})^2+(${g.cy}-${par(g.py)})^2}=\sqrt{${g.dx * g.dx}+${g.dy * g.dy}}=${g.L}$$ $$d=|PC|-r=${g.L}-${g.rr}=${g.L - g.rr}$$ <p><b>Svar:</b> Afstanden fra $P$ til cirklen er $${g.L - g.rr}$.</p>` }] };
  }, tjek: g => Number.isInteger(g.L) && g.L > g.rr },

{ id: "linje-cirkel-korde", delproeve: 2, forlaeg: "Enkeltopg. 3.D2.3a",
  dele: [{ bogstav: "a", point: 10, kategori: "linje-cirkel", kraever: ["skaering-linje-cirkel", "cirklens-ligning"], sv: 2 },
         { bogstav: "b", point: 10, kategori: "afstand", kraever: ["afstand-punkter", "skaering-linje-cirkel", "cirklens-ligning"], sv: 2, afh: ["a"] }],
  lav() {
    const g = gen(() => { const cx = int(-3, 5), cy = int(-3, 5), u = pick(L5), v = pick(L5); if (u[0] === v[0]) return null;
      const p1 = [cx + u[0], cy + u[1]], p2 = [cx + v[0], cy + v[1]], s = new Q(p2[1] - p1[1], p2[0] - p1[0]), t = Q.of(p1[1]).sub(s.mul(p1[0]));
      return s.d <= 4 && t.d <= 4 && s.v !== 0 && { cx, cy, p1, p2, s, t }; });
    const [A, B] = g.p1[0] < g.p2[0] ? [g.p1, g.p2] : [g.p2, g.p1], k2 = (B[0] - A[0]) ** 2 + (B[1] - A[1]) ** 2;
    return { _t: { cx: g.cx, cy: g.cy, A, B, s: g.s.v, t: g.t.v }, intro: r`En cirkel er givet ved ligningen $${cirkel(g.cx, g.cy, 25)}$, og en linje er givet ved ligningen $l:\ ${lin(g.s, g.t)}$.`,
      figur: { vindue: vindue([[g.cx - 5, g.cy - 5], [g.cx + 5, g.cy + 5]], 1), objekter: [{ t: "cirkel", cx: g.cx, cy: g.cy, r: 5 }, { t: "linje", a: g.s.v, b: g.t.v, navn: "l" }] },
      dele: [{ tekst: r`Bestem koordinatsættene til skæringspunkterne mellem cirklen og linjen $l$.`,
        hints: [r`Skæringspunkterne opfylder både cirklens og linjens ligning.`, r`Løs ligningssystemet med Løs i GeoGebra – eller indsæt $y=${rhs(g.s, g.t)}$ i cirklens ligning og løs for $x$.`],
        loesning: r`<p>Med CAS (Løs i GeoGebra) løses</p> $$${cirkel(g.cx, g.cy, 25)},\qquad ${lin(g.s, g.t)}$$ <p>Løsningerne er $(x,y)=(${A[0]},${A[1]})$ og $(x,y)=(${B[0]},${B[1]})$.</p> <p><b>Svar:</b> Skæringspunkterne er $(${A[0]},${A[1]})$ og $(${B[0]},${B[1]})$.</p>` },
      { tekst: r`Bestem afstanden mellem de to skæringspunkter.`,
        hints: [r`Brug afstandsformlen på de to punkter fra a).`, r`Indsæt $(${A[0]},${A[1]})$ og $(${B[0]},${B[1]})$ i $\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}$.`],
        loesning: r`$$\sqrt{(${B[0]}-${par(A[0])})^2+(${B[1]}-${par(A[1])})^2}=\sqrt{${k2}}${afstTex(k2).startsWith("\\") ? APPROX + dec(Math.sqrt(k2)) : ""}$$ <p><b>Svar:</b> Afstanden er ${afstTex(k2).startsWith("\\") ? "ca. $" + dec(Math.sqrt(k2)) + "$" : "$" + afstTex(k2) + "$"}.</p>` }] };
  }, tjek: g => [g.A, g.B].every(p => (p[0] - g.cx) ** 2 + (p[1] - g.cy) ** 2 === 25 && Math.abs(g.s * p[0] + g.t - p[1]) < 1e-9) },

{ id: "tangent-b-origo", delproeve: 2, forlaeg: "Enkeltopg. 3.D2.8b",
  dele: [{ bogstav: "a", point: 10, kategori: "tangent-cirkel", kraever: ["tangent-cirkel", "afstand-punkt-linje", "cirklens-ligning"], sv: 3 }],
  lav() {
    const k = pick([1, 2, 3, -1, -2]), m = pick([1, 2, 3]), q = k * k + 1, R2 = q * m * m, b0 = q * m;
    return { _t: { k, R2, b0 }, intro: r`En cirkel er givet ved ligningen $x^2+y^2=${R2}$. En linje $l$ er givet ved ligningen $l:\ y=${ax(k)}+b$, hvor $b$ er et tal.`,
      figur: { vindue: vindue([[-Math.sqrt(R2) - 1, -Math.sqrt(R2) - 1], [Math.sqrt(R2) + 1, Math.sqrt(R2) + 1]], 1), objekter: [{ t: "cirkel", cx: 0, cy: 0, r: Math.sqrt(R2) }, { t: "linje", a: k, b: b0 }, { t: "linje", a: k, b: -b0 }] },
      dele: [{ tekst: r`Bestem de værdier af $b$, for hvilke linjen $l$ er tangent til cirklen.`,
        hints: [r`Linjen er tangent, når afstanden fra centrum til linjen er lig med radius. Find centrum og radius.`, r`Centrum er $(0,0)$ og $r=\sqrt{${R2}}$. Opstil $\frac{|${gange(k, 0)}+b-0|}{\sqrt{${par(k)}^2+1}}=\sqrt{${R2}}$ og løs for $b$ med Løs i GeoGebra.`],
        loesning: r`<p>Centrum er $(0,0)$ og radius $\sqrt{${R2}}$. Linjen er tangent, når</p> $$\frac{|b|}{\sqrt{${q}}}=\sqrt{${R2}} ${LR} |b|=\sqrt{${R2 * q}}=${b0}$$ <p><b>Svar:</b> $l$ er tangent til cirklen for $b=-${b0}$ og $b=${b0}$.</p>` }] };
  }, tjek: g => Math.abs(g.b0 / Math.sqrt(g.k * g.k + 1) - Math.sqrt(g.R2)) < 1e-9 },

{ id: "cirkel-tangent-akse", delproeve: 2, forlaeg: "Eksamen 28. maj 2026, opg. 11 (udvidet)",
  dele: [{ bogstav: "a", point: 10, kategori: "cirklens-ligning", kraever: ["cirklens-ligning"], sv: 1 },
         { bogstav: "b", point: 10, kategori: "tangent-cirkel", kraever: ["tangent-cirkel", "cirklens-ligning", "ortogonale-linjer", "linjens-ligning"], sv: 3 },
         { bogstav: "c", point: 10, kategori: "tangent-cirkel", kraever: ["tangent-cirkel", "cirklens-ligning", "ortogonale-linjer", "linjens-ligning", "afstand-punkter"], sv: 2, afh: ["b"] }],
  lav() {
    const g = gen(() => { const [dx, dy] = medTegn(pick(SMAA)), a = int(-3, 4), b = int(-2, 5), px = a + dx, py = b + dy, at = new Q(-dx, dy), bt = Q.of(py).sub(at.mul(px));
      if (bt.v === 0) return null; const qx = bt.neg().div(at); return py !== 0 && Math.abs(qx.v) <= 20 && { a, b, dx, dy, px, py, at, bt, qx }; });
    const r2 = g.dx * g.dx + g.dy * g.dy, m = toMetoder(g.at, g.px, g.py, "t"), pq = Math.hypot(g.qx.v - g.px, g.py);
    return { _t: { ...g, at: g.at.v, bt: g.bt.v, qx: g.qx.v, r2, pq }, intro: r`En cirkel er givet ved ligningen $${cirkel(g.a, g.b, r2)}$. Punktet $P$ har koordinatsættet $P(${g.px},${g.py})$.`,
      figur: { vindue: vindue([[g.a - 4, g.b - 4], [g.a + 4, g.b + 4], [g.qx.v, 0]], 1), objekter: [{ t: "cirkel", cx: g.a, cy: g.b, r: Math.sqrt(r2) }, { t: "punkt", x: g.a, y: g.b, navn: "C" }, { t: "punkt", x: g.px, y: g.py, navn: "P" }, { t: "linje", a: g.at.v, b: g.bt.v, navn: "t" }] },
      dele: [{ tekst: r`Undersøg ved beregning, om punktet $P$ ligger på cirklen.`, hints: [r`Indsæt punktets koordinater i cirklens ligning.`, r`Udregn $(${g.px}-${par(g.a)})^2+(${g.py}-${par(g.b)})^2$ og sammenlign med $${r2}$.`],
        loesning: r`$$(${g.px}-${par(g.a)})^2+(${g.py}-${par(g.b)})^2=${g.dx * g.dx}+${g.dy * g.dy}=${r2}$$ <p><b>Svar:</b> Koordinaterne passer i ligningen, så $P$ ligger på cirklen.</p>` },
      { tekst: r`Bestem en ligning for tangenten $t$ til cirklen i punktet $P$.`,
        hints: [r`Tangenten står vinkelret på radius fra centrum $C(${g.a},${g.b})$ til $P$.`, r`$a_{CP}=\frac{${g.dy}}{${g.dx}}$. Tangentens hældning opfylder $a_{CP}\cdot a_t=-1$.`],
        loesning: r`$$a_{CP}=\frac{${g.py}-${par(g.b)}}{${g.px}-${par(g.a)}}=${new Q(g.dy, g.dx).tex()}\quad\Rightarrow\quad a_t=${g.at.tex()}$$ ${m.html}` },
      { tekst: r`Tangenten $t$ skærer $x$-aksen i punktet $Q$. Bestem afstanden $|PQ|$.`,
        hints: [r`På $x$-aksen er $y=0$. Find $Q$ ved at løse $t$'s ligning med $y=0$.`, r`Når du har $Q$, bruger du afstandsformlen mellem $P$ og $Q$.`],
        loesning: r`$$0=${rhs(g.at, g.bt)} ${LR} x=${g.qx.tex()}${g.qx.d === 1 ? "" : APPROX + dec(g.qx.v)},\qquad Q=${pt(g.qx.d === 1 ? g.qx.v : rund(g.qx.v, 2), 0)}$$ $$|PQ|=\sqrt{(${num(g.qx.d === 1 ? g.qx.v : rund(g.qx.v, 2))}-${par(g.px)})^2+(0-${par(g.py)})^2}\approx ${dec(pq)}$$ <p><b>Svar:</b> $|PQ|\approx ${dec(pq)}$.</p>` }] };
  }, tjek: g => (g.px - g.a) ** 2 + (g.py - g.b) ** 2 === g.r2 && Math.abs(g.at * g.qx + g.bt) < 1e-9 && Math.abs(g.at * g.px + g.bt - g.py) < 1e-9 },

{ id: "areal-punktlinje", delproeve: 2, forlaeg: "Egen variant",
  dele: [{ bogstav: "a", point: 10, kategori: "punkt-linje", kraever: ["afstand-punkt-linje", "linjens-ligning", "afstand-punkter"], sv: 3 }],
  lav() {
    const g = gen(() => { const ax_ = int(-3, 2), ay = int(-3, 2), dx = int(3, 8), dy = ikkeNul(-4, 5), bx = ax_ + dx, by = ay + dy, cx = int(-2, 8), cy = int(-2, 9);
      const s = new Q(dy, dx), t = Q.of(ay).sub(s.mul(ax_)), cr = Math.abs(dx * (cy - ay) - dy * (cx - ax_));
      return s.d <= 4 && t.d <= 4 && cr >= 6 && { ax: ax_, ay, bx, by, cx, cy, s, t, cr }; });
    const h = Math.abs(g.s.v * g.cx + g.t.v - g.cy) / Math.sqrt(g.s.v ** 2 + 1), L = Math.hypot(g.bx - g.ax, g.by - g.ay), T = new Q(g.cr, 2);
    return { _t: { ...g, s: g.s.v, t: g.t.v, h, L, T: T.v }, intro: r`En trekant $ABC$ har vinkelspidserne $A(${g.ax},${g.ay})$, $B(${g.bx},${g.by})$ og $C(${g.cx},${g.cy})$. Se figuren.`,
      figur: { vindue: vindue([[g.ax, g.ay], [g.bx, g.by], [g.cx, g.cy]], 1), objekter: [{ t: "stykke", x1: g.ax, y1: g.ay, x2: g.bx, y2: g.by }, { t: "stykke", x1: g.bx, y1: g.by, x2: g.cx, y2: g.cy }, { t: "stykke", x1: g.cx, y1: g.cy, x2: g.ax, y2: g.ay },
        { t: "punkt", x: g.ax, y: g.ay, navn: "A" }, { t: "punkt", x: g.bx, y: g.by, navn: "B" }, { t: "punkt", x: g.cx, y: g.cy, navn: "C" }] },
      dele: [{ tekst: r`Bestem arealet af trekant $ABC$ ved at bruge afstanden fra punktet $C$ til linjen gennem $A$ og $B$.`,
        hints: [r`Afstanden fra $C$ til linjen $AB$ er trekantens højde, når $AB$ er grundlinje.`, r`Linjen gennem $A$ og $B$ har ligningen $${lin(g.s, g.t)}$. Find højden med afstandsformlen for punkt og linje, og grundlinjen $|AB|$ med afstandsformlen.`],
        loesning: r`<p>Linjen gennem $A$ og $B$: $a=${g.s.tex()}$ og $b=${g.t.tex()}$, så $${lin(g.s, g.t)}$.</p> $$h=\frac{|${gange(g.s, g.cx)}${plus(g.t)}-${par(g.cy)}|}{\sqrt{${par(g.s)}^2+1}}\approx ${dec(h, 3)},\qquad |AB|=\sqrt{${(g.bx - g.ax) ** 2}+${(g.by - g.ay) ** 2}}\approx ${dec(L, 3)}$$ $$T=\tfrac{1}{2}\cdot h\cdot|AB|\approx ${num(rund(T.v, 2))}$$ <p><b>Svar:</b> Arealet er $${num(rund(T.v, 2))}$.</p>` }] };
  }, tjek: g => Math.abs(0.5 * g.h * g.L - g.T) < 1e-9 },

{ id: "cirkel-d2-paa", delproeve: 2, forlaeg: "Eksamen 28. maj 2026, opg. 11",
  dele: [{ bogstav: "a", point: 10, kategori: "cirklens-ligning", kraever: ["cirklens-ligning"], sv: 1 },
         { bogstav: "b", point: 10, kategori: "cirklens-ligning", kraever: ["cirklens-ligning"], sv: 1 }],
  lav() {
    const cx = ikkeNul(-6, 9), cy = ikkeNul(-6, 9), paa = Math.random() < 0.5;
    const [dx, dy, rr] = paa ? pick([[3, 4, 5], [4, 3, 5], [6, 8, 10], [8, 6, 10], [5, 12, 13], [12, 5, 13]]) : (() => { const r_ = int(5, 9); let x, y; do { x = int(1, r_ + 2); y = int(1, r_ + 2); } while (x * x + y * y === r_ * r_ || Math.abs(x * x + y * y - r_ * r_) > 20); return [x, y, r_]; })();
    const sx = tegn(), sy = tegn(), px = cx + sx * dx, py = cy + sy * dy, l = dx * dx + dy * dy;
    return { _t: { paa: l === rr * rr, cx, cy, px, py, rr, ok: paa }, intro: r`En cirkel har centrum i punktet $(${cx},${cy})$ og radius $${rr}$.`,
      dele: [{ tekst: r`Bestem en ligning for cirklen.`, hints: [r`Brug $(x-a)^2+(y-b)^2=r^2$.`, r`Pas på fortegnene, og husk $r^2=${rr * rr}$.`], loesning: r`<p><b>Svar:</b> $${cirkel(cx, cy, rr * rr)}$.</p>` },
      { tekst: r`Undersøg ved beregning, om punktet $P(${px},${py})$ ligger på cirklen.`,
        hints: [r`Indsæt $P$ i cirklens ligning.`, r`Udregn $(${px}-${par(cx)})^2+(${py}-${par(cy)})^2$ og sammenlign med $${rr * rr}$.`],
        loesning: r`$$(${px}-${par(cx)})^2+(${py}-${par(cy)})^2=${dx * dx}+${dy * dy}=${l}${l === rr * rr ? "" : NEQ + rr * rr}$$ <p><b>Svar:</b> $P$ ${l === rr * rr ? "ligger på cirklen" : "ligger ikke på cirklen (den ligger " + (l > rr * rr ? "uden for" : "inden for") + ", da $" + l + (l > rr * rr ? ">" : "<") + rr * rr + "$)"}.</p>` }] };
  }, tjek: g => g.paa === g.ok },

{ id: "vinkel-tangentcirkel", delproeve: 2, forlaeg: "Enkeltopg. 3.D2.4",
  dele: [{ bogstav: "a", point: 10, kategori: "haeldningsvinkel", kraever: ["haeldningsvinkel"], sv: 2 },
         { bogstav: "b", point: 10, kategori: "punkt-linje", kraever: ["afstand-punkt-linje", "cirklens-ligning"], sv: 2 }],
  lav() {
    const g = gen(() => { const a = pick([-0.5, -0.25, -2, -1.5, 0.5, 2, -0.75]), b = int(1, 6), cx = int(2, 9), cy = int(2, 9), t = a * cx + b - cy;
      return Math.abs(t) >= 2.5 && Math.abs(t) <= 12 && { a, b, cx, cy, t }; });
    const v = Math.atan(g.a) * 180 / Math.PI, q = g.a * g.a + 1, rr = Math.abs(g.t) / Math.sqrt(q), r2 = g.t * g.t / q;
    return { _t: { ...g, v, rr }, intro: r`Linjen $l$ har ligningen $l:\ ${lin(g.a, g.b)}$.`,
      figur: { vindue: vindue([[g.cx - rr, g.cy - rr], [g.cx + rr, g.cy + rr]], 1), objekter: [{ t: "linje", a: g.a, b: g.b, navn: "l" }, { t: "cirkel", cx: g.cx, cy: g.cy, r: rr }, { t: "punkt", x: g.cx, y: g.cy, navn: "C" }] },
      dele: [{ tekst: r`Bestem ved beregning hældningsvinklen for linjen.`,
        hints: [r`Hældningsvinklen $v$ opfylder $\tan(v)=a$.`, r`Løs $\tan(v)=${num(g.a)}$.${g.a < 0 ? " Linjen hælder nedad, så vinklen bliver negativ." : ""}`],
        loesning: r`$$\tan(v)=${num(g.a)} ${LR} v=\tan^{-1}(${num(g.a)})\approx ${dec(v, 1)}^\circ$$ <p><b>Svar:</b> Hældningsvinklen er ca. $${dec(v, 1)}^\circ$${g.a < 0 ? " (linjen hælder $" + dec(-v, 1) + "^\\circ$ nedad i forhold til $x$-aksen)" : ""}.</p>` },
      { tekst: r`En cirkel har centrum i punktet $C(${g.cx},${g.cy})$ og har linjen $l$ som tangent. Bestem en ligning for cirklen.`,
        hints: [r`Radius er afstanden fra $C$ til $l$.`, r`Brug afstandsformlen med $a=${num(g.a)}$, $b=${g.b}$ og $C(${g.cx},${g.cy})$.`],
        loesning: r`$$r=\frac{|${gange(g.a, g.cx)}${plus(g.b)}-${par(g.cy)}|}{\sqrt{${par(g.a)}^2+1}}=\frac{${num(rund(Math.abs(g.t)))}}{\sqrt{${num(q)}}}\approx ${dec(rr)},\qquad r^2=\frac{${num(rund(g.t * g.t))}}{${num(q)}}${Number.isInteger(rund(r2, 6)) ? "=" + rund(r2, 6) : APPROX + dec(r2)}$$ <p><b>Svar:</b> $${kvad("x", g.cx)}+${kvad("y", g.cy)}=${Number.isInteger(rund(r2, 6)) ? rund(r2, 6) : dec(r2)}$.</p>` }] };
  }, tjek: g => Math.abs(Math.tan(g.v * Math.PI / 180) - g.a) < 1e-9 },

{ id: "vinkel-punktlinje", delproeve: 2, forlaeg: "Enkeltopg. 3.D2.1",
  dele: [{ bogstav: "a", point: 10, kategori: "haeldningsvinkel", kraever: ["haeldningsvinkel"], sv: 2 },
         { bogstav: "b", point: 10, kategori: "punkt-linje", kraever: ["afstand-punkt-linje"], sv: 2 }],
  lav() {
    const g = gen(() => { const a = pick([0.4, 0.7, 0.9, 1.3, 1.6, 2.2, 0.3]), b = rund(int(-30, 30) / 10, 1), px = int(-5, 6), py = int(-5, 6), t = a * px + b - py;
      return Math.abs(t) >= 1.5 && { a, b, px, py, t }; });
    const v = Math.atan(g.a) * 180 / Math.PI, q = g.a * g.a + 1, d = Math.abs(g.t) / Math.sqrt(q);
    return { _t: { ...g, v, d }, intro: r`En linje $l$ er givet ved ligningen $${lin(g.a, g.b)}$.`,
      dele: [{ tekst: r`Bestem ved beregning hældningsvinklen for linjen $l$.`, hints: [r`$\tan(v)=a$.`, r`Løs $\tan(v)=${num(g.a)}$ i grader.`],
        loesning: r`$$v=\tan^{-1}(${num(g.a)})\approx ${dec(v, 1)}^\circ$$ <p><b>Svar:</b> Ca. $${dec(v, 1)}^\circ$.</p>` },
      { tekst: r`Bestem afstanden fra punktet $P(${g.px},${g.py})$ til linjen $l$.`,
        hints: [r`Brug formlen for afstanden fra et punkt til en linje.`, r`$a=${num(g.a)}$, $b=${num(g.b)}$, $x_1=${g.px}$ og $y_1=${g.py}$.`],
        loesning: r`$$\text{dist}(P,l)=\frac{|${gange(g.a, g.px)}${plus(g.b)}-${par(g.py)}|}{\sqrt{${num(g.a)}^2+1}}=\frac{${num(rund(Math.abs(g.t)))}}{\sqrt{${num(rund(q))}}}\approx ${dec(d)}$$ <p><b>Svar:</b> Ca. $${dec(d)}$.</p>` }] };
  }, tjek: g => { const x = (g.px + g.a * (g.py - g.b)) / (1 + g.a * g.a); return Math.abs(Math.hypot(g.px - x, g.py - (g.a * x + g.b)) - g.d) < 1e-9; } },

...["xakse-afstand", "px0-afstand"].map(id => ({
  id, delproeve: 2, forlaeg: id === "xakse-afstand" ? "Enkeltopg. 3.D2.2" : "Enkeltopg. 3.D2.7",
  dele: [{ bogstav: "a", point: 10, kategori: "punkt-linje", kraever: ["afstand-punkt-linje"], sv: 3 }],
  lav() {
    const a = pick([1, 2, 3, -1, -2, 0.5]), b = ikkeNul(-8, 8), q = a * a + 1;
    let dtex, D, xs;
    if (id === "px0-afstand" && Number.isInteger(a)) { const mm = pick([1, 2]); D = mm * Math.sqrt(q); dtex = mm === 1 ? r`\sqrt{${q}}` : r`${mm}\sqrt{${q}}`;
      xs = [new Q(-b - mm * q, a), new Q(-b + mm * q, a)].sort((u, v) => u.v - v.v); }
    else { D = int(2, 7); dtex = String(D); xs = [(-b - D * Math.sqrt(q)) / a, (-b + D * Math.sqrt(q)) / a].sort((u, v) => u - v); }
    const vis = x => (x instanceof Q ? "=" + x.tex() + (x.d === 1 ? "" : APPROX + dec(x.v)) : APPROX + dec(x));
    const x1 = xs[0], x2 = xs[1];
    const tekst = id === "xakse-afstand" ? r`Bestem koordinatsættene til hvert af de to punkter på $x$-aksen, hvor afstanden til linjen $l$ er $${dtex}$.` : r`Bestem de to værdier af $x$, hvor afstanden mellem linjen $l$ og punktet $P$ er lig $${dtex}$.`;
    const svar = id === "xakse-afstand"
      ? r`$${pt(x1 instanceof Q ? x1 : rund(x1, 2), 0)}$ og $${pt(x2 instanceof Q ? x2 : rund(x2, 2), 0)}$`
      : r`$x${vis(x1)}$ og $x${vis(x2)}$`;
    return { _t: { a, b, D, x1: val(x1), x2: val(x2) }, intro: id === "xakse-afstand" ? r`Linjen $l$ er givet ved ligningen $${lin(a, b)}$.` : r`En linje $l$ er givet ved ligningen $${lin(a, b)}$. Punktet $P(x,0)$ ligger på $x$-aksen.`,
      dele: [{ tekst,
        hints: [r`Et punkt på $x$-aksen har koordinatsættet $(x,0)$. Opstil afstandsformlen med dette punkt.`, r`Løs $\frac{|${ax(a)}${plus(b)}-0|}{\sqrt{${par(a)}^2+1}}=${dtex}$ med Løs i GeoGebra.`],
        loesning: r`<p>Et punkt på $x$-aksen er $(x,0)$:</p> $$\frac{|${ax(a)}${plus(b)}|}{\sqrt{${num(q)}}}=${dtex}$$ <p>Løs i GeoGebra giver $x${vis(x1)}$ eller $x${vis(x2)}$.</p> <p><b>Svar:</b> ${svar}.</p>` }] };
  }, tjek: g => [g.x1, g.x2].every(x => Math.abs(Math.abs(g.a * x + g.b) / Math.sqrt(g.a * g.a + 1) - g.D) < 1e-9) })),

{ id: "cirkel-linje-paralleltangenter", delproeve: 2, forlaeg: "Enkeltopg. 3.D2.3",
  dele: [{ bogstav: "a", point: 10, kategori: "linje-cirkel", kraever: ["skaering-linje-cirkel", "cirklens-ligning"], sv: 2 },
         { bogstav: "b", point: 10, kategori: "tangent-cirkel", kraever: ["tangent-cirkel", "afstand-punkt-linje", "parallelle-linjer", "cirklens-ligning"], sv: 3 }],
  lav() {
    const g = gen(() => { const cx = int(-3, 4), cy = int(-3, 4), u = pick(L5), v = pick(L5); if (u[0] === v[0] || (u[0] === -v[0] && u[1] === -v[1])) return null;
      const p1 = [cx + u[0], cy + u[1]], p2 = [cx + v[0], cy + v[1]], s = new Q(p2[1] - p1[1], p2[0] - p1[0]), t = Q.of(p1[1]).sub(s.mul(p1[0]));
      return s.d <= 4 && t.d <= 4 && s.v !== 0 && { cx, cy, p1, p2, s, t }; });
    const [A, B] = g.p1[0] < g.p2[0] ? [g.p1, g.p2] : [g.p2, g.p1], sv = g.s.v, k = 5 * Math.sqrt(sv * sv + 1), c0 = g.cy - sv * g.cx, bH = c0 + k, bL = c0 - k;
    return { _t: { cx: g.cx, cy: g.cy, A, B, s: sv, t: g.t.v, bH, bL }, intro: r`På figuren ses en cirkel givet ved ligningen $${cirkel(g.cx, g.cy, 25)}$ og en linje $l$ givet ved ligningen $${lin(g.s, g.t)}$.`,
      figur: { vindue: vindue([[g.cx - 6, g.cy - 6], [g.cx + 6, g.cy + 6]], 1), objekter: [{ t: "cirkel", cx: g.cx, cy: g.cy, r: 5 }, { t: "linje", a: sv, b: g.t.v, navn: "l" }] },
      dele: [{ tekst: r`Bestem koordinatsættet til hvert af skæringspunkterne mellem cirklen og linjen $l$.`,
        hints: [r`Skæringspunkterne opfylder begge ligninger.`, r`Løs ligningssystemet med Løs i GeoGebra.`],
        loesning: r`<p>Løs i GeoGebra på systemet $${cirkel(g.cx, g.cy, 25)}$, $${lin(g.s, g.t)}$ giver</p> $$(x,y)=(${A[0]},${A[1]})\quad\text{og}\quad(x,y)=(${B[0]},${B[1]})$$ <p><b>Svar:</b> $(${A[0]},${A[1]})$ og $(${B[0]},${B[1]})$.</p>` },
      { tekst: r`Bestem en ligning for hver af de to tangenter til cirklen, som er parallelle med $l$.`,
        hints: [r`En tangent parallel med $l$ har ligningen $y=${ax(g.s)}+b$. Den er tangent, når afstanden fra centrum til linjen er lig radius.`, r`Løs $\frac{|${gange(g.s, g.cx)}+b-${par(g.cy)}|}{\sqrt{${par(g.s)}^2+1}}=5$ for $b$ med Løs i GeoGebra.`],
        loesning: r`<p>Centrum $(${g.cx},${g.cy})$, radius $5$. Tangenterne har formen $y=${ax(g.s)}+b$:</p> $$\frac{|${gange(g.s, g.cx)}+b-${par(g.cy)}|}{\sqrt{${par(g.s)}^2+1}}=5$$ <p>Løs i GeoGebra giver $b\approx ${dec(bH)}$ eller $b\approx ${dec(bL)}$.</p> <p><b>Svar:</b> $y=${ax(g.s)}${plus(rund(bH, 2))}$ og $y=${ax(g.s)}${plus(rund(bL, 2))}$.</p>` }] };
  }, tjek: g => [g.bH, g.bL].every(b => Math.abs(Math.abs(g.s * g.cx + b - g.cy) / Math.sqrt(g.s * g.s + 1) - 5) < 1e-9) && [g.A, g.B].every(p => (p[0] - g.cx) ** 2 + (p[1] - g.cy) ** 2 === 25) },

{ id: "diameter-tangent", delproeve: 2, forlaeg: "Enkeltopg. 3.D2.5",
  dele: [{ bogstav: "a", point: 10, kategori: "tangent-cirkel", kraever: ["tangent-cirkel", "ortogonale-linjer", "linjens-ligning"], sv: 3 },
         { bogstav: "b", point: 10, kategori: "cirklens-ligning", kraever: ["cirklens-ligning", "midtpunkt", "afstand-punkter", "tangent-cirkel", "ortogonale-linjer"], sv: 2, afh: ["a"] }],
  lav() {
    const g = gen(() => { const s = pick([new Q(-1, 3), new Q(-1, 2), new Q(1, 2), new Q(1, 3), new Q(-2), new Q(2), new Q(-1, 4)]), n = new Q(-1).div(s);
      const px = n.d * ikkeNul(Math.ceil(-6 / n.d), Math.floor(8 / n.d)), py = int(-2, 8), qy = Q.of(py).sub(n.mul(px)), bl = Q.of(py).sub(s.mul(px));
      return qy.d === 1 && bl.d <= 3 && Math.abs(qy.v) <= 14 && qy.v !== py && { s, n, px, py, qy: qy.v, bl }; });
    const mx = g.px / 2, my = (g.py + g.qy) / 2, r2 = (g.px * g.px + (g.py - g.qy) ** 2) / 4;
    return { _t: { s: g.s.v, n: g.n.v, px: g.px, py: g.py, qy: g.qy, bl: g.bl.v },
      intro: r`På figuren vises en cirkel og en linje $l$ med ligningen $${lin(g.s, g.bl)}$. Linjen $l$ er tangent til cirklen i punktet $P(${g.px},${g.py})$. Punktet $Q$ ligger på $y$-aksen, og linjestykket $PQ$ er diameter i cirklen.`,
      figur: { vindue: vindue([[mx - Math.sqrt(r2), my - Math.sqrt(r2)], [mx + Math.sqrt(r2), my + Math.sqrt(r2)]], 1), objekter: [{ t: "cirkel", cx: mx, cy: my, r: Math.sqrt(r2) }, { t: "linje", a: g.s.v, b: g.bl.v, navn: "l" }, { t: "punkt", x: g.px, y: g.py, navn: "P" }] },
      dele: [{ tekst: r`Bestem koordinatsættet til punktet $Q$.`,
        hints: [r`Diameteren $PQ$ går gennem centrum og står derfor vinkelret på tangenten i $P$.`, r`Linjen gennem $P$ og $Q$ har hældningen $${g.n.tex()}$ (da $${par(g.s)}\cdot${par(g.n)}=-1$). Find dens ligning og sæt $x=0$.`],
        loesning: r`<p>$PQ$ står vinkelret på $l$, så $a_{PQ}=${g.n.tex()}$.</p> $$${g.py}=${gange(g.n, g.px)}+b ${LR} b=${g.qy},\qquad PQ:\ ${lin(g.n, g.qy)}$$ <p>$Q$ ligger på $y$-aksen, så $x=0$ og $y=${g.qy}$.</p> <p><b>Svar:</b> $Q(0,${g.qy})$.</p>` },
      { tekst: r`Bestem en ligning for cirklen.`,
        hints: [r`Centrum er midtpunktet af diameteren $PQ$.`, r`Radius er halvdelen af $|PQ|$, eller afstanden fra centrum til $P$.`],
        loesning: r`$$C\left(\tfrac{${g.px}+0}{2},\tfrac{${g.py}+${par(g.qy)}}{2}\right)=C${pt(mx, my)},\qquad r^2=\left(\tfrac{1}{2}|PQ|\right)^2=\tfrac{${g.px * g.px}+${(g.py - g.qy) ** 2}}{4}=${num(r2)}$$ <p><b>Svar:</b> $${kvad("x", mx)}+${kvad("y", my)}=${num(r2)}$.</p>` }] };
  }, tjek: g => Math.abs(g.s * g.n + 1) < 1e-9 && Math.abs(g.n * g.px + g.qy - g.py) < 1e-9 && Math.abs(g.s * g.px + g.bl - g.py) < 1e-9 },

{ id: "lodret-ligeafstand", delproeve: 2, forlaeg: "Enkeltopg. 3.D2.6",
  dele: [{ bogstav: "a", point: 10, kategori: "afstand", kraever: ["afstand-punkter"], sv: 3 }],
  lav() {
    const g = gen(() => { const ax_ = int(-2, 3), ay = int(2, 8), bx = int(4, 9), by = int(-2, 5), k = int(1, 5);
      if (by === ay || k === ax_ || k === bx) return null; const y = new Q((k - bx) ** 2 + by * by - (k - ax_) ** 2 - ay * ay, 2 * (by - ay));
      return y.d <= 4 && Math.abs(y.v) <= 12 && { ax: ax_, ay, bx, by, k, y }; });
    return { _t: { ...g, y: g.y.v }, intro: r`I et koordinatsystem er givet to punkter $A(${g.ax},${g.ay})$ og $B(${g.bx},${g.by})$ samt en lodret linje $l$ med ligningen $x=${g.k}$. Et punkt $P(${g.k},y)$ ligger på linjen $l$.`,
      figur: { vindue: vindue([[g.ax, g.ay], [g.bx, g.by], [g.k, g.y.v]], 2), objekter: [{ t: "lodret", x: g.k, navn: "l" }, { t: "punkt", x: g.ax, y: g.ay, navn: "A" }, { t: "punkt", x: g.bx, y: g.by, navn: "B" }] },
      dele: [{ tekst: r`Bestem $y$, så $|PA|=|PB|$.`,
        hints: [r`Udtryk $|PA|$ og $|PB|$ med afstandsformlen, hvor $P=(${g.k},y)$.`, r`Løs $\sqrt{(${g.ax}-${par(g.k)})^2+(${g.ay}-y)^2}=\sqrt{(${g.bx}-${par(g.k)})^2+(${g.by}-y)^2}$ med Løs i GeoGebra.`],
        loesning: r`$$\sqrt{(${g.ax}-${par(g.k)})^2+(${g.ay}-y)^2}=\sqrt{(${g.bx}-${par(g.k)})^2+(${g.by}-y)^2}$$ <p>Løs i GeoGebra giver $y=${g.y.tex()}${g.y.d === 1 ? "" : "=" + num(g.y.v)}$.</p> <p><b>Svar:</b> $y=${g.y.d === 1 ? g.y.tex() : num(g.y.v)}$.</p>` }] };
  }, tjek: g => Math.abs(dist(g.k, g.y, g.ax, g.ay) - dist(g.k, g.y, g.bx, g.by)) < 1e-9 },

{ id: "afstand-cirkel-linje", delproeve: 2, forlaeg: "Enkeltopg. 3.D2.8",
  dele: [{ bogstav: "a", point: 10, kategori: "punkt-linje", kraever: ["afstand-punkt-linje", "cirklens-ligning"], sv: 2 },
         { bogstav: "b", point: 10, kategori: "tangent-cirkel", kraever: ["tangent-cirkel", "afstand-punkt-linje", "cirklens-ligning"], sv: 3 }],
  lav() {
    const g = gen(() => { const s = pick([0.5, 0.25, -0.5, 2, -2, 1]), cx = int(-2, 6), cy = int(-4, 3), rr = int(2, 4), t = int(3, 9), q = s * s + 1, D = Math.abs(s * cx + t - cy) / Math.sqrt(q);
      const k = rr * Math.sqrt(q), c0 = cy - s * cx, bs = [c0 + k, c0 - k], pos = bs.filter(b => b > 0.05);
      return D > rr + 0.8 && pos.length === 1 && Math.abs(pos[0] - t) > 0.5 && { s, cx, cy, rr, t, q, D, b: pos[0] }; });
    return { _t: g, intro: r`På figuren ses en cirkel givet ved ligningen $${cirkel(g.cx, g.cy, g.rr * g.rr)}$ og en linje $l$ givet ved ligningen $${lin(g.s, g.t)}$.`,
      figur: { vindue: vindue([[g.cx - g.rr, g.cy - g.rr], [g.cx + g.rr, g.cy + g.rr], [0, g.t]], 2), objekter: [{ t: "cirkel", cx: g.cx, cy: g.cy, r: g.rr }, { t: "linje", a: g.s, b: g.t, navn: "l" }] },
      dele: [{ tekst: r`Bestem ved brug af en formel afstanden mellem cirklen og linjen $l$.`,
        hints: [r`Find afstanden fra centrum til linjen, og træk radius fra.`, r`Centrum er $(${g.cx},${g.cy})$ og radius $${g.rr}$. Brug afstandsformlen med $a=${num(g.s)}$ og $b=${g.t}$.`],
        loesning: r`$$\text{dist}(C,l)=\frac{|${gange(g.s, g.cx)}${plus(g.t)}-${par(g.cy)}|}{\sqrt{${par(g.s)}^2+1}}\approx ${dec(g.D)}$$ $$${dec(g.D)}-${g.rr}=${dec(g.D - g.rr)}$$ <p><b>Svar:</b> Afstanden mellem cirklen og linjen er ca. $${dec(g.D - g.rr)}$.</p>` },
      { tekst: r`En anden linje $m$ er givet ved ligningen $y=${ax(g.s)}+b$, hvor $b>0$. Bestem tallet $b$, så linjen $m$ er tangent til cirklen.`,
        hints: [r`$m$ er tangent, når afstanden fra centrum til $m$ er lig radius.`, r`Løs $\frac{|${gange(g.s, g.cx)}+b-${par(g.cy)}|}{\sqrt{${num(g.q)}}}=${g.rr}$ med Løs i GeoGebra, og vælg løsningen med $b>0$.`],
        loesning: r`$$\frac{|${gange(g.s, g.cx)}+b-${par(g.cy)}|}{\sqrt{${par(g.s)}^2+1}}=${g.rr}$$ <p>Løs i GeoGebra giver to løsninger, og kun den ene er positiv.</p> <p><b>Svar:</b> $b\approx ${dec(g.b, 3)}$.</p>` }] };
  }, tjek: g => Math.abs(Math.abs(g.s * g.cx + g.b - g.cy) / Math.sqrt(g.q) - g.rr) < 1e-9 && g.b > 0 }

];

if (typeof module !== "undefined") module.exports = { Q };
})();
