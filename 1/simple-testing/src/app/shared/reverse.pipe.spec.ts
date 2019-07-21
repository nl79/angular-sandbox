
import { ReversePipe } from "./reverse.pipe";
describe("rever pipe", () => {

  // compileComponent is not needed while using webpack or angluar CLI

  it("should create the app", () => {
    let reversePipe = new ReversePipe();
    expect(reversePipe.transform('hello')).toEqual('olleh');
  });

});
