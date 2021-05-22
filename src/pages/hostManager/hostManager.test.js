import React from "react";
import { shallow } from "enzyme";
import HostManager from "./hostManager";

describe("HostManager", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<HostManager />);
    expect(wrapper).toMatchSnapshot();
  });
});
