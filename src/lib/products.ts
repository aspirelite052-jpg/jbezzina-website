// src/lib/products.ts — full catalogue with size data from product sheet

import {
  Anchor,
  Bolt,
  Cog,
  Drill,
  Factory,
  Gauge,
  Hammer,
  Layers,
  Settings2,
  Shield,
  Wrench,
  Zap,
  Wind,
  Droplets,
  HardHat,
  Cable,
  type LucideIcon,
} from "lucide-react";

export type ProductCategory = {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  imageAlt: string;
  imageUrl: string;
};

export type SizeRow = {
  type: string;
  range: string;
};

export type ProductSection = {
  id: string;
  title: string;
  slug: string;
  seoPath: string;
  intro: string;
  description: string;
  items: { name: string; detail: string }[];
  sizes?: SizeRow[];
  icon: LucideIcon;
  imageAlt: string;
  imageUrl: string;
};

// ─── Homepage category cards ──────────────────────────────────────────────────

export const HOME_CATEGORIES: ProductCategory[] = [
  {
    id: "fasteners",
    title: "Fasteners",
    description:
      "Structural and mechanical bolting for contractors, steel fabricators, and plant maintenance — stocked for Maltese site and workshop demand.",
    href: "/products/fasteners-malta",
    icon: Bolt,
    imageAlt: "Industrial bolts, nuts, and fasteners",
    imageUrl:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&q=80",
  },
  {
    id: "power-tools",
    title: "Power Tools",
    description:
      "Drills, grinders, rotary hammers, and cordless systems for industrial sites and workshops across Malta.",
    href: "/products/power-tools-malta",
    icon: Drill,
    imageAlt: "Industrial power tools",
    imageUrl:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80",
  },
  {
    id: "safety-equipment",
    title: "Safety Equipment",
    description:
      "PPE, helmets, gloves, respirators, and eye protection for compliant industrial and marine operations.",
    href: "/products/safety-equipment-malta",
    icon: HardHat,
    imageAlt: "Industrial safety equipment and PPE",
    imageUrl:
      "https://images.unsplash.com/photo-1572981773060-3690e3d73b1c?w=600&q=80",
  },
  {
    id: "hydraulics",
    title: "Hydraulics",
    description:
      "Hydraulic hoses, cylinders, jacks, and pumps for marine, industrial, and mobile plant applications.",
    href: "/products/hydraulics-malta",
    icon: Droplets,
    imageAlt: "Hydraulic hoses and fittings",
    imageUrl:
      "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c3?w=600&q=80",
  },
  {
    id: "electrical",
    title: "Electrical Supplies",
    description:
      "MCBs, contactors, VFD drives, industrial plugs, and panel components for electrical contractors.",
    href: "/products/electrical-supplies-malta",
    icon: Zap,
    imageAlt: "Industrial electrical components",
    imageUrl:
      "https://images.unsplash.com/photo-1537467634559-cef47b3451c2?w=600&q=80",
  },
  {
    id: "mechanical-components",
    title: "Mechanical Components",
    description:
      "Bearings, couplings, gearboxes, belts, and sprockets for rotating equipment maintenance.",
    href: "/products/mechanical-components-malta",
    icon: Cog,
    imageAlt: "Mechanical bearings and components",
    imageUrl:
      "https://images.unsplash.com/photo-1565193566170-61699be3647c?w=600&q=80",
  },
];

// ─── Full product sections with sizes ────────────────────────────────────────

