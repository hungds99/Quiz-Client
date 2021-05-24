import React from "react";
import { shallow } from "enzyme";
import MultiPlayersResult from "./multiPlayersResult";

describe("MultiPlayersResult", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<MultiPlayersResult />);
    expect(wrapper).toMatchSnapshot();
  });
});
