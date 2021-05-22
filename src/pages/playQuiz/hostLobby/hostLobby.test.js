import React from "react";
import { shallow } from "enzyme";
import HostLobby from "./hostLobby";

describe("HostLobby", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<HostLobby />);
    expect(wrapper).toMatchSnapshot();
  });
});
