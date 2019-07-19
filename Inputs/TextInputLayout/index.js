import React, { Component } from 'react';

import { View, Animated, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { WrapTextInput, Label, EditText, Row } from './styles';

export default class TextInputLayout extends Component {
  state = {
    isFocused: false,
  };

  componentWillMount() {
    this._animatedIsFocused = new Animated.Value(this.props.value === '' ? 0 : 1);
  }

  componentDidUpdate() {
    Animated.timing(this._animatedIsFocused, {
      toValue: (this.state.isFocused || this.props.value !== '') ? 1 : 0,
      duration: 200,
    }).start();
  }

  handleFocus = () => this.setState({ isFocused: true });
  handleBlur = () => this.setState({ isFocused: false });

  render() {
    const { isFocused } = this.state
    const { onChangeShowPassword, label, icon, ...rest } = this.props

    const labelStyle = {
      position: 'absolute',
      left: 0,
      top: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [18, 0],
      }),
      fontSize: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [20, 14],
      }),
      color: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: ['#aaa', '#000'],
      }),
    };
    return (
      <WrapTextInput>
        <Animated.Text style={labelStyle}>
          {label}
        </Animated.Text>
        <Row>
          <EditText
            {...rest}
            focused={isFocused}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />
          {
            icon && (
              <TouchableOpacity
                style={{marginLeft: -25}}
                onPress={() => onChangeShowPassword()}>
                <Icon name={icon} size={25} />
              </TouchableOpacity>
            )
          }
        </Row>
      </WrapTextInput>
    );
  }
}
