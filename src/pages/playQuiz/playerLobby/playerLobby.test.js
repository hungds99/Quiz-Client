import React from "react";
import { shallow } from "enzyme";
import PlayerLobby from "./playerLobby";

describe("PlayerLobby", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<PlayerLobby />);
    expect(wrapper).toMatchSnapshot();
  });
});
