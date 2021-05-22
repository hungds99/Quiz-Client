import React from "react";
import { shallow } from "enzyme";
import HostGame from "./hostGame";

describe("HostGame", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<HostGame />);
    expect(wrapper).toMatchSnapshot();
  });
});
