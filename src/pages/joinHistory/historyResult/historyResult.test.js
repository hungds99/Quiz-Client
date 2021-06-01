import React from "react";
import { shallow } from "enzyme";
import HistoryResult from "./historyResult";

describe("HistoryResult", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<HistoryResult />);
    expect(wrapper).toMatchSnapshot();
  });
});
