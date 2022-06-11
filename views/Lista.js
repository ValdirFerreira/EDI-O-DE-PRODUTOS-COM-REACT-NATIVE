import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';

import CardMensagem from '../componentes/CardMensagem'
import api from '../services/api';

export default function Lista({ navigation }) {

    const [produtos, setProd] = useState([]);

    useEffect(() => {

        const subs = navigation.addListener('focus', () => {
            api.get('List').then(({ data }) => {
                setProd(data)
            });
        })

    }, [])

    return (
        <View style={styles.container}>
            <Button style={styles.btnProduto} title="Cadastro novo produto"
                onPress={() => navigation.navigate("Cadastro")} />

            <Text style={styles.titulo} >Meu Primeiro APP REACT!</Text>
            <ScrollView>
                {produtos.map(item =>
                (
                    <View key={item.Codigo}>
                        <CardMensagem descricao={item.Descricao} />
                        <Button style={styles.btnProduto} title="Editar"
                            onPress={() => navigation.navigate("Edicao", { Codigo: item.Codigo })} />
                            <br></br>
                    </View>
                ))}
            </ScrollView>

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titulo:
    {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    },
    btnProduto:
    {
        borderRadius: 100
    }
});
