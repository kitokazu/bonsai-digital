import { act, renderHook } from "@testing-library/react";

import { usePageVisibility } from "@/hooks/use-page-visibility";

describe("usePageVisibility", () => {
  let visibilityState: DocumentVisibilityState;

  beforeEach(() => {
    visibilityState = "visible";
    Object.defineProperty(document, "visibilityState", {
      configurable: true,
      get: () => visibilityState,
    });
  });

  it("tracks changes to the document visibility state", () => {
    const { result } = renderHook(() => usePageVisibility());

    expect(result.current).toBe(true);

    act(() => {
      visibilityState = "hidden";
      document.dispatchEvent(new Event("visibilitychange"));
    });
    expect(result.current).toBe(false);

    act(() => {
      visibilityState = "visible";
      document.dispatchEvent(new Event("visibilitychange"));
    });
    expect(result.current).toBe(true);
  });
});
