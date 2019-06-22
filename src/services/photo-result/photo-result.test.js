import PhotoResultService from "./photo-result.service";

describe("PhotoResultService", () => {
  it("is a singleton", () => {
    expect(PhotoResultService).toBeTruthy();
  });
});
