import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FILTER_OPTIONS, FilterId } from '@/types/camera';

interface FilterSelectorBarProps {
  selectedFilter: FilterId;
  onSelectFilter: (filterId: FilterId) => void;
}

export const FilterSelectorBar: React.FC<FilterSelectorBarProps> = ({
  selectedFilter,
  onSelectFilter,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.pillRow}>
        {FILTER_OPTIONS.map((item) => {
          const isSelected = selectedFilter === item.id;
          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.8}
              onPress={() => onSelectFilter(item.id)}
              style={[
                styles.pill,
                isSelected && styles.pillSelected,
                isSelected && { borderColor: item.color },
              ]}
            >
              <Ionicons
                name={item.iconName as any}
                size={16}
                color={isSelected ? item.color : '#A1A1AA'}
              />
              <Text
                style={[
                  styles.pillText,
                  isSelected && styles.pillTextSelected,
                  isSelected && { color: '#FFFFFF' },
                ]}
              >
                {item.label}
              </Text>
              {isSelected && <View style={[styles.activeDot, { backgroundColor: item.color }]} />}
            </TouchableOpacity>
          );
        })}
      </View>
      <Text style={styles.filterHint}>
        {FILTER_OPTIONS.find((f) => f.id === selectedFilter)?.description}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 12,
    paddingHorizontal: 16,
  },
  pillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(18, 18, 20, 0.75)',
    borderRadius: 30,
    padding: 6,
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    gap: 6,
    borderWidth: 1.5,
    borderColor: 'transparent',
    backgroundColor: 'transparent',
  },
  pillSelected: {
    backgroundColor: 'rgba(45, 45, 55, 0.95)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  pillText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#A1A1AA',
  },
  pillTextSelected: {
    fontWeight: '700',
  },
  activeDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    marginLeft: 2,
  },
  filterHint: {
    fontSize: 12,
    color: '#D4D4D8',
    marginTop: 6,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});
