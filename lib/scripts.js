/**
 * Load order for the STACK’D app scripts in /public/js.
 *
 * These are shared-scope scripts (not ES modules): later files use functions and
 * variables declared by earlier ones, so ORDER MATTERS. Rough dependency flow:
 *   core → data → ui helpers → features → admin → router → header → pages → boot
 */
export const SCRIPTS = [
  "/js/core/util.js",
  "/js/core/state.js",
  "/js/data/menu-data.js",
  "/js/ui/icons.js",
  "/js/ui/media.js",
  "/js/ui/theme.js",
  "/js/ui/modal.js",
  "/js/features/menu.js",
  "/js/features/branches.js",
  "/js/features/promos.js",
  "/js/features/cart.js",
  "/js/features/orders.js",
  "/js/features/contact.js",
  "/js/features/auth.js",
  "/js/admin/state.js",
  "/js/admin/users.js",
  "/js/admin/menu-editor.js",
  "/js/admin/store-settings.js",
  "/js/admin/order-actions.js",
  "/js/admin/analytics.js",
  "/js/admin/demo-data.js",
  "/js/admin/guard.js",
  "/js/router.js",
  "/js/ui/header.js",
  "/js/pages/home.js",
  "/js/pages/menu.js",
  "/js/pages/cart.js",
  "/js/pages/checkout.js",
  "/js/pages/locations.js",
  "/js/pages/promos.js",
  "/js/pages/about.js",
  "/js/pages/legal.js",
  "/js/pages/account.js",
  "/js/pages/admin.js",
  "/js/ui/intro.js",
  "/js/ui/carousel.js",
  "/js/boot.js",
];
