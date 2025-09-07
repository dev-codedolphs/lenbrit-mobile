import {
    BottomSheetBackdrop,
    BottomSheetModal,
    BottomSheetView,
  } from '@gorhom/bottom-sheet';
  import React, {ReactNode, useCallback} from 'react';
  import {StyleSheet} from 'react-native';
  import {initialWindowMetrics} from 'react-native-safe-area-context';
  import { color } from '../../theme/colors';
  import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
  
  export function BottomModal({
    modalRef,
    children,
    onChange,
  }: {
    modalRef?: React.ForwardedRef<BottomSheetModal<any>> | undefined;
    children?: ReactNode;
    onChange?: (index: number) => void;
  }) {
    const handleSheetChanges = useCallback((index: number) => {}, []);
  
    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          pressBehavior="close"
          opacity={0.6}
        />
      ),
      [],
    );
    return (
      <BottomSheetModal
        ref={modalRef}
        onChange={onChange}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={styles.indicator}>
        <BottomSheetView style={styles.container}>{children}</BottomSheetView>
      </BottomSheetModal>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: wp(4),
      paddingBottom: initialWindowMetrics?.insets.bottom,
    },
    indicator: {
      backgroundColor: color.Gray,
      width: wp(10),
    },
  });
  