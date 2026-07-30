import {isRegion} from "./filterFunctions/isRegion.ts";
import {isDataCenter} from "./filterFunctions/isDataCenter.ts";
import {isWorld} from "./filterFunctions/isWorld.ts";

import type {FilterOption} from "@/components/filterMenu/filters/filterOption.ts";
import {msg} from "@lingui/core/macro";

const worldMek = Symbol("worldMek");

export const worldFilters: FilterOption[] = [
  {
    name: msg`North America`,
    options: [
      {
        name: msg`All North America`,
        mek: worldMek,
        filter: isRegion("na"),
      },
      {
        name: "Aether",
        options: [
          {
            name: msg`All Aether`,
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
            name: msg`All Crystal`,
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
            name: msg`All Primal`,
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
            name: msg`All Dynamis`,
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
    name: msg`Europe`,
    options: [
      {
        name: msg`All Europe`,
        mek: worldMek,
        filter: isRegion("eu"),
      },
      {
        name: "Chaos",
        options: [
          {
            name: msg`All Chaos`,
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
            name: msg`All Light`,
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
    name: msg`Oceania`,
    options: [
      {
        name: msg`All Oceania`,
        mek: worldMek,
        filter: isRegion("oc"),
      },
      {
        name: "Materia",
        options: [
          {
            name: msg`All Materia`,
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
  },
  {
    name: "Japan",
    options: [
      {
        name: "All Japan",
        mek: worldMek,
        filter: isRegion("jp"),
      },
      {
        name: "Elemental",
        options: [
          {
            name: "All Elemental",
            mek: worldMek,
            filter: isDataCenter("Elemental"),
          },
          {
            name: "Aegis",
            mek: worldMek,
            filter: isWorld("Aegis")
          },
          {
            name: "Atomos",
            mek: worldMek,
            filter: isWorld("Atomos")
          },
          {
            name: "Carbuncle",
            mek: worldMek,
            filter: isWorld("Carbuncle")
          },
          {
            name: "Garuda",
            mek: worldMek,
            filter: isWorld("Garuda")
          },
          {
            name: "Gungnir",
            mek: worldMek,
            filter: isWorld("Gungnir")
          },
          {
            name: "Kujata",
            mek: worldMek,
            filter: isWorld("Kujata")
          },
          {
            name: "Tonberry",
            mek: worldMek,
            filter: isWorld("Tonberry")
          },
          {
            name: "Typhon",
            mek: worldMek,
            filter: isWorld("Typhon")
          }
        ]
      },
      {
        name: "Gaia",
        options: [
          {
            name: "All Gaia",
            mek: worldMek,
            filter: isDataCenter("Gaia"),
          },
          {
            name: "Alexander",
            mek: worldMek,
            filter: isWorld("Alexander")
          },
          {
            name: "Bahamut",
            mek: worldMek,
            filter: isWorld("Bahamut")
          },
          {
            name: "Durandal",
            mek: worldMek,
            filter: isWorld("Durandal")
          },
          {
            name: "Fenrir",
            mek: worldMek,
            filter: isWorld("Fenrir")
          },
          {
            name: "Ifrit",
            mek: worldMek,
            filter: isWorld("Ifrit")
          },
          {
            name: "Ridill",
            mek: worldMek,
            filter: isWorld("Ridill")
          },
          {
            name: "Tiamat",
            mek: worldMek,
            filter: isWorld("Tiamat")
          },
          {
            name: "Ultima",
            mek: worldMek,
            filter: isWorld("Ultima")
          }
        ]
      },
      {
        name: "Mana",
        options: [
          {
            name: "All Mana",
            mek: worldMek,
            filter: isDataCenter("Mana"),
          },
          {
            name: "Anima",
            mek: worldMek,
            filter: isWorld("Anima")
          },
          {
            name: "Asura",
            mek: worldMek,
            filter: isWorld("Asura")
          },
          {
            name: "Chocobo",
            mek: worldMek,
            filter: isWorld("Chocobo")
          },
          {
            name: "Hades",
            mek: worldMek,
            filter: isWorld("Hades")
          },
          {
            name: "Ixion",
            mek: worldMek,
            filter: isWorld("Ixion")
          },
          {
            name: "Masamune",
            mek: worldMek,
            filter: isWorld("Masamune")
          },
          {
            name: "Pandaemonium",
            mek: worldMek,
            filter: isWorld("Pandaemonium")
          },
          {
            name: "Titan",
            mek: worldMek,
            filter: isWorld("Titan")
          }
        ]
      },
      {
        name: "Meteor",
        options: [
          {
            name: "All Meteor",
            mek: worldMek,
            filter: isDataCenter("Meteor"),
          },
          {
            name: "Belias",
            mek: worldMek,
            filter: isWorld("Belias")
          },
          {
            name: "Mandragora",
            mek: worldMek,
            filter: isWorld("Mandragora")
          },
          {
            name: "Ramuh",
            mek: worldMek,
            filter: isWorld("Ramuh")
          },
          {
            name: "Shinryu",
            mek: worldMek,
            filter: isWorld("Shinryu")
          },
          {
            name: "Unicorn",
            mek: worldMek,
            filter: isWorld("Unicorn")
          },
          {
            name: "Valefor",
            mek: worldMek,
            filter: isWorld("Valefor")
          },
          {
            name: "Yojimbo",
            mek: worldMek,
            filter: isWorld("Yojimbo")
          },
          {
            name: "Zeromus",
            mek: worldMek,
            filter: isWorld("Zeromus")
          }
        ]
      }
    ]
  }
]