export const PRODUCT_SECTIONS: ProductSection[] = [
  {
    id: "fasteners",
    title: "Industrial Fasteners",
    slug: "fasteners",
    seoPath: "/products/fasteners-malta",
    intro: "Bolting supply for construction sites, marine workshops, and manufacturing plants across Malta.",
    description:
      "From highway infrastructure and building contractors to ship repair and factory maintenance, our fastener range covers structural hex assemblies, machine screws, anchors, and washers. We help teams standardise procurement and reduce downtime caused by incompatible or sub-grade fixings.",
    items: [
      { name: "Hex Nuts", detail: "M1.6 – M160, including heavy hex and nyloc variants." },
      { name: "Bolts", detail: "Hex, Allen, flange, stud, anchor, and carriage bolts M3–M160." },
      { name: "Washers", detail: "Flat, spring, fender, Belleville, copper, and sealing washers." },
      { name: "Screws", detail: "Machine, wood, and sheet-metal screws for fabrication and panel work." },
      { name: "Wing & Dome Nuts", detail: "M3–M100 for tool-free assembly and protective capping." },
      { name: "T-Slot & Castle Nuts", detail: "M4–M100 for jig tables and castellated shaft retention." },
    ],
    sizes: [
      { type: "Hex Nuts", range: "M1.6 – M160" },
      { type: "Heavy Hex Nuts", range: "M12 – M160" },
      { type: "Nyloc Nuts", range: "M3 – M100" },
      { type: "Flange Nuts", range: "M5 – M100" },
      { type: "Wing Nuts", range: "M3 – M24" },
      { type: "Hex Bolts", range: "M3 – M160" },
      { type: "Allen Bolts", range: "M2 – M100" },
      { type: "Stud Bolts", range: "M6 – M160" },
      { type: "Anchor Bolts", range: "M8 – M100" },
      { type: "Flat Washer", range: "M1.6 – M160" },
      { type: "Spring Washer", range: "M2 – M100" },
    ],
    icon: Bolt,
    imageAlt: "Assorted industrial bolts and nuts",
    imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=900&q=80",
  },
  {
    id: "power-tools",
    title: "Power Tools",
    slug: "power-tools",
    seoPath: "/products/power-tools-malta",
    intro: "Professional power tools for industrial sites, workshops, and contractors in Malta.",
    description:
      "We stock a full range of power tools suited to heavy industrial use — from compact drills to large-format angle grinders and cordless multi-voltage systems. Suitable for shipyards, fabrication shops, civil contractors, and maintenance teams.",
    items: [
      { name: "Angle Grinders", detail: "4\"–14\" cut-off, 700W–3500W for grinding, cutting, and polishing." },
      { name: "Drills & Rotary Hammers", detail: "6mm–23mm drills; 20mm–52mm rotary hammers for concrete." },
      { name: "Impact Wrenches", detail: "3/8\"–1-1/2\" drive for heavy bolting and automotive work." },
      { name: "Circular Saws", detail: "7-1/4\"–14\" blade for timber, steel, and composite cutting." },
      { name: "Heat Guns", detail: "1600W–2500W for shrink wrap, paint stripping, and pipe bending." },
      { name: "Cordless Systems", detail: "12V–60V platforms for mobile industrial and site use." },
    ],
    sizes: [
      { type: "Drills (chuck)", range: "6mm, 10mm, 13mm, 16mm, 20mm, 23mm" },
      { type: "Rotary Hammers", range: "20mm, 24mm, 26mm, 28mm, 32mm, 40mm, 52mm" },
      { type: "Impact Wrenches", range: "3/8\", 1/2\", 3/4\", 1\", 1-1/2\"" },
      { type: "Circular Saws", range: "7-1/4\", 8-1/4\", 10\", 12\", 14\"" },
      { type: "Heat Guns", range: "1600W, 1800W, 2000W, 2500W" },
      { type: "Cordless Voltage", range: "12V, 18V, 20V, 24V, 36V, 40V, 60V" },
      { type: "Angle Grinder Disc", range: "4\", 4.5\", 5\", 7\", 9\", 14\" cut-off" },
    ],
    icon: Drill,
    imageAlt: "Industrial power tools",
    imageUrl: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=900&q=80",
  },
  {
    id: "safety-equipment",
    title: "Safety Equipment",
    slug: "safety-equipment",
    seoPath: "/products/safety-equipment-malta",
    intro: "PPE and site safety equipment for compliant industrial operations in Malta.",
    description:
      "Supplying certified personal protective equipment to contractors, shipyards, factories, and civil engineering projects. Our range covers head, eye, hearing, respiratory, hand, and foot protection — all from reputable manufacturers meeting EU safety standards.",
    items: [
      { name: "Safety Helmets", detail: "EN397 certified, adjustable 52cm–66cm head size." },
      { name: "Safety Glasses & Goggles", detail: "Clear, smoke, amber, anti-fog, UV400 — standard, chemical splash, welding." },
      { name: "Safety Gloves", detail: "Sizes XS–XXXL for mechanical, chemical, and cut-resistant applications." },
      { name: "Safety Shoes", detail: "EU sizes 35–50, steel toe and composite options." },
      { name: "Respirators", detail: "N95, FFP1, FFP2, FFP3, and P100 for dust and chemical environments." },
      { name: "Ear Protection", detail: "20dB–37dB attenuation — earmuffs and plugs for high-noise sites." },
    ],
    sizes: [
      { type: "Gloves", range: "XS, S, M, L, XL, XXL, XXXL" },
      { type: "Safety Shoes", range: "EU 35 – 50" },
      { type: "Helmets", range: "Adjustable 52cm – 66cm" },
      { type: "Respirators", range: "N95, FFP1, FFP2, FFP3, P100" },
      { type: "Ear Protection", range: "20dB – 37dB attenuation" },
    ],
    icon: HardHat,
    imageAlt: "Industrial safety helmets, gloves, and PPE",
    imageUrl: "https://images.unsplash.com/photo-1572981773060-3690e3d73b1c?w=900&q=80",
  },
  {
    id: "hydraulics",
    title: "Hydraulics",
    slug: "hydraulics",
    seoPath: "/products/hydraulics-malta",
    intro: "Hydraulic hoses, cylinders, pumps, and jacks for marine and industrial plant.",
    description:
      "Our hydraulic range supports ship repair, heavy lifting, press operations, and mobile plant maintenance. We supply hoses with BSP, BSPT, NPT, JIC, ORFS, and metric fittings — custom-assembled to length. Cylinder bores from 25mm to 500mm and jack capacities from 2 to 500 tonnes.",
    items: [
      { name: "Hydraulic Hoses", detail: "DN4–DN50 (1/8\"–2\") with full fitting range: BSP, NPT, JIC, ORFS, metric." },
      { name: "Hydraulic Cylinders", detail: "25mm–500mm bore for press, clamp, and lift applications." },
      { name: "Hydraulic Jacks", detail: "2 Ton–500 Ton for heavy industrial and marine lifting." },
      { name: "Hydraulic Pumps", detail: "0.5 HP–500 HP power units for fixed and mobile plant." },
      { name: "Hose Assembly Kits", detail: "Pre-made kits with crimping machine support 1/4\"–2\" hose." },
    ],
    sizes: [
      { type: "Hose DN4 (1/8\")", range: "1/8\"" },
      { type: "Hose DN6 (1/4\")", range: "1/4\"" },
      { type: "Hose DN8 (5/16\")", range: "5/16\"" },
      { type: "Hose DN10 (3/8\")", range: "3/8\"" },
      { type: "Hose DN12 (1/2\")", range: "1/2\"" },
      { type: "Hose DN16 (5/8\")", range: "5/8\"" },
      { type: "Hose DN20 (3/4\")", range: "3/4\"" },
      { type: "Hose DN25 (1\")", range: "1\"" },
      { type: "Hose DN32 (1-1/4\")", range: "1-1/4\"" },
      { type: "Hose DN40 (1-1/2\")", range: "1-1/2\"" },
      { type: "Hose DN50 (2\")", range: "2\"" },
      { type: "Cylinders", range: "25mm – 500mm bore" },
      { type: "Jacks", range: "2 Ton – 500 Ton" },
      { type: "Pumps", range: "0.5 HP – 500 HP" },
    ],
    icon: Droplets,
    imageAlt: "Hydraulic hoses and fittings",
    imageUrl: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c3?w=900&q=80",
  },
  {
    id: "electrical",
    title: "Electrical Supplies",
    slug: "electrical-supplies",
    seoPath: "/products/electrical-supplies-malta",
    intro: "Industrial electrical components for panel builders, contractors, and plant engineers.",
    description:
      "From MCBs and MCCBs to VFD drives and motor starter panels, we supply the electrical components that keep Maltese industrial facilities operational. Our range covers protection, switching, control, and power distribution equipment from trusted manufacturers.",
    items: [
      { name: "MCB / MCCB", detail: "0.5A–125A MCBs; 16A–3200A MCCBs for panel protection." },
      { name: "Contactors & Overloads", detail: "6A–1000A contactors; 0.1A–630A overload relays." },
      { name: "VFD Drives", detail: "0.25kW–1000kW variable frequency drives for motor speed control." },
      { name: "Industrial Plugs", detail: "CEE-type 16A, 32A, 63A, 125A for site and marine power." },
      { name: "Motor Starter Panels", detail: "DOL, star-delta, soft starter, and VFD panel assemblies." },
    ],
    sizes: [
      { type: "MCB", range: "0.5A – 125A" },
      { type: "MCCB", range: "16A – 3200A" },
      { type: "Contactors", range: "6A – 1000A" },
      { type: "Overload Relays", range: "0.1A – 630A" },
      { type: "VFD Drives", range: "0.25kW – 1000kW" },
      { type: "Industrial Plugs", range: "16A, 32A, 63A, 125A" },
      { type: "DOL Starter", range: "0.5 HP – 25 HP" },
      { type: "Star Delta Starter", range: "5 HP – 500 HP" },
      { type: "Soft Starter", range: "5 HP – 1500 HP" },
      { type: "VFD Panel", range: "1 HP – 1500 HP" },
    ],
    icon: Zap,
    imageAlt: "Industrial electrical panels and components",
    imageUrl: "https://images.unsplash.com/photo-1537467634559-cef47b3451c2?w=900&q=80",
  },
  {
    id: "mechanical-components",
    title: "Mechanical Components",
    slug: "mechanical-components",
    seoPath: "/products/mechanical-components-malta",
    intro: "Rotating equipment and drive components for industrial maintenance engineers.",
    description:
      "Bearings, seals, couplings, belts, and gearboxes for motors, conveyors, pumps, and deck machinery. We understand that mechanical supply failure stops production — our role is dependable availability and correct specification matching for Maltese industry.",
    items: [
      { name: "Bearings", detail: "Ball, roller, and plain bearings ID 3mm–1000mm for all drive applications." },
      { name: "Pillow Blocks", detail: "UCP201–UCP326 housed units for shaft support installations." },
      { name: "Couplings", detail: "Flexible and rigid couplings 10mm–300mm bore for drive alignment." },
      { name: "V-Belts & Timing Belts", detail: "A, B, C, D, SPA, SPB, SPC, SPZ belts; timing belts 100mm–10,000mm." },
      { name: "Sprockets & Chains", detail: "04B–48B chain series for conveyors and drive systems." },
      { name: "Gearboxes", detail: "Inline and right-angle gearboxes 0.12kW–500kW output." },
      { name: "Seals & O-Rings", detail: "Oil seals 10mm–1500mm ID; O-rings 1mm–1000mm ID." },
    ],
    sizes: [
      { type: "Bearings ID", range: "3mm – 1000mm" },
      { type: "Pillow Blocks", range: "UCP201 – UCP326" },
      { type: "Couplings Bore", range: "10mm – 300mm" },
      { type: "Sprockets/Chains", range: "04B – 48B series" },
      { type: "Pulleys", range: "50mm – 2000mm" },
      { type: "Timing Belts", range: "100mm – 10,000mm" },
      { type: "Gearboxes", range: "0.12kW – 500kW" },
      { type: "Linear Guides", range: "15mm – 65mm" },
      { type: "Ball Screws", range: "12mm – 120mm diameter" },
      { type: "Shafts", range: "6mm – 500mm diameter" },
      { type: "Oil Seals", range: "10mm – 1500mm ID" },
      { type: "O-Rings", range: "1mm – 1000mm ID" },
    ],
    icon: Cog,
    imageAlt: "Industrial bearings and mechanical components",
    imageUrl: "https://images.unsplash.com/photo-1565193566170-61699be3647c?w=900&q=80",
  },
  {
    id: "engineering-tools",
    title: "Engineering Tools",
    slug: "engineering-tools",
    seoPath: "/products/engineering-tools-malta",
    intro: "Precision measuring and hand tools for fitting, inspection, and assembly.",
    description:
      "From vernier calipers to surface plates, our engineering tools range covers the inspection and assembly needs of maintenance engineers, quality technicians, and workshop fitters. All instruments are calibration-ready and suitable for ISO-compliant facilities.",
    items: [
      { name: "Vernier & Digital Calipers", detail: "150mm–2000mm range for external, internal, and depth measurement." },
      { name: "Micrometers", detail: "0–25mm through 150–300mm for precision OD measurement." },
      { name: "Height & Depth Gauges", detail: "150mm–1000mm height gauges; 150mm–600mm depth gauges." },
      { name: "Dial Indicators", detail: "0–10mm, 0–25mm, 0–50mm for runout and alignment checks." },
      { name: "Thread & Feeler Gauges", detail: "0.25mm–6mm pitch; 0.02mm–2.0mm feeler gauges." },
      { name: "Surface Plates", detail: "300×300mm to 3000×2000mm cast iron for reference inspection." },
    ],
    sizes: [
      { type: "Vernier Caliper", range: "150mm, 200mm, 300mm, 600mm, 1000mm, 1500mm, 2000mm" },
      { type: "Digital Caliper", range: "150mm, 200mm, 300mm, 600mm" },
      { type: "Micrometer", range: "0–25mm to 150–300mm" },
      { type: "Height Gauge", range: "150mm, 300mm, 600mm, 1000mm" },
      { type: "Dial Indicator", range: "0–10mm, 0–25mm, 0–50mm" },
      { type: "Feeler Gauge", range: "0.02mm – 2.0mm" },
      { type: "Thread Gauge", range: "0.25mm – 6mm pitch" },
      { type: "Steel Rule", range: "150mm – 3000mm" },
      { type: "Surface Plate", range: "300×300mm – 3000×2000mm" },
    ],
    icon: Hammer,
    imageAlt: "Precision engineering measuring tools",
    imageUrl: "https://images.unsplash.com/photo-1572981773060-3690e3d73b1c?w=900&q=80",
  },
  {
    id: "workshop-equipment",
    title: "Workshop Equipment",
    slug: "workshop-equipment",
    seoPath: "/products/workshop-equipment-malta",
    intro: "Heavy workshop equipment for fabrication, lifting, and production environments.",
    description:
      "Bench vices, drill presses, welding machines, air compressors, hoists, and forklifts for industrial workshops and shipyards. We supply equipment that handles the daily load of Maltese trade operations — from small fitting shops to full production facilities.",
    items: [
      { name: "Bench Vice", detail: "3\"–12\" jaw width for holding and fabrication work." },
      { name: "Drill Press", detail: "13mm–50mm chuck capacity for precision drilling." },
      { name: "Hydraulic Press", detail: "10–500 Ton for pressing, straightening, and assembly." },
      { name: "Welding Machines", detail: "100A–1000A MIG, TIG, and MMA welding equipment." },
      { name: "Air Compressors", detail: "25L–5000L tank capacity for pneumatic tool supply." },
      { name: "Hoists & Lifting", detail: "Chain blocks 0.5–100 Ton; engine hoists 1–20 Ton." },
    ],
    sizes: [
      { type: "Bench Vice", range: "3\", 4\", 5\", 6\", 8\", 10\", 12\"" },
      { type: "Drill Press", range: "13mm – 50mm" },
      { type: "Hydraulic Press", range: "10 – 500 Ton" },
      { type: "Welding Machine", range: "100A – 1000A" },
      { type: "Air Compressor", range: "25L – 5000L" },
      { type: "Engine Hoist", range: "1 – 20 Ton" },
      { type: "Chain Block", range: "0.5 – 100 Ton" },
      { type: "Forklift", range: "1 – 50 Ton" },
      { type: "Pallet Truck", range: "2 – 10 Ton" },
    ],
    icon: Factory,
    imageAlt: "Heavy workshop equipment and machinery",
    imageUrl: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c3?w=900&q=80",
  },
  {
    id: "engineering-consumables",
    title: "Engineering Consumables",
    slug: "engineering-consumables",
    seoPath: "/products/engineering-consumables-malta",
    intro: "Abrasives, welding consumables, and cutting tools for workshop stores.",
    description:
      "Grinding discs, cutting discs, welding electrodes, MIG wire, TIG rods, drill bits, and abrasives for high-throughput workshops. We supply by the box or pallet to reduce per-unit cost for regular users. Suitable for steel fabricators, maintenance contractors, and shipyards.",
    items: [
      { name: "Grinding & Cutting Discs", detail: "4\"–9\" grinding; 3\"–14\" cutting discs for angle grinders." },
      { name: "Welding Electrodes", detail: "1.6mm–6.0mm MMA electrodes for structural and maintenance welding." },
      { name: "MIG Wire & TIG Rods", detail: "MIG 0.6mm–1.6mm; TIG 1.0mm–4.8mm for all material types." },
      { name: "Drill Bits", detail: "0.5mm–100mm HSS and carbide for steel, stainless, and cast iron." },
      { name: "Hole Saws", detail: "14mm–300mm bi-metal for sheet, pipe, and structural steel." },
      { name: "Abrasives", detail: "Sandpaper P24–P3000; emery paper 60–2000 grit." },
    ],
    sizes: [
      { type: "Grinding Discs", range: "4\", 4.5\", 5\", 7\", 9\"" },
      { type: "Cutting Discs", range: "3\", 4\", 4.5\", 5\", 7\", 9\", 14\"" },
      { type: "Flap Discs", range: "4\", 4.5\", 5\", 7\"" },
      { type: "Diamond Blades", range: "4\" – 24\"" },
      { type: "Drill Bits", range: "0.5mm – 100mm" },
      { type: "Hole Saws", range: "14mm – 300mm" },
      { type: "Welding Electrodes", range: "1.6mm, 2.0mm, 2.5mm, 3.15mm, 4.0mm, 5.0mm, 6.0mm" },
      { type: "MIG Wire", range: "0.6mm, 0.8mm, 1.0mm, 1.2mm, 1.6mm" },
      { type: "TIG Rods", range: "1.0mm – 4.8mm" },
      { type: "Sandpaper Grit", range: "P24 – P3000" },
    ],
    icon: Settings2,
    imageAlt: "Grinding discs and welding consumables",
    imageUrl: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=900&q=80",
  },
];

// ─── Why choose us ────────────────────────────────────────────────────────────

export const WHY_CHOOSE_US = [
  {
    title: "Years of Experience",
    description:
      "Long-established relationships with Malta's contractors, manufacturers, and marine engineering trades.",
    icon: Shield,
  },
  {
    title: "Industrial Expertise",
    description:
      "Counter staff who understand fastener grades, tool applications, and workshop procurement cycles.",
    icon: Gauge,
  },
  {
    title: "Reliable Supply",
    description:
      "Stock and sourcing structured around site deadlines and production maintenance windows.",
    icon: Anchor,
  },
  {
    title: "Local Maltese Support",
    description:
      "Marsa Industrial Area location — collection, delivery coordination, and phone support during business hours.",
    icon: Factory,
  },
] as const;