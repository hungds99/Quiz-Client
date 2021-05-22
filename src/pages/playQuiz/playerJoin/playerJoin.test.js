import React from "react";
import { shallow } from "enzyme";
import PlayerJoin from "./playerJoin";

describe("PlayerJoin", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<PlayerJoin />);
    expect(wrapper).toMatchSnapshot();
  });
});
