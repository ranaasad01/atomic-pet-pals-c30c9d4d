"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { SHOP_ITEMS } from "@/lib/data";
import type { ShopItem } from "@/lib/data";

const PET_TEMPLATES: any = new Proxy([], { get: (t: any, k) => (k in t ? t[k] : "") });
const STARTING_COINS: any = new Proxy([], { get: (t: any, k) => (k in t ? t[k] : "") });
const FEED_COST: any = new Proxy([], { get: (t: any, k) => (k in t ? t[k] : "") });
const PLAY_HAPPINESS_BOOST: any = new Proxy([], { get: (t: any, k) => (k in t ? t[k] : "") });
const PET_HAPPINESS_BOOST: any = new Proxy([], { get: (t: any, k) => (k in t ? t[k] : "") });
const FEED_HUNGER_BOOST: any = new Proxy([], { get: (t: any, k) => (k in t ? t[k] : "") });
const HAPPINESS_THRESHOLD: any = new Proxy([], { get: (t: any, k) => (k in t ? t[k] : "") });
const APP_NAME: any = new Proxy([], { get: (t: any, k) => (k in t ? t[k] : "") });
const APP_TAGLINE: any = new Proxy([], { get: (t: any, k) => (k in t ? t[k] : "") });

// ─── Types ─────────────────────────────────────────────────────────────────────────────────

interface PetState {
  id: string;
  name: string;
  emoji: string;
  color: string;
  image: string;
  hunger: number;   // 0–100 (100 = full)
  happiness: number; // 0–100
}

interface Inventory {
  [itemId: string]: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────────────────

function clamp(val: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, val));
}

function Bar({
  value,
  color,
  label,
  emoji,
}: {
  value: number;
  color: string;
  label: string;
  emoji: string;
}) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-bold text-gray-600">
          {emoji} {label}
        </span>
        <span className="text-xs font-bold text-gray-500">{Math.round(value)}%</span>
      </div>
      <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={false}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

function ActionBtn({
  onClick,
  disabled,
  emoji,
  label,
  color,
}: {
  onClick: () => void;
  disabled?: boolean;
  emoji: string;
  label: string;
  color: string;
}) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.08 }}
      whileTap={disabled ? {} : { scale: 0.94 }}
      className="flex flex-col items-center gap-1 px-3 py-2 rounded-2xl font-bold text-white text-xs shadow-md disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
      style={{ backgroundColor: disabled ? "#aaa" : color }}
    >
      <span className="text-lg">{emoji}</span>
      <span>{label}</span>
    </motion.button>
  );
}

// ─── Pet Card ───────────────────────────────────────────────────────────────────────────────

function PetCard({
  pet,
  onFeed,
  onPlay,
  onPet,
  coins,
  inventory,
}: {
  pet: PetState;
  onFeed: (id: string) => void;
  onPlay: (id: string) => void;
  onPet: (id: string) => void;
  coins: number;
  inventory: Inventory;
}) {
  const isHappy = pet.happiness >= HAPPINESS_THRESHOLD;
  const hasFood = Object.entries(inventory).some(
    ([itemId, qty]) =>
      qty > 0 && SHOP_ITEMS.find((s) => s.id === itemId && s.type === "food")
  );
  const hasToy = Object.entries(inventory).some(
    ([itemId, qty]) =>
      qty > 0 && SHOP_ITEMS.find((s) => s.id === itemId && s.type === "toy")
  );

  return (
    <motion.div
      layout
      className="relative flex flex-col items-center gap-3 bg-white rounded-3xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.10)] border-4"
      style={{ borderColor: pet.color }}
      whileHover={{ y: -4, boxShadow: "0 8px 32px rgba(0,0,0,0.13)" }}
      transition={{ duration: 0.25 }}
    >
      {isHappy && (
        <motion.div
          className="absolute -top-3 -right-3 text-2xl"
          animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          ⭐
        </motion.div>
      )}

      {/* Pet image */}
      <div
        className="w-24 h-24 rounded-full flex items-center justify-center text-6xl shadow-inner"
        style={{ backgroundColor: pet.color + "33" }}
      >
        <span role="img" aria-label={pet.name}>
          {pet.emoji}
        </span>
      </div>

      <h3 className="text-xl font-extrabold text-gray-800">{pet.name}</h3>

      {/* Bars */}
      <div className="w-full flex flex-col gap-2">
        <Bar value={pet.hunger} color="#f97316" label="Hunger" emoji="🍽️" />
        <Bar value={pet.happiness} color="#a855f7" label="Happiness" emoji="😊" />
      </div>

      {/* Mood */}
      <p className="text-sm font-semibold text-gray-500">
        {pet.happiness >= 80
          ? "Super happy! 🥳"
          : pet.happiness >= HAPPINESS_THRESHOLD
          ? "Feeling good! 😄"
          : pet.happiness >= 40
          ? "Could be happier 😐"
          : "Needs some love 😢"}
      </p>

      {/* Actions */}
      <div className="flex gap-2 flex-wrap justify-center">
        <ActionBtn
          onClick={() => onFeed(pet.id)}
          disabled={!hasFood}
          emoji="🥩"
          label="Feed"
          color="#f97316"
        />
        <ActionBtn
          onClick={() => onPlay(pet.id)}
          disabled={!hasToy}
          emoji="⚽"
          label="Play"
          color="#6366f1"
        />
        <ActionBtn
          onClick={() => onPet(pet.id)}
          emoji="🤗"
          label="Pet"
          color="#ec4899"
        />
      </div>
    </motion.div>
  );
}

// ─── Shop Card ────────────────────────────────────────────────────────────────────────────

function ShopCard({
  item,
  coins,
  qty,
  onBuy,
}: {
  item: ShopItem;
  coins: number;
  qty: number;
  onBuy: (item: ShopItem) => void;
}) {
  const canAfford = coins >= item.cost;

  return (
    <motion.div
      className="flex flex-col items-center gap-2 bg-white rounded-3xl p-4 shadow-[0_4px_16px_rgba(0,0,0,0.09)] border-2 border-purple-100"
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
    >
      <span className="text-4xl">{item.emoji}</span>
      <h4 className="font-extrabold text-gray-800 text-base">{item.name}</h4>
      <p className="text-xs text-gray-500 text-center">{(item as any).description}</p>
      <div className="flex flex-col items-center gap-1 text-xs text-gray-500">
        {item.hungerBoost > 0 && <span>🍽️ +{item.hungerBoost} hunger</span>}
        {item.happinessBoost > 0 && <span>😊 +{item.happinessBoost} happy</span>}
      </div>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-sm font-bold text-yellow-600">🪙 {item.cost}</span>
        {qty > 0 && (
          <span className="text-xs bg-purple-100 text-purple-700 font-bold px-2 py-0.5 rounded-full">
            x{qty}
          </span>
        )}
      </div>
      <motion.button
        onClick={() => onBuy(item)}
        disabled={!canAfford}
        whileHover={canAfford ? { scale: 1.07 } : {}}
        whileTap={canAfford ? { scale: 0.93 } : {}}
        className="w-full py-2 rounded-2xl font-bold text-white text-sm shadow disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
        style={{ backgroundColor: canAfford ? "#8b5cf6" : "#aaa" }}
      >
        {canAfford ? "Buy!" : "Not enough 🪙"}
      </motion.button>
    </motion.div>
  );
}

// ─── Toast ───────────────────────────────────────────────
// ... (truncated for context)
