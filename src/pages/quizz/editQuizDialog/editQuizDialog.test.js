import React from "react";
import { shallow } from "enzyme";
import EditQuizDialog from "./editQuizDialog";

describe("EditQuizDialog", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<EditQuizDialog />);
    expect(wrapper).toMatchSnapshot();
  });
});
