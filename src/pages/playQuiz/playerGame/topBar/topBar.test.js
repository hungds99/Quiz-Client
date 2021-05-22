import React from "react";
import { shallow } from "enzyme";
import TopBar from "./topBar";

describe("TopBar", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<TopBar />);
    expect(wrapper).toMatchSnapshot();
  });
});
