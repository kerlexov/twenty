import { currentRecordSortsComponentState } from '@/object-record/record-sort/states/currentRecordSortsComponentState';
import { useRecoilComponentCallbackStateV2 } from '@/ui/utilities/state/component-state/hooks/useRecoilComponentCallbackStateV2';
import { getSnapshotValue } from '@/ui/utilities/state/utils/getSnapshotValue';
import { useRecoilCallback } from 'recoil';

export const useRemoveRecordSort = () => {
  const currentRecordSortsCallbackState = useRecoilComponentCallbackStateV2(
    currentRecordSortsComponentState,
  );

  const removeRecordSort = useRecoilCallback(
    ({ set, snapshot }) =>
      (fieldMetadataId: string) => {
        const currentRecordSorts = getSnapshotValue(
          snapshot,
          currentRecordSortsCallbackState,
        );

        const hasFoundRecordSortInCurrentRecordSorts = currentRecordSorts.some(
          (existingSort) => existingSort.fieldMetadataId === fieldMetadataId,
        );

        if (hasFoundRecordSortInCurrentRecordSorts) {
          set(currentRecordSortsCallbackState, (currentRecordSorts) => {
            const newCurrentRecordSorts = [...currentRecordSorts];

            const indexOfSortToRemove = newCurrentRecordSorts.findIndex(
              (existingSort) =>
                existingSort.fieldMetadataId === fieldMetadataId,
            );

            if (indexOfSortToRemove < 0) {
              return newCurrentRecordSorts;
            }

            newCurrentRecordSorts.splice(indexOfSortToRemove, 1);

            return newCurrentRecordSorts;
          });
        }
      },
    [currentRecordSortsCallbackState],
  );

  return {
    removeRecordSort,
  };
};
