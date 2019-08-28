import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    Dimensions,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    AsyncStorage

} from 'react-native'
import { login as loginUser } from '../../publics/redux/actions/user'
import { login as loginMitra } from '../../publics/redux/actions/mitra'
import { connect } from 'react-redux'

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            isLoading: false
        }
        console.warn(this.props.navigation.state.params.role);

    }
    static navigationOptions = {
        header: null
    }
    login = async () => {
        await this.setState({ isLoading: true })
        if (this.state.email !== '' && this.state.password !== '') {
            if (this.props.navigation.state.params.role === 'user') {
                await this.props.dispatch(loginUser({ email: this.state.email, password: this.state.password }))
                if (typeof (this.props.user.userList) === "object" && this.props.user.isFulfilled) {
                    await Alert.alert('Info', 'Success Login')
                    await this.setState({
                        isLoading: false,
                        email: '',
                        password: '',
                    })
                    this.props.navigation.navigate('Homeuser')
                } else {
                    this.setState({
                        isLoading: false,
                    })
                    console.warn(this.props.user.userList);
                    Alert.alert('Warning', this.props.user.userList)
                }
            } else {
                await this.props.dispatch(loginMitra({ email: this.state.email, password: this.state.password }))
                this.setState({ isLoading: false })
                console.warn(this.props.mitra);
                if (typeof (this.props.mitra.mitraList) === "object" && this.props.mitra.isFulfilled) {
                    await Alert.alert('Info', 'Success Login')
                    await this.setState({
                        isLoading: false,
                        email: '',
                        password: '',
                    })
                    this.props.navigation.navigate('Homemitra')
                } else {
                    this.setState({
                        isLoading: false,
                    })
                    Alert.alert('Warning', this.props.mitra.mitraList)
                }
            }
        } else {
            Alert.alert('Warning', 'Semua Field Harus Di isi')
            this.setState({ isLoading: false })
        }

    }
    render() {
        return (
            <ScrollView style={style.body} keyboardShouldPersistTaps={'always'}>
                <View style={style.container}>
                    <Text style={style.signIn}>
                        SIGN IN
                     </Text>
                    <Image source={this.props.navigation.state.params.role === 'mitra' ? require('../../assets/images/Engineer_icon.png') : require('../../assets/login.png')} style={style.image} />
                    <Text style={style.user}>
                        {this.props.navigation.state.params.role}
                    </Text>
                    <View style={style.wrapForm}>
                        < TextInput style={style.textInput} placeholderTextColor={'#fff'} placeholder={'Email..'} selectionColor={'#fff'} keyboardType={'email-address'} onChangeText={(email) => this.setState({ email })} />
                        < TextInput style={style.textInput} placeholderTextColor={'#fff'} placeholder={'Password..'} selectionColor={'#fff'} secureTextEntry={true} onChangeText={(password) => this.setState({ password })} />
                        < View style={style.wrapButton} >
                            <TouchableOpacity style={style.button} onPress={!this.state.isLoading ? this.login : null} disabled={this.state.isLoading && true}>
                                {!this.state.isLoading ?
                                    <Text style={style.buttonText}>
                                        Sign In
                                    </Text>
                                    :
                                    <ActivityIndicator size='small' color='#fff' style={style.buttonActivity} />
                                }
                            </TouchableOpacity>
                            <TouchableOpacity style={style.forgot}>
                                <Text style={style.forgotText}>
                                    Forgot Password ?
                            </Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={style.dont}>
                            Dont Have Account?
                        </Text>
                        <TouchableOpacity style={style.register} onPress={() => this.props.navigation.navigate('Register')}>
                            <Text style={style.registerText}>
                                Register Here
                                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        )
    }
}
const mapState = (state) => {
    return {
        user: state.user,
        mitra: state.mitra

    }
}
export default connect(mapState)(Login)
const style = StyleSheet.create({
    body: {
        backgroundColor: '#6497B1',
        height: '100%',
        width: width,
    },
    container: {
        marginBottom: 50
    },
    signIn: {
        color: '#fff',
        fontFamily: 'Roboto',
        fontSize: 36,
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 20
    },
    user: {
        color: 'white',
        fontFamily: 'Roboto',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 30
    },
    image: {
        height: width * 0.3,
        width: width * 0.3,
        alignSelf: 'center'
    },
    wrapForm: {
        marginHorizontal: width * 0.1
    },
    textInput: {
        height: 45,
        backgroundColor: '#B3CDE0',
        paddingHorizontal: width * 0.05,
        fontFamily: 'Roboto',
        fontSize: 15,
        color: '#fff',
        marginBottom: 25
    },
    wrapButton: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    button: {
        backgroundColor: '#005B96',
        height: 45,
        width: width * 0.30,
        alignSelf: 'flex-start',
        elevation: 5
    },
    buttonText: {
        height: '100%',
        textAlign: "center",
        textAlignVertical: "center",
        color: '#fff',
        fontSize: 18
    },
    buttonActivity: {
        marginTop: 12
    },
    forgot: {
    },
    forgotText: {
        height: '100%',
        textAlign: 'right',
        textAlignVertical: "center",
        alignSelf: "flex-end",
        color: '#fff'
    },
    dont: {
        marginTop: 50,
        textAlign: "center",
        fontSize: 15,
        color: '#fff'
    },
    register: {
        paddingVertical: 5
    },
    registerText: {
        textAlign: "center",
        fontSize: 15,
        color: '#fff',
        fontWeight: '700'
    }
})