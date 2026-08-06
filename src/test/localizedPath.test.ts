import { localizedPath } from "@/lib/locale-path";

describe("localizedPath", () => {
  it("moves an English page to its Japanese counterpart", () => {
    expect(localizedPath("/work", "ja")).toBe("/ja/work");
    expect(localizedPath("/work/rolemap", "ja")).toBe("/ja/work/rolemap");
    expect(localizedPath("/blog/some-post", "ja")).toBe("/ja/blog/some-post");
  });

  it("moves a Japanese page back to English at the root", () => {
    expect(localizedPath("/ja/work", "en")).toBe("/work");
    expect(localizedPath("/ja/work/apex-autowerks", "en")).toBe(
      "/work/apex-autowerks"
    );
  });

  it("handles the home page in both directions", () => {
    expect(localizedPath("/", "ja")).toBe("/ja");
    expect(localizedPath("/ja", "en")).toBe("/");
  });

  it("handles an explicit /en prefix, which the middleware also allows", () => {
    expect(localizedPath("/en/work", "ja")).toBe("/ja/work");
    expect(localizedPath("/en/work", "en")).toBe("/work");
  });

  it("is idempotent when the target locale is already active", () => {
    expect(localizedPath("/ja/about", "ja")).toBe("/ja/about");
    expect(localizedPath("/about", "en")).toBe("/about");
  });

  it("ignores a trailing slash", () => {
    expect(localizedPath("/work/", "ja")).toBe("/ja/work");
  });
});
