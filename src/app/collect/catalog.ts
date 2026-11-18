export type Picture = { src: string; caption: string };
type WorkStatus = "By inquiry" | "Framing in progress" | "Print inquiries" | "Studio or SuperRare" | "Reserved" | "Sold";
export type Work = {
  slug: string; title: string; medium: string; dimensions?: string; status: WorkStatus;
  story: string; facts: [string, string][]; pictures: Picture[];
  source: string; sourceLabel: string; store?: string; price?: string;
};
function image(file: string, caption: string): Picture {
  return { src: "/collect-art/" + file, caption };
}
export const works: Work[] = [
  {
    slug: "faces-in-the-cloud", title: "Faces In The Cloud", medium: "Oil on canvas",
    dimensions: "24 × 24 inches", status: "By inquiry",
    price: "Asking price $2,400 USD. Shipping quoted separately.",
    story: "I saw this as a place where a neural network’s memories of portraits could mingle. I took the image it generated and painted it in oil on a square canvas. The painting was part of my ARTificial exhibition at Bull Run Library in Manassas in June 2019.",
    facts: [
      ["Included with purchase", "The original oil painting and its associated Codex NFT (record 1748)."],
      ["Condition", "Premium condition, as described by the artist."],
      ["Exhibited", "ARTificial, Manassas, Virginia, 2019"]
    ],
    pictures: [image("faces-exhibition.png", "Faces In The Cloud, installed at the 2019 ARTificial exhibition."), image("faces.webp", "Angled outdoor view of the painting, with light catching the paint surface.")],
    source: "/news/artificiallibrary-html", sourceLabel: "Explore the 2019 exhibition"
  },{
    slug: "fountain-405", title: "Fountain #405", medium: "Signed large-format Polaroid",
    dimensions: "22 × 35 inches", status: "Framing in progress", price: "$3,000 USD plus shipping",
    story: "Fountain #405 began as one image in a series of 501 works I made with a GAN. Working with SuperSense, I brought it back into the analog world through a large-format Polaroid camera. The age of the film softened the colors. That muted palette belongs to this particular photograph.",
    facts: [["Proposed offering", "Framed, signed Polaroid with the original Fountain #405 NFT. Contact the studio for final bundle and delivery details."]],
    pictures: [image("fountain-polaroid.jpg", "Fountain #405, large-format Polaroid before framing."), image("fountain-digital.jpg", "Fountain #405, original digital work.")],
    source: "/news/fountain-large-format-polaroid", sourceLabel: "Read the Polaroid studio notes"
  },{
    slug: "bones-in-the-sky", title: "Bones In The Sky", medium: "Photographs and AI prints", status: "Print inquiries",
    story: "I gathered animal bones and photographed them against the sky with film and digital cameras. I trained a model on those photographs. In the installation, a visitor can catch one frame from the stream and send it to the printer.",
    facts: [["Studio selection", "Contact the studio for individual sheets, dimensions and availability. Images shown introduce the series."]],
    pictures: [image("bones-springbok.jpg","Springbok Skull, film photograph from Bones In The Sky."), image("bones-process.jpg","Bård photographing bones against the sky."), image("bones-print.jpg","Signed installation print, an example from the series.")],
    source: "/news/bones", sourceLabel: "See the installation"
  },{
    slug: "q7-entity-display-scope", title: "Q7 Entity Display Scope", medium: "Handheld electronic art object", status: "Studio or SuperRare", price: "$550 USD plus shipping",
    story: "The Scope gives the Entity a physical presence you can hold. Its screen brings the Entity’s artwork into your hand, and voice and touch let you communicate with it.",
    facts: [["Project", "Tape T Is In The System"], ["Ordering", "Email the studio with your delivery destination for availability and a shipping quote, or choose a numbered device for SuperRare checkout."]],
    pictures: [image("scope.jpg","Q7 Entity Display Scope."),image("scope-detail.jpg","Q7 Entity Display Scope, device detail.")],
    source: "/news/spiral-exhibition", sourceLabel: "Read about the exhibition", store: "https://sage-66.sageanomaly.com/gallery?view=device"
  }
];
export const studioWorks = [
  ["Color e-paper frame", "An ESP32 color e-paper frame for Tape T Is In The System."],
  ["Bone head", "A video sculpture with an image projected into the eye."],
  ["Balloon on a gooseneck", "A balloon mounted on a gooseneck rising from a wooden box."],
  ["Projection-mapped balloon", "A moving image mapped onto the surface of a balloon."]
];
