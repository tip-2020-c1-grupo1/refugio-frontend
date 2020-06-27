import React from "react";
import { shallow, mount } from "enzyme";
import { createShallow } from '@material-ui/core/test-utils';
import AnimalList from "./AnimalList";
import { ThemeProvider } from '@material-ui/core/styles';
// import { ThemeProvider } from 'styled-components'

const themeMock = { 'root': {} }

const ThemeProviderWrapper = ({ children }) => (
  <ThemeProvider theme={themeMock}>
    { children }
  </ThemeProvider>
)

const shallowWithTheme = tree => shallow(tree, {
  wrappingComponent: ThemeProviderWrapper
})

const mountWithTheme = tree => mount(tree, {
  wrappingComponent: ThemeProviderWrapper
})  

describe('<MyComponent />', () => {
  
    it('should work', () => {
      const wrapper = mountWithTheme(<AnimalList />)
      console.log(wrapper.debug());
    });
  });