import {isRegion} from "./filterFunctions/isRegion.ts";
import {isDataCenter} from "./filterFunctions/isDataCenter.ts";
import {isWorld} from "./filterFunctions/isWorld.ts";

import type {FilterOption} from "@/components/filterMenu/filters/filterOption.ts";

const worldMek = Symbol("worldMek");

export const worldFilters: FilterOption[] = [
  {
    name: "North America",
    options: [
      {
        name: "All North America",
        mek: worldMek,
        filter: isRegion("na"),
      },
      {
        name: "Aether",
        options: [
          {
            name: "All Aether",
            mek: worldMek,
            filter: isDataCenter("Aether"),
          },
          {
            name: "Adamantoise",
            mek: worldMek,
            filter: isWorld("Adamantoise")
          },
          {
            name: "Cactuar",
            mek: worldMek,
            filter: isWorld("Cactuar")
          },
          {
            name: "Faerie",
            mek: worldMek,
            filter: isWorld("Faerie")
          },
          {
            name: "Gilgamesh",
            mek: worldMek,
            filter: isWorld("Gilgamesh")
          },
          {
            name: "Jenova",
            mek: worldMek,
            filter: isWorld("Jenova")
          },
          {
            name: "Midgardsormr",
            mek: worldMek,
            filter: isWorld("Midgardsormr")
          },
          {
            name: "Sargatanas",
            mek: worldMek,
            filter: isWorld("Sargatanas")
          },
          {
            name: "Siren",
            mek: worldMek,
            filter: isWorld("Siren")
          }
        ]
      },
      {
        name: "Crystal",
        options: [
          {
            name: "All Crystal",
            mek: worldMek,
            filter: isDataCenter("Crystal"),
          },
          {
            name: "Balmung",
            mek: worldMek,
            filter: isWorld("Balmung")
          },
          {
            name: "Brynhildr",
            mek: worldMek,
            filter: isWorld("Brynhildr")
          },
          {
            name: "Coeurl",
            mek: worldMek,
            filter: isWorld("Coeurl")
          },
          {
            name: "Diabolos",
            mek: worldMek,
            filter: isWorld("Diabolos")
          },
          {
            name: "Goblin",
            mek: worldMek,
            filter: isWorld("Goblin")
          },
          {
            name: "Malboro",
            mek: worldMek,
            filter: isWorld("Malboro")
          },
          {
            name: "Mateus",
            mek: worldMek,
            filter: isWorld("Mateus")
          },
          {
            name: "Zalera",
            mek: worldMek,
            filter: isWorld("Zalera")
          }
        ]
      },
      {
        name: "Primal",
        options: [
          {
            name: "All Primal",
            mek: worldMek,
            filter: isDataCenter("Primal"),
          },
          {
            name: "Behemoth",
            mek: worldMek,
            filter: isWorld("Behemoth")
          },
          {
            name: "Excalibur",
            mek: worldMek,
            filter: isWorld("Excalibur")
          },
          {
            name: "Exodus",
            mek: worldMek,
            filter: isWorld("Exodus")
          },
          {
            name: "Famfrit",
            mek: worldMek,
            filter: isWorld("Famfrit")
          },
          {
            name: "Hyperion",
            mek: worldMek,
            filter: isWorld("Hyperion")
          },
          {
            name: "Lamia",
            mek: worldMek,
            filter: isWorld("Lamia")
          },
          {
            name: "Leviathan",
            mek: worldMek,
            filter: isWorld("Leviathan")
          },
          {
            name: "Ultros",
            mek: worldMek,
            filter: isWorld("Ultros")
          }
        ]
      },
      {
        name: "Dynamis",
        options: [
          {
            name: "All Dynamis",
            mek: worldMek,
            filter: isDataCenter("Dynamis"),
          },
          {
            name: "Cuchulainn",
            mek: worldMek,
            filter: isWorld("Cuchulainn")
          },
          {
            name: "Golem",
            mek: worldMek,
            filter: isWorld("Golem")
          },
          {
            name: "Halicarnassus",
            mek: worldMek,
            filter: isWorld("Halicarnassus")
          },
          {
            name: "Kraken",
            mek: worldMek,
            filter: isWorld("Kraken")
          },
          {
            name: "Maduin",
            mek: worldMek,
            filter: isWorld("Maduin")
          },
          {
            name: "Marilith",
            mek: worldMek,
            filter: isWorld("Marilith")
          },
          {
            name: "Rafflesia",
            mek: worldMek,
            filter: isWorld("Rafflesia")
          },
          {
            name: "Seraph",
            mek: worldMek,
            filter: isWorld("Seraph")
          }
        ]
      }
    ]
  },
  {
    name: "Europe",
    options: [
      {
        name: "All Europe",
        mek: worldMek,
        filter: isRegion("eu"),
      },
      {
        name: "Chaos",
        options: [
          {
            name: "All Chaos",
            mek: worldMek,
            filter: isDataCenter("Chaos"),
          },
          {
            name: "Cerberus",
            mek: worldMek,
            filter: isWorld("Cerberus")
          },
          {
            name: "Louisoix",
            mek: worldMek,
            filter: isWorld("Louisoix")
          },
          {
            name: "Moogle",
            mek: worldMek,
            filter: isWorld("Moogle")
          },
          {
            name: "Omega",
            mek: worldMek,
            filter: isWorld("Omega")
          },
          {
            name: "Phantom",
            mek: worldMek,
            filter: isWorld("Phantom")
          },
          {
            name: "Ragnarok",
            mek: worldMek,
            filter: isWorld("Ragnarok")
          },
          {
            name: "Sagittarius",
            mek: worldMek,
            filter: isWorld("Sagittarius")
          },
          {
            name: "Spriggan",
            mek: worldMek,
            filter: isWorld("Spriggan")
          }
        ]
      },
      {
        name: "Light",
        options: [
          {
            name: "All Light",
            mek: worldMek,
            filter: isDataCenter("Light"),
          },
          {
            name: "Alpha",
            mek: worldMek,
            filter: isWorld("Alpha")
          },
          {
            name: "Lich",
            mek: worldMek,
            filter: isWorld("Lich")
          },
          {
            name: "Odin",
            mek: worldMek,
            filter: isWorld("Odin")
          },
          {
            name: "Phoenix",
            mek: worldMek,
            filter: isWorld("Phoenix")
          },
          {
            name: "Raiden",
            mek: worldMek,
            filter: isWorld("Raiden")
          },
          {
            name: "Shiva",
            mek: worldMek,
            filter: isWorld("Shiva")
          },
          {
            name: "Twintania",
            mek: worldMek,
            filter: isWorld("Twintania")
          },
          {
            name: "Zodiark",
            mek: worldMek,
            filter: isWorld("Zodiark")
          }
        ]
      }
    ]
  },
  {
    name: "Oceania",
    options: [
      {
        name: "All Oceania",
        mek: worldMek,
        filter: isRegion("oc"),
      },
      {
        name: "Materia",
        options: [
          {
            name: "All Materia",
            mek: worldMek,
            filter: isDataCenter("Materia"),
          },
          {
            name: "Bismarck",
            mek: worldMek,
            filter: isWorld("Bismarck")
          },
          {
            name: "Ravana",
            mek: worldMek,
            filter: isWorld("Ravana")
          },
          {
            name: "Sephirot",
            mek: worldMek,
            filter: isWorld("Sephirot")
          },
          {
            name: "Sophia",
            mek: worldMek,
            filter: isWorld("Sophia")
          },
          {
            name: "Zurvan",
            mek: worldMek,
            filter: isWorld("Zurvan")
          }
        ]
      }
    ]
  }
]
