import {msg} from "@lingui/core/macro";
import type {MessageDescriptor} from "@lingui/core";

export const districts = ["Mist", "Lavender Beds", "Goblet", "Shirogane", "Empyreum"];

export const worlds: Record<string, string[]> = {
    Aether: ["Adamantoise", "Cactuar", "Faerie", "Gilgamesh", "Jenova", "Midgardsormr", "Sargatanas", "Siren"],
    Crystal: ["Balmung", "Brynhildr", "Coeurl", "Diabolos", "Goblin", "Malboro", "Mateus", "Zalera"],
    Primal: ["Behemoth", "Excalibur", "Exodus", "Famfrit", "Hyperion", "Lamia", "Leviathan", "Ultros"],
    Dynamis: ["Cuchulainn", "Golem", "Halicarnassus", "Kraken", "Maduin", "Marilith", "Rafflesia", "Seraph"],
    Chaos: ["Cerberus", "Louisoix", "Moogle", "Omega", "Phantom", "Ragnarok", "Sagittarius", "Spriggan"],
    Light: ["Alpha", "Lich", "Odin", "Phoenix", "Raiden", "Shiva", "Twintania", "Zodiark"],
    Materia: ["Bismarck", "Ravana", "Sephirot", "Sophia", "Zurvan"],
};

export const scenes: Record<string, MessageDescriptor> = {
    "nightclub": msg`Nightclub`,
    "den": msg`Den`,
    "cafe": msg`Cafe`,
    "tavern": msg`Tavern`,
    "inn": msg`Inn`,
    "lounge": msg`Lounge`,
    "restaurant": msg`Restaurant`,
    "fightclub": msg`Fight club`,
    "casino": msg`Casino`,
    "shop": msg`Shop`,
    "maid cafe": msg`Maid cafe / host club`,
    "bath house": msg`Bath house`,
    "other": msg({message: `Other`, comment: `Venue type: none of the listed categories`}),
};

export const features: Record<string, MessageDescriptor> = {
    "courtesans": msg`Courtesans`,
    "gambling": msg`Gambling`,
    "artists": msg`Artists`,
    "dancers": msg`Dancers`,
    "bards": msg`Bards`,
    "twitch dj": msg`Twitch DJ`,
    "sync dj": msg`Sync DJ`,
    "tarot": msg`Tarot`,
    "pillow": msg`Pillow talk`,
    "photography": msg`Photography`,
    "open stage": msg`Open stage`,
    "void": msg({message: `Void`, comment: `Venue built in the housing void`}),
    "stylists": msg`Stylists`,
    "performances": msg`Performances`,
    "giveaways": msg`Giveaways`,
    "syncshell available": msg`Syncshell available`,
    "vip": msg`VIP available`,
    "LGBTQIA+": msg`LGBTQIA+ focused`,
    "rp heavy": msg`IC RP encouraged`,
    "ic rp only": msg`IC RP only`,
    "24/7 open house": msg`24/7 open house`,
};

export const games: Record<string, MessageDescriptor> = {
    "triple triad": msg`Triple triad`,
    "truth or dare": msg`Truth or dare`,
    "blackjack": msg`Blackjack`,
    "deathroll": msg`Deathroll`,
    "texas holdem": msg`Texas holdem`,
    "bingo": msg`Bingo`,
    "roulette": msg`Roulette`,
};

export const timeZones: Record<string, MessageDescriptor> = {
    "America/New_York": msg`Eastern Standard Time (EST)`,
    "America/Chicago": msg`Central Standard Time (CST)`,
    "America/Denver": msg`Mountain Standard Time (MST)`,
    "America/Los_Angeles": msg`Pacific Standard Time (PST)`,
    "America/Halifax": msg`Atlantic Standard Time (AST)`,
    "UTC": msg`Server Time (UTC)`,
    "Europe/London": msg`Greenwich Mean Time (GMT)`,
    "Europe/Budapest": msg`Central European Time (CEST)`,
    "Europe/Chisinau": msg`Eastern European Time (EEST)`,
    "Asia/Hong_Kong": msg`Hong Kong Time (HKT)`,
    "Australia/Perth": msg`Australian Western Time (AWST)`,
    "Australia/Adelaide": msg`Australian Central Time (ACST)`,
    "Australia/Sydney": msg`Australian Eastern Time (AEST)`,
};