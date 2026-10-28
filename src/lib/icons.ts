// Lucide icons used on the site, inlined at build time. One set, one stroke weight.
// To add an icon: import it here from lucide-static/icons/<name>.svg?raw.
import appWindow from "lucide-static/icons/app-window.svg?raw";
import arrowRight from "lucide-static/icons/arrow-right.svg?raw";
import arrowUpRight from "lucide-static/icons/arrow-up-right.svg?raw";
import bookOpen from "lucide-static/icons/book-open.svg?raw";
import brainCircuit from "lucide-static/icons/brain-circuit.svg?raw";
import calendar from "lucide-static/icons/calendar.svg?raw";
import check from "lucide-static/icons/check.svg?raw";
import chevronDown from "lucide-static/icons/chevron-down.svg?raw";
import circleAlert from "lucide-static/icons/circle-alert.svg?raw";
import circleCheck from "lucide-static/icons/circle-check.svg?raw";
import clapperboard from "lucide-static/icons/clapperboard.svg?raw";
import clock from "lucide-static/icons/clock.svg?raw";
import cloud from "lucide-static/icons/cloud.svg?raw";
import database from "lucide-static/icons/database.svg?raw";
import factory from "lucide-static/icons/factory.svg?raw";
import fileLock from "lucide-static/icons/file-lock.svg?raw";
import globe from "lucide-static/icons/globe.svg?raw";
import graduationCap from "lucide-static/icons/graduation-cap.svg?raw";
import heartPulse from "lucide-static/icons/heart-pulse.svg?raw";
import keyRound from "lucide-static/icons/key-round.svg?raw";
import landmark from "lucide-static/icons/landmark.svg?raw";
import layers from "lucide-static/icons/layers.svg?raw";
import lock from "lucide-static/icons/lock.svg?raw";
import mail from "lucide-static/icons/mail.svg?raw";
import menu from "lucide-static/icons/menu.svg?raw";
import newspaper from "lucide-static/icons/newspaper.svg?raw";
import phone from "lucide-static/icons/phone.svg?raw";
import plane from "lucide-static/icons/plane.svg?raw";
import plus from "lucide-static/icons/plus.svg?raw";
import refreshCcw from "lucide-static/icons/refresh-ccw.svg?raw";
import send from "lucide-static/icons/send.svg?raw";
import shieldCheck from "lucide-static/icons/shield-check.svg?raw";
import shoppingBag from "lucide-static/icons/shopping-bag.svg?raw";
import sparkles from "lucide-static/icons/sparkles.svg?raw";
import truck from "lucide-static/icons/truck.svg?raw";
import userCheck from "lucide-static/icons/user-check.svg?raw";
import users from "lucide-static/icons/users.svg?raw";
import x from "lucide-static/icons/x.svg?raw";
// Brand glyph (Simple Icons, CC0), the one filled icon.
import whatsapp from "../assets/icons/whatsapp.svg?raw";

export const ICONS = {
  "app-window": appWindow,
  "arrow-right": arrowRight,
  "arrow-up-right": arrowUpRight,
  "book-open": bookOpen,
  "brain-circuit": brainCircuit,
  calendar,
  check,
  "chevron-down": chevronDown,
  "circle-alert": circleAlert,
  "circle-check": circleCheck,
  clapperboard,
  clock,
  cloud,
  database,
  factory,
  "file-lock": fileLock,
  globe,
  "graduation-cap": graduationCap,
  "heart-pulse": heartPulse,
  "key-round": keyRound,
  landmark,
  layers,
  lock,
  mail,
  menu,
  newspaper,
  phone,
  plane,
  plus,
  "refresh-ccw": refreshCcw,
  send,
  "shield-check": shieldCheck,
  "shopping-bag": shoppingBag,
  sparkles,
  truck,
  "user-check": userCheck,
  users,
  whatsapp,
  x,
} as const;

export type IconName = keyof typeof ICONS;
