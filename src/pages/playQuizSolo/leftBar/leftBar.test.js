import React from "react";
import { shallow } from "enzyme";
import LeftBar from "./leftBar";

describe("LeftBar", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<LeftBar />);
    expect(wrapper).toMatchSnapshot();
  });
});
