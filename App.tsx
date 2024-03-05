import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Button from './components/Button';

const App = () => {
  const [calculationPreview, setCalculationPreview] = useState('');
  const [calculatedValue, setCalculatedValue] = useState(0);

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: 'rgb(24 23 26)', padding: 30}}>
      {/* Result Section */}
      <View style={styles.resultContainer}>
        <Text style={styles.calculationPreview}>{calculationPreview}</Text>
        <Text style={styles.calculationResult}>={calculatedValue}</Text>
      </View>

      {/* Buttons Section */}
      <View style={styles.buttonContainer}>
        <ButtonRow
          calculationPreview={calculationPreview}
          setCalculationPreview={setCalculationPreview}
          setCalculatedValue={setCalculatedValue}
          buttons={[
            {text: 'e', type: 'function'},
            {text: 'µ', type: 'function'},
            {text: 'sin', type: 'function'},
            {text: 'deg', type: 'function'},
          ]}
        />
        <ButtonRow
          calculationPreview={calculationPreview}
          setCalculationPreview={setCalculationPreview}
          setCalculatedValue={setCalculatedValue}
          buttons={[
            {text: 'AC', type: 'clean'},
            {text: 'DEL', type: 'clean'},
            {text: '/', type: 'operator'},
            {text: '*', type: 'operator'},
          ]}
        />
        <ButtonRow
          calculationPreview={calculationPreview}
          setCalculationPreview={setCalculationPreview}
          setCalculatedValue={setCalculatedValue}
          buttons={[
            {text: 7, type: 'number'},
            {text: 8, type: 'number'},
            {text: 9, type: 'number'},
            {text: '-', type: 'operator'},
          ]}
        />
        <ButtonRow
          calculationPreview={calculationPreview}
          setCalculationPreview={setCalculationPreview}
          setCalculatedValue={setCalculatedValue}
          buttons={[
            {text: 4, type: 'number'},
            {text: 5, type: 'number'},
            {text: 6, type: 'number'},
            {text: '+', type: 'operator'},
          ]}
        />
        <ButtonRow
          calculationPreview={calculationPreview}
          setCalculationPreview={setCalculationPreview}
          setCalculatedValue={setCalculatedValue}
          buttons={[
            {text: 1, type: 'number'},
            {text: 2, type: 'number'},
            {text: 3, type: 'number'},
          ]}
          isLast
        />
        <ButtonRow
          calculationPreview={calculationPreview}
          setCalculationPreview={setCalculationPreview}
          setCalculatedValue={setCalculatedValue}
          buttons={[
            {text: 0, type: 'number'},
            {text: '.', type: 'dot'},
            {text: '=', type: 'sum'},
          ]}
        />
      </View>
    </SafeAreaView>
  );
};

export default App;

const ButtonRow = ({
  buttons,
  isLast,
  calculationPreview,
  setCalculationPreview,
  setCalculatedValue,
}: {
  buttons: {text: string | number; type: string}[];
  isLast?: boolean;
  calculationPreview: string;
  setCalculationPreview: React.Dispatch<React.SetStateAction<string>>;
  setCalculatedValue: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <View style={[styles.buttonRow, isLast && {marginTop: -35}]}>
      {buttons.map(button => (
        <Button
          key={button.text}
          text={button.text}
          onPress={() => {
            if (button.text === 'AC') {
              setCalculationPreview('');
              setCalculatedValue(0);
            } else if (button.text === 'DEL') {
              setCalculationPreview(prev => prev.slice(0, -1));
            } else if (button.type === 'sum') {
              if (
                calculationPreview[calculationPreview.length - 1] === '+' ||
                calculationPreview[calculationPreview.length - 1] === '-' ||
                calculationPreview[calculationPreview.length - 1] === '*' ||
                calculationPreview[calculationPreview.length - 1] === '/'
              ) {
                setCalculationPreview(prev => prev.slice(0, -1));
              } else {
                setCalculatedValue(eval(calculationPreview) || 0);
              }
            } else {
              setCalculationPreview(prev => prev + button.text);
            }
          }}
          buttonStyle={
            button.type === 'function'
              ? {
                  height: 40,
                  borderRadius: 20,
                }
              : button.type === 'clean'
              ? {
                  backgroundColor: '#616161',
                }
              : button.type === 'operator'
              ? {
                  backgroundColor: '#005DB2',
                }
              : button.type === 'number' && button.text === 0
              ? {width: 140}
              : button.type === 'sum' && {backgroundColor: '#1991FF'}
          }
          textStyle={
            button.type === 'clean'
              ? {color: '#A5A5A5'}
              : button.type === 'sum' && {color: '#B2DAFF'}
          }
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  calculationPreview: {
    color: '#818181',
    fontSize: 24,
  },
  calculationResult: {
    color: 'white',
    fontSize: 48,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flex: 3,
    gap: 10,
    justifyContent: 'flex-end',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 20,
  },
});
