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
    "Nightclub": msg`Nightclub`,
    "Den": msg`Den`,
    "Cafe": msg`Cafe`,
    "Tavern": msg`Tavern`,
    "Inn": msg`Inn`,
    "Lounge": msg`Lounge`,
    "Restaurant": msg`Restaurant`,
    "Fightclub": msg`Fight club`,
    "Casino": msg`Casino`,
    "Shop": msg`Shop`,
    "Maid cafe": msg`Maid cafe / host club`,
    "Bath house": msg`Bath house`,
    "Other": msg({message: `Other`, comment: `Venue type: none of the listed categories`}),
};

export const features: Record<string, MessageDescriptor> = {
    "Courtesans": msg`Courtesans`,
    "Gambling": msg`Gambling`,
    "Artists": msg`Artists`,
    "Dancers": msg`Dancers`,
    "Bards": msg`Bards`,
    "Twitch DJ": msg`Twitch DJ`,
    "Sync DJ": msg`Sync DJ`,
    "Tarot": msg`Tarot`,
    "Pillow": msg`Pillow talk`,
    "Photography": msg`Photography`,
    "Open stage": msg`Open stage`,
    "Void": msg({message: `Void`, comment: `Venue built in the housing void`}),
    "Stylists": msg`Stylists`,
    "Performances": msg`Performances`,
    "Giveaways": msg`Giveaways`,
    "Syncshell available": msg`Syncshell available`,
    "VIP": msg`VIP available`,
    "LGBTQIA+": msg`LGBTQIA+ focused`,
    "RP Heavy": msg`IC RP encouraged`,
    "IC RP Only": msg`IC RP only`,
    "24/7 open house": msg`24/7 open house`,
};

export const games: Record<string, MessageDescriptor> = {
    "Triple triad": msg`Triple triad`,
    "Truth or dare": msg`Truth or dare`,
    "Blackjack": msg`Blackjack`,
    "Deathroll": msg`Deathroll`,
    "Texas holdem": msg`Texas holdem`,
    "Bingo": msg`Bingo`,
    "Roulette": msg`Roulette`,
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