import React, {Component} from 'react';

import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';

class App extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor() {
    super();
    this.state = {
      email: '',
      senha: '',
    };
  }

  _Login = async () => {
    fetch('http://localhost:5000/api/usuario/authorize', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        senha: this.state.senha,
      }),
    })
      .then(resposta => resposta.json())
      .then(data => this._Home(data.token))
      .catch(erro => console.warn('' + erro));
  };

  _Home = async Token => {
    if(Token != null){
      try{
        await AsyncStorage.setItem('@opflix:token', Token);
        this.props.navigation.navigate('MainNavigator');
      } catch (error) {
        console.warn('deu ruim!' + error);
      }
    }
  };

  render(){
    return(
      <View>
        <TextInput
          placeholder="Email"
          onChangeText={email => this.setState({email})}
          value={this.state.email}
        />
        <TextInput
          placeholder="Senha"
          onChangeText={senha => this.setState({senha})}
          value={this.state.senha}
        />
        <TouchableOpacity onPress={this._Login}>
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default App;
