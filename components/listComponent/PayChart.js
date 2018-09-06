import React from 'react';
import { Card, CardItem } from 'native-base';
import Speedometer from 'react-native-speedometer-chart';

export default class PayChart extends React.Component {
    render() {
        return (
            <Card style={{marginTop:10,}}>
                <CardItem header bordered style={{ justifyContent: 'center',}}>
                    <Text style={styles.cardHeader}>여신한도</Text>
                </CardItem>
                <CardItem style={{flexDirection:"row", justifyContent:"space-between",  }}>
                    <Speedometer
                        value={680}
                        totalValue={1000}
                        size={160}
                        outerColor="#d3d3d3"
                        internalColor="blue"
                        showText
                        text="잔여금액"
                        textStyle={{ color: 'green' }}
                        showLabels
                        labelStyle={{ color: 'blue' }}
                        showPercent
                        percentStyle={{ color: '#999' }}
                    />
                    <Speedometer
                        value={14}
                        totalValue={30}
                        size={160}
                        outerColor="#d3d3d3"
                        internalColor="green"
                        showText
                        text="잔여일수"
                        textStyle={{ color: 'green' }}
                        showLabels
                        labelStyle={{ color: 'blue' }}
                        showPercent
                        percentStyle={{ color: '#999' }}
                    />
                </CardItem>
            </Card>
        )
    }
}