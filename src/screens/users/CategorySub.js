import React, { Component } from 'react'
import { Dimensions, Text, View, FlatList, TouchableOpacity, StyleSheet, Image, StatusBar, ActivityIndicator } from 'react-native';
import Slider from '../../components/Slider';
import Header from '../../components/HeaderUser';
import { connect } from 'react-redux';
import { getsubCategory } from '../../publics/redux/actions/subCategory';

class SubCategory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            category: this.props.navigation.state.params.catName,
            idCat: this.props.navigation.state.params.idCategory,
            subCategory: [],
            isLoading: false
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })
        idCat = this.state.idCat
        await this.props.dispatch(getsubCategory(idCat));
        this.setState({
            subCategory: this.props.subCategory.subCategoryList,
            isLoading: false
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar translucent backgroundColor="transparent" />
                <Header />
                <View style={styles.imageCon}>
                    <Slider />
                </View>
                <View style={styles.title}>
                    <Text style={styles.textTitle}>{this.state.category}</Text>
                </View>
                {this.state.isLoading == true ? <ActivityIndicator size={"large"} color={'#005b96'} height={Dimensions.get('screen').height} paddingTop={400} /> :
                    <FlatList
                        style={styles.FlatList}
                        data={this.state.subCategory}
                        numColumns={2}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity style={styles.button} onPress={() => { this.props.navigation.navigate('MapsUser', item) }}>
                                    <Image style={styles.image} source={{ uri: `${item.image}` }} />
                                    <Text style={styles.text}>{item.subName}</Text>
                                </TouchableOpacity>
                            )
                        }} />}
            </View>
        )
    }
}
const mapStateToProps = state => {
    return {
        subCategory: state.subCategory
    };
};
export default connect(mapStateToProps)(SubCategory);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
    },
    title: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#005b96',
        paddingTop: 6,
        paddingBottom: 4,
        elevation: 6,
    },
    textTitle: {
        marginBottom: 5,
        color: 'white',
        fontSize: 15,
        fontWeight: '700'
    },
    image: {
        alignSelf: 'center',
        marginVertical: 7,
        width: '80%',
        height: 65,
    },
    item: {
        flex: 1,
    },
    FlatList: {
        width: Dimensions.get('screen').width,
        marginTop: 10,
        marginBottom: 8,
        paddingHorizontal: 20,
        alignSelf: 'center',
    },
    text: {
        textAlign: 'center',
        color: 'white',
        marginBottom: 5,
        fontWeight: '400'
    },
    button: {
        marginLeft: 15,
        marginVertical: 10,
        justifyContent: 'flex-end',
        backgroundColor: '#6497b1',
        borderRadius: 8,
        elevation: 6,
        width: '42%',
        height: 110,
    },
    order: {
        alignSelf: 'center',
        backgroundColor: '#005b96',
        paddingVertical: 10,
        marginHorizontal: 20,
        marginBottom: 20,
        width: Dimensions.get('screen').width * 0.85
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '700'
    },
});
