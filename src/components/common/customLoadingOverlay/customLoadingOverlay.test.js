import React from "react";
import { shallow } from "enzyme";
import CustomLoadingOverlay from "./customLoadingOverlay";

describe("CustomLoadingOverlay", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<CustomLoadingOverlay />);
    expect(wrapper).toMatchSnapshot();
  });
});
