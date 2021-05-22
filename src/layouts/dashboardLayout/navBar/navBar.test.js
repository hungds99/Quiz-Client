import React from "react";
import { shallow } from "enzyme";
import NavBar from "./navBar";

describe("NavBar", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<NavBar />);
    expect(wrapper).toMatchSnapshot();
  });
});
