import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { FilterId } from '@/types/camera';

interface FilterOverlayProps {
  filter: FilterId;
  pointerEvents?: 'none' | 'box-none' | 'box-only' | 'auto';
}

export const FilterOverlay: React.FC<FilterOverlayProps> = ({
  filter,
  pointerEvents = 'none',
}) => {
  if (filter === 'normal') {
    return null;
  }

  if (Platform.OS === 'web') {
    const webFilterStyle =
      filter === 'bw'
        ? { backdropFilter: 'grayscale(100%) contrast(125%)', WebkitBackdropFilter: 'grayscale(100%) contrast(125%)' }
        : { backdropFilter: 'saturate(190%) contrast(115%) sepia(20%)', WebkitBackdropFilter: 'saturate(190%) contrast(115%) sepia(20%)' };

    return (
      <View
        pointerEvents={pointerEvents}
        style={[StyleSheet.absoluteFill, webFilterStyle as any, styles.webOverlay]}
      />
    );
  }

  return (
    <View pointerEvents={pointerEvents} style={StyleSheet.absoluteFill}>
      {filter === 'bw' && (
        <>
          {/* Black & White monochrome filter effect */}
          <View style={[StyleSheet.absoluteFill, styles.bwLayerDark]} />
          <View style={[StyleSheet.absoluteFill, styles.bwLayerContrast]} />
        </>
      )}
      {filter === 'vivid' && (
        <>
          {/* Warm Vivid filter effect */}
          <View style={[StyleSheet.absoluteFill, styles.vividWarmTint]} />
          <View style={[StyleSheet.absoluteFill, styles.vividGlow]} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  webOverlay: {
    zIndex: 2,
  },
  bwLayerDark: {
    backgroundColor: 'rgba(15, 15, 15, 0.65)',
  },
  bwLayerContrast: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  vividWarmTint: {
    backgroundColor: 'rgba(255, 170, 40, 0.22)',
  },
  vividGlow: {
    backgroundColor: 'rgba(236, 72, 153, 0.08)',
  },
});
