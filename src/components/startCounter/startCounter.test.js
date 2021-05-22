import React from "react";
import { shallow } from "enzyme";
import StartCounter from "./startCounter";

describe("StartCounter", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<StartCounter />);
    expect(wrapper).toMatchSnapshot();
  });
});
