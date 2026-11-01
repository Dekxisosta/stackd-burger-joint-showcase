import { INTRO_HTML } from "./intro-inner";

/**
 * Static shells that the legacy STACK'D script (public/stackd.js) fills in at
 * runtime. They render empty on the server and React never updates them, so
 * the script owns their contents after hydration.
 */
export default function Shell() {
  return (
    <>
      <div
        id="intro"
        className="wait"
        role="presentation"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: INTRO_HTML }}
      />
      <header id="hd" suppressHydrationWarning />
      <main id="app" suppressHydrationWarning />
      <footer id="ft" suppressHydrationWarning />
    </>
  );
}
