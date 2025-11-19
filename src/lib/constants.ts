/**
 * Application-wide constants
 * Centralized configuration for maintainability
 */

// Query stale times (in milliseconds)
export const QUERY_STALE_TIMES = {
  DASHBOARD: 10 * 60 * 1000, // 10 minutes
  USERS: 15 * 60 * 1000, // 15 minutes
  TENDERS: 5 * 60 * 1000, // 5 minutes
  BIDS: 5 * 60 * 1000, // 5 minutes
  COMPANIES: 10 * 60 * 1000, // 10 minutes
  CATEGORIES: 30 * 60 * 1000, // 30 minutes
  PACKAGES: 30 * 60 * 1000, // 30 minutes
  REQUESTS: 5 * 60 * 1000, // 5 minutes
  ANALYTICS: 5 * 60 * 1000, // 5 minutes
} as const;

// Query garbage collection times (in milliseconds)
export const QUERY_GC_TIMES = {
  DASHBOARD: 20 * 60 * 1000, // 20 minutes
  USERS: 30 * 60 * 1000, // 30 minutes
  DEFAULT: 15 * 60 * 1000, // 15 minutes
} as const;

// Refresh debounce times (in milliseconds)
export const REFRESH_DEBOUNCE = {
  MINIMUM_INTERVAL: 2000, // 2 seconds
  DASHBOARD: 3000, // 3 seconds
  DEFAULT: 2000, // 2 seconds
} as const;

// Activity thresholds (in milliseconds)
export const ACTIVITY_THRESHOLDS = {
  STALE_DATA: 5 * 60 * 1000, // 5 minutes
  AUTO_REFRESH: 60 * 1000, // 1 minute
} as const;

// Status color mappings
export const STATUS_COLORS = {
  // User/Company Status
  Active: "bg-green-100 text-green-800",
  Suspended: "bg-yellow-100 text-yellow-800",
  Locked: "bg-red-100 text-red-800",
  
  // Bid Status
  under_review: "bg-yellow-100 text-yellow-800",
  awarded: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
  
  // Request Status
  Pending: "bg-yellow-100 text-yellow-800",
  Approved: "bg-green-100 text-green-800",
  Rejected: "bg-red-100 text-red-800",
} as const;

// Pagination defaults
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [7, 10, 20, 30, 40, 50],
  DEFAULT_PAGE: 1,
} as const;

// API Configuration
export const API_CONFIG = {
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 2,
  RETRY_DELAY_BASE: 1000, // 1 second
  RETRY_DELAY_MAX: 30000, // 30 seconds
} as const;

// UI Constants
export const UI = {
  PRIMARY_COLOR: "#A4D65E",
  ANIMATION_DURATION: 200, // milliseconds
  DEBOUNCE_DELAY: 300, // milliseconds
} as const;

// Route paths
export const ROUTES = {
  DASHBOARD: "/dashboard",
  USERS: "/users",
  TENDERS: "/tenders",
  BIDS: "/bids",
  COMPANIES: "/companies",
  CATEGORIES: "/categories",
  PACKAGES: "/packages",
  REQUESTS: "/requests",
  ANALYTICS: "/analytics",
  LOGIN: "/login",
  SIGNUP: "/signup",
} as const;

// Public routes (no authentication required)
export const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/signup",
  "/about",
  "/contact",
] as const;

// User roles
export const USER_ROLES = {
  ADMIN: "admin",
  COMPANY: "company",
} as const;

// Request types
export const REQUEST_TYPES = {
  COMPANY_VERIFICATION: "Company Verification",
  TENDER_REQUEST: "Tender Request",
} as const;

// File types for document preview
export const FILE_TYPES = {
  IMAGE: ["png", "jpg", "jpeg", "gif", "webp"],
  PDF: ["pdf"],
  WORD: ["doc", "docx"],
  EXCEL: ["xls", "xlsx"],
  POWERPOINT: ["ppt", "pptx"],
  TEXT: ["txt"],
} as const;

// Date formats
export const DATE_FORMATS = {
  DISPLAY: "MMM dd, yyyy",
  DISPLAY_WITH_TIME: "MMM dd, yyyy HH:mm",
  API: "yyyy-MM-dd",
  DATETIME: "yyyy-MM-dd'T'HH:mm:ss",
} as const;

// Validation patterns
export const VALIDATION_PATTERNS = {
  ETHIOPIAN_PHONE: /^(\+251|251|0)(9\d{8}|7\d{8})$/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;

// Validation messages
export const VALIDATION_MESSAGES = {
  ETHIOPIAN_PHONE: "Please enter a valid Ethiopian phone number (e.g., +251912345678, 251912345678, 0912345678, 0712345678)",
  REQUIRED: (field: string) => `${field} is required`,
  EMAIL: "Please enter a valid email address",
} as const;

