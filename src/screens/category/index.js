import React, { useEffect } from "react";
import { View, FlatList } from "react-native";
import styles from "./styles";
import { useSelector, connect, useDispatch } from "react-redux";

import { filteredProducts, selectedProduct } from "../../store/actions/productActions";

import CategoryProduct from "../../components/molecules/categoryProduct/index";

const Category = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const categoryProduct = useSelector(state => state.products.filteredProducts);
    const selectedCategory = useSelector(state => state.categories.selectedCategory);
    
    const handleSelectProduct = (product) => {
        dispatch(selectedProduct(product));
        navigation.navigate("Product", { name: "PRODUCTO"})
    }
    const renderItem = ({ item }) => <CategoryProduct item={item} onSelected={handleSelectProduct}/>

    useEffect(() => {
        dispatch(filteredProducts(selectedCategory.id));
    }, [])

    return(
        <View style={styles.container}>
            <FlatList
                data={categoryProduct}
                keyExtractor={item => item.id}
                renderItem={renderItem}
            />
        </View>
    );
}

export default connect()(Category);