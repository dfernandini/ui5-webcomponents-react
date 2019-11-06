import '@ui5/webcomponents/dist/icons/navigation-down-arrow';
import '@ui5/webcomponents/dist/icons/navigation-right-arrow';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { FixedSizeList } from 'react-window';
import { DEFAULT_COLUMN_WIDTH } from '../defaults/Column';
import { Cell } from './Cell';
import { VirtualTableRow } from './VirtualTableRow';

export const VirtualTableBody = (props) => {
  const {
    classes,
    rowContainerStyling,
    prepareRow,
    rows,
    minRows,
    columns,
    selectedRow,
    selectedRowPath,
    selectable,
    reactWindowRef,
    tableWidth,
    resizedColumns,
    isTreeTable,
    internalRowHeight,
    tableBodyHeight,
    visibleRows,
    alternateRowColor
  } = props;

  const innerDivRef = useRef(null);

  useEffect(() => {
    if (innerDivRef.current) {
      innerDivRef.current.classList = '';
      innerDivRef.current.classList.add(classes.tbody);
      if (selectable) {
        innerDivRef.current.classList.add(classes.selectable);
      }
    }
  }, [innerDivRef.current, selectable, classes.tbody, classes.selectable]);

  const itemCount = Math.max(minRows, rows.length);
  const overscanCount = Math.floor(visibleRows / 2);

  const columnsWidth = useMemo(() => {
    const aggregatedWidth = columns
      .map((item) => {
        if (resizedColumns.hasOwnProperty(item.accessor)) {
          return resizedColumns[item.accessor];
        }
        return item.minWidth ? item.minWidth : DEFAULT_COLUMN_WIDTH;
      })
      .reduce((acc, val) => acc + val, 0);
    return tableWidth > aggregatedWidth || tableWidth === 0 ? null : aggregatedWidth;
  }, [columns, tableWidth, resizedColumns]);

  const tableData = useMemo(() => {
    return {
      rows,
      additionalProps: {
        isTreeTable,
        classes,
        columns,
        rowContainerStyling
      }
    };
  }, [
    rows,
    prepareRow,
    isTreeTable,
    classes,
    columns,
    rowContainerStyling,
    alternateRowColor,
    selectedRow,
    selectedRowPath
  ]);

  const getItemKey = useCallback(
    (index, data) => {
      const row = data.rows[index];
      if (row) {
        if (!row.getRowProps) {
          prepareRow(row);
        }
        if (row.getRowProps) {
          return row.getRowProps().key;
        }
      }
      return index;
    },
    [prepareRow]
  );

  return (
    <FixedSizeList
      ref={reactWindowRef}
      height={tableBodyHeight}
      width={columnsWidth}
      itemData={tableData}
      itemCount={itemCount}
      itemSize={internalRowHeight}
      itemKey={getItemKey}
      innerRef={innerDivRef}
      overscanCount={overscanCount}
    >
      {VirtualTableRow}
    </FixedSizeList>
  );
};
