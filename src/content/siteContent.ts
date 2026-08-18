export type ImageAsset = {
  src: string;
  alt: string;
  fallback: string;
  credit?: string;
};

export type NavItem = {
  label: string;
  href: string;
};

export type SiteContent = {
  meta: {
    title: string;
    description: string;
    ogImage: string;
  };
  nav: NavItem[];
  hero: {
    image: ImageAsset;
    eyebrow: string;
    title: string;
    subtitle: string;
    prompt: string;
  };
  motion: {
    title: string;
    intro: string;
    pullQuote: string;
    images: ImageAsset[];
    fragments: { number: string; label: string; text: string }[];
  };
  elsewhere: {
    title: string;
    intro: string;
    images: (ImageAsset & { marker: string; note: string })[];
    closing: string;
  };
  returns: {
    title: string;
    intro: string;
    items: { label: string; note: string; image: ImageAsset }[];
  };
  convictions: {
    title: string;
    intro: string;
    lines: { english: string; chinese: string }[];
  };
  fragments: {
    title: string;
    intro: string;
    items: { number: string; title: string; text: string; image?: ImageAsset; audioSrc?: string }[];
  };
  closing: {
    title: string;
    english: string;
    smallNote: string;
    contact?: { label: string; href: string };
  };
};

const image = (src: string, alt: string, fallback: string): ImageAsset => ({ src, alt, fallback });

export const siteContent: SiteContent = {
  meta: {
    title: "Eric Yao — A life, in progress.",
    description: "有些事，慢一点才看得清。",
    ogImage: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1600&q=85",
  },
  nav: [
    { label: "Eric Yao", href: "#top" },
    { label: "Motion", href: "#motion" },
    { label: "Elsewhere", href: "#elsewhere" },
    { label: "Convictions", href: "#convictions" },
    { label: "Fragments", href: "#fragments" },
  ],
  hero: {
    image: image(
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=2400&q=88",
      "暮色中的现代建筑，几何线条被留在暗处",
      "A quiet façade, waiting for its light",
    ),
    eyebrow: "A PRIVATE DOCUMENTARY",
    title: "ERIC YAO",
    subtitle: "有些事，慢一点才看得清。",
    prompt: "向下，慢慢看",
  },
  motion: {
    title: "IN MOTION",
    intro: "我习惯让事情向前走。\n有时靠判断，有时靠耐心，更多时候靠人与人之间逐渐建立的信任。",
    pullQuote: "I work where difficult ideas have to become real decisions.",
    images: [
      image(
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=84",
        "一张被光线切开的长桌与空椅",
        "A table before the room fills",
      ),
      image(
        "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1500&q=84",
        "从舷窗望出的云层与远方",
        "The hour between departure and arrival",
      ),
      image(
        "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=1400&q=84",
        "被反复修改的纸页和桌面",
        "A page that was not finished the first time",
      ),
    ],
    fragments: [
      { number: "01", label: "THE TABLE", text: "真正重要的讨论，很少从结论开始。" },
      { number: "02", label: "THE TRANSFER", text: "在不同的语言和节奏之间，保留同一件事的重量。" },
      { number: "03", label: "THE REVISION", text: "我不太相信宏大的自我介绍。真正重要的东西，最后都会留在选择里。" },
    ],
  },
  elsewhere: {
    title: "ELSEWHERE",
    intro: "有些地方让我知道自己能走多远。\n另一些地方让我明白，什么值得回来。",
    images: [
      {
        ...image(
          "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1800&q=86",
          "高处望向城市街区的蓝色时刻",
          "A city seen from a little farther away",
        ),
        marker: "31°12′ N",
        note: "BEFORE THE LIGHT CHANGES",
      },
      {
        ...image(
          "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1500&q=86",
          "雪线之上的山脊与低云",
          "A ridge that does not need a name",
        ),
        marker: "LATE ARRIVAL",
        note: "NO PHOTOGRAPH COULD KEEP IT",
      },
      {
        ...image(
          "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1500&q=86",
          "水面与远处的岸线",
          "A shoreline at the edge of the day",
        ),
        marker: "WINDOW SEAT",
        note: "THE LONG WAY BACK",
      },
    ],
    closing: "有时出发不是为了抵达，只是为了看清下一步。",
  },
  returns: {
    title: "THINGS I RETURN TO",
    intro: "工作之外，我仍然会回到一些不需要解释的事物。",
    items: [
      {
        label: "THE COURT",
        note: "球落地之前，身体已经做出了选择。",
        image: image(
          "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=1300&q=84",
          "黄昏里的网球场与球网",
          "A court after the last point",
        ),
      },
      {
        label: "THE OBJECT",
        note: "机械计时最迷人的地方，不是精确，而是人在有限时间里仍然试图建立秩序。",
        image: image(
          "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1300&q=84",
          "一枚机械腕表的细节",
          "A small mechanism keeping its own time",
        ),
      },
      {
        label: "THE ROOM",
        note: "我一直喜欢那些会让人安静下来的地方。",
        image: image(
          "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?auto=format&fit=crop&w=1300&q=84",
          "博物馆内的长廊与光影",
          "A room built for looking longer",
        ),
      },
      {
        label: "THE BODY",
        note: "身体只是一个人如何对待自己的长期证据。",
        image: image(
          "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1300&q=84",
          "训练空间里的一束自然光",
          "The quiet part of showing up",
        ),
      },
    ],
  },
  convictions: {
    title: "CONVICTIONS",
    intro: "少数我愿意反复确认的判断。",
    lines: [
      { english: "Strength without restraint is noise.", chinese: "力量若没有克制，最后只剩下声响。" },
      { english: "Long-term is a form of courage.", chinese: "长期不是等待，而是另一种勇气。" },
      { english: "Loyalty is knowing what is not for sale.", chinese: "忠诚不是失去选择，而是在拥有选择以后，仍然知道什么不可交换。" },
      { english: "A higher order keeps ambition human.", chinese: "人在野心之外，需要一个比自己更高的秩序。" },
      { english: "The moment still asks for a decision.", chinese: "我相信长期，也相信关键时刻必须有人做出决定。" },
    ],
  },
  fragments: {
    title: "FRAGMENTS",
    intro: "有些事情在发生的时候很小。\n后来才发现，自己一直记得。",
    items: [
      {
        number: "A / 01",
        title: "THE PAPER",
        text: "一张写过字的纸，留到今天。不是因为上面写得多好，只是那天的光线和现在很像。",
        image: image(
          "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1400&q=84",
          "桌面上写过字的纸与笔",
          "A sentence left on paper",
        ),
      },
      {
        number: "A / 02",
        title: "THE NIGHT",
        text: "我不是擅长忘记的人。只是大多数时候，并不会说。",
        image: image(
          "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1400&q=84",
          "夜色里安静的城市街道",
          "A city after most windows go dark",
        ),
      },
      {
        number: "A / 03",
        title: "THE SOUND",
        text: "如果有一段声音留在这里，它应该只在你愿意听的时候出现。",
      },
      {
        number: "A / 04",
        title: "THE SMALL THING",
        text: "真正留住人的，往往不是大事。是一句没有被说完的话，或者回头时刚好亮着的灯。",
        image: image(
          "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1400&q=84",
          "窗边的一盏灯与空椅",
          "A light left on for no particular reason",
        ),
      },
    ],
  },
  closing: {
    title: "我把一部分留在这里。\n剩下的，只能在真实的相处里知道。",
    english: "If you’ve made it this far, you probably already know how to find me.",
    smallNote: "A life, in progress.",
  },
};
