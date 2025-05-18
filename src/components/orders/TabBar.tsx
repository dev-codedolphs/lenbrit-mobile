import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, LayoutChangeEvent } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { color } from '../../theme/colors';

interface TabBarProps {
  tabs: string[];
  selectedTab: string;
  onSelect: (tab: string) => void;
}

const TabBar: React.FC<TabBarProps> = ({ tabs, selectedTab, onSelect }) => {
  return (
    <View style={styles.container}>
      <View style={styles.tabRow}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => onSelect(tab)}
            style={styles.tabItem}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabText, selectedTab === tab && styles.tabTextSelected]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Track underline (light purple) */}
      <View style={styles.underlineTrack}>
        {tabs.map((tab) => (
          <View key={tab} style={styles.underlineSlot}>
            {selectedTab === tab && <View style={styles.selectedUnderline} />}
          </View>
        ))}
      </View>
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: wp(4),

  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: hp('1%'),
  },
  tabItem: {
    width: wp('30%'),
    alignItems: 'center',
  },
  tabText: {
    fontSize: hp('1.8%'),
    color: '#333',
    fontWeight: '400',
  },
  tabTextSelected: {
    color: '#A200E6',
    fontWeight: '600',
  },
  underlineTrack: {
    flexDirection: 'row',
    height: 3,
    padding: 3,
    backgroundColor: '#A020F026',
    width: '100%',
    borderRadius: wp(25),
  },
  underlineSlot: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedUnderline: {
    height: 3,
    width: '100%',
    backgroundColor: color.Default,
    borderRadius: 2,
  },
});
