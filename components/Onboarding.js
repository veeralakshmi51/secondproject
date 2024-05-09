import {View, Text, FlatList, Animated} from 'react-native';
import React, {useState, useRef} from 'react';
import slides from '../slides';
import OnboardingItem from './onboardingItem';

const Onboarding = () => {
  const scrollX = useRef(new Animated.Value(0)).current; // x axis horizontal
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRef=useRef(null);
  const viewableItemsChanged = useRef(({viewableItems}) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;
  const viewConfig=useRef({viewAreaCoveragePercentThreshold:30}).current;
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <View style={{flex:3}}>
      <FlatList
        data={slides}
        renderItem={({item}) => <OnboardingItem item={item} />}
        horizontal
        showsHorizontalScrollIndicator
        pagingEnabled
        bounces={false}
        keyExtractor={item => item.id}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {x: scrollX},
              },
            },
          ],
          {
            useNativeDriver: false,
          },
        )}
        scrollEventThrottle={32}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slideRef}
      />
      </View>
    </View>
  );
};

export default Onboarding;
